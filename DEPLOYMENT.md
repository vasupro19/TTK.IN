# Deploying TheTravelKart

The app runs on **Vercel**; the domain **thetravelkart.in** stays registered at
Hostinger and is repointed by DNS.

## Why not Hostinger shared hosting

This is not a static site. Six routes render on demand and five API routes run
server-side — including `/api/leads`, which sends the Plan My Trip enquiry email.
Those need a live Node.js process, which classic shared hosting does not provide.
(A Hostinger VPS could run it; Vercel removes the server maintenance.)

---

## 1. Push the code to GitHub

Create an empty **private** repository at <https://github.com/new> — no README,
no .gitignore — then:

```bash
git remote add origin https://github.com/<your-username>/thetravelkart.git
git push -u origin main
```

`.env.local` is gitignored and will not be uploaded. Credentials go into Vercel
separately (step 3).

## 2. Import into Vercel

1. Sign in at <https://vercel.com> with the same GitHub account.
2. **Add New → Project**, pick the repository, click **Import**.
3. Leave every build setting on its default — Vercel detects Next.js.
4. Click **Deploy**.

You get a working URL such as `thetravelkart.vercel.app` in a couple of minutes.
Check it before touching DNS.

## 3. Add environment variables

**Project → Settings → Environment Variables.** Add each to *Production*,
*Preview* and *Development*:

| Name | Value |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `thetravelkart@gmail.com` |
| `SMTP_PASS` | *(Gmail App Password, 16 chars, no spaces)* |
| `LEADS_TO_EMAIL` | `thetravelkart@gmail.com` |
| `LEADS_FROM_EMAIL` | `thetravelkart@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://thetravelkart.in` |

Generate a **fresh** App Password for production at
<https://myaccount.google.com/apppasswords>.

Redeploy after adding them (**Deployments → ⋯ → Redeploy**) — variables are read
at build time.

## 4. Point the domain at Vercel

### In Vercel

**Project → Settings → Domains → Add** → `thetravelkart.in`. Add `www.thetravelkart.in`
too and set one to redirect to the other. Vercel then shows the exact DNS records
it wants — **use the values on that screen**, they are authoritative.

### In Hostinger

**hPanel → Domains → DNS / Nameservers → DNS records.**

1. Delete the existing `A` record for `@` (it points at the old site) and the
   existing `CNAME` for `www`.
2. Add what Vercel showed you. Typically:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

3. Set TTL as low as the panel allows so the change propagates quickly.

**Keep the nameservers at Hostinger.** Changing them to Vercel's moves all DNS,
including any MX records, and would break domain email if you ever add it.

Propagation is usually minutes, occasionally a few hours. Vercel issues the SSL
certificate automatically once DNS resolves — the domain shows "Invalid
Configuration" until then, which is normal.

## 5. The old site

Nothing is deleted. Once DNS resolves to Vercel the old site is simply bypassed.
Leave it in place until the new site is confirmed working, then remove it at your
leisure. If anything goes wrong, restoring the original A record rolls back.

## 6. After going live

- [ ] `https://thetravelkart.in` loads with a valid padlock
- [ ] `https://www.thetravelkart.in` redirects correctly
- [ ] Submit the Plan My Trip form — the enquiry email arrives
- [ ] Package filters work (`/packages?region=himachal`)
- [ ] Favicon and social card render — test at <https://www.opengraph.xyz>
- [ ] Submit the sitemap at <https://search.google.com/search-console>:
      `https://thetravelkart.in/sitemap.xml`

## Ongoing deploys

Every `git push` to `main` deploys automatically. Pull requests get their own
preview URL. Roll back instantly from **Deployments** in the dashboard.

## Costs

Vercel's Hobby tier covers this site and is free. It is licensed for
non-commercial use — a business site should be on **Pro** (about $20/month).
Hostinger continues to bill only for the domain.
