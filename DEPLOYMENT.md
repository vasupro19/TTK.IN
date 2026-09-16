# Deploying TheTravelKart to Vercel

The app runs on **Vercel**. The domain **thetravelkart.in** stays registered at
Hostinger — only its DNS records change.

> Self-hosting on a Hostinger VPS is also possible and documented in
> `DEPLOY-VPS.md`. Vercel is the chosen path because it removes server
> maintenance entirely: no Node upgrades, no PM2, no Nginx, no SSL renewals.

---

## 1. Import the project

1. Go to <https://vercel.com> and **Sign up / Log in with GitHub**, using the
   **vasupro19** account that owns the repository.
2. **Add New → Project**.
3. Find **TTK.IN** in the list and click **Import**.
   *(If it is not listed: **Adjust GitHub App Permissions** → grant access to the repo.)*
4. Leave every build setting at its default — Vercel detects Next.js and uses
   `next build` automatically. Do not override the build command or output directory.
5. Click **Deploy**.

After a couple of minutes you get a working URL like `ttk-in.vercel.app`.
**Open it and click around before touching DNS.**

## 2. Add environment variables

Without these the enquiry form silently stops emailing.

**Project → Settings → Environment Variables.** Add each one, ticking
*Production*, *Preview* and *Development*:

| Name | Value |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `thetravelkart@gmail.com` |
| `SMTP_PASS` | *Gmail App Password — 16 characters, no spaces* |
| `LEADS_TO_EMAIL` | `thetravelkart@gmail.com` |
| `LEADS_FROM_EMAIL` | `thetravelkart@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://thetravelkart.in` |

Generate a **fresh** App Password for production at
<https://myaccount.google.com/apppasswords>.

Then **Deployments → ⋯ → Redeploy**. Environment variables are read at build
time, so the first deploy will not have them.

## 3. Add the domain in Vercel

**Project → Settings → Domains → Add** → `thetravelkart.in`.

Add `www.thetravelkart.in` as well and set one to redirect to the other
(most people point `www` → apex).

Vercel then displays the exact DNS records it needs. **Use the values on that
screen** — they are authoritative and can change.

## 4. Change DNS at Hostinger

**hPanel → Domains → thetravelkart.in → DNS / Nameservers → DNS records.**

1. **Delete** the existing `A` record for `@` — this is what currently points at
   your old site.
2. **Delete** the existing `CNAME` for `www`, if present.
3. **Add** the records Vercel showed you. Typically:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | A | `@` | `76.76.21.21` | lowest available |
   | CNAME | `www` | `cname.vercel-dns.com` | lowest available |

4. Save.

**Keep the nameservers pointed at Hostinger.** Switching them to Vercel moves
*all* DNS including MX records, which would break domain email if you ever add
`@thetravelkart.in` addresses.

Propagation is usually minutes, sometimes a few hours. Vercel issues the SSL
certificate automatically once DNS resolves — the domain shows "Invalid
Configuration" until then, which is expected.

## 5. The old site

Nothing is deleted. Once DNS resolves to Vercel, the old site is simply
bypassed. Leave it in place until the new site is confirmed working.

**Rollback:** restore the original `A` record and traffic returns to the old
site within the TTL.

## 6. Go-live checklist

- [ ] `https://thetravelkart.in` loads with a valid padlock
- [ ] `https://www.thetravelkart.in` redirects correctly
- [ ] `/himachal-pradesh-tour-packages` renders fully
- [ ] `/himachal-tour-packages` redirects to it (301)
- [ ] The enquiry dialog opens on its own a few seconds after the page loads
- [ ] Submit the enquiry form — it lands on `/thank-you` **and** the email
      arrives at thetravelkart@gmail.com
- [ ] Package filters on the landing page narrow the ten itineraries
- [ ] Marketplace filters work: `/packages?region=himachal`
- [ ] WhatsApp buttons open with the prefilled message
- [ ] Favicon and social card render — check at <https://www.opengraph.xyz>
- [ ] Submit the sitemap at <https://search.google.com/search-console>:
      `https://thetravelkart.in/sitemap.xml`

## Ongoing deploys

Every `git push` to `main` deploys automatically. Pull requests get their own
preview URL. Roll back instantly from **Deployments** in the dashboard.

## Images

All site photography is committed under `public/img` (~110 MB, 488 files) and
served as ordinary static assets. It is deliberately **not** generated at build
time: the source images come from Wikimedia, and fetching several hundred of
them during a deploy is slow and gets rate-limited.

To change an image, edit the query or pin in `scripts/spec/` and run
`npm run images`, then commit the result. See `scripts/README.md`.

Two things to watch on Vercel:

- **Image Optimization quota.** `next/image` generates a variant per breakpoint
  on first request. With this many source images the free Hobby allowance can
  be used up quickly; Pro raises it substantially.
- **First deploy is slow.** Uploading ~110 MB of assets takes a few minutes.
  Later deploys only upload what changed.

## Cost

Vercel's Hobby tier runs this site fine but is licensed for **non-commercial**
use. A business booking site should be on **Pro** (about $20/month). Hostinger
then bills only for the domain.
