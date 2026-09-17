# Hosting TheTravelKart on the VPS alongside travelytics.cloud

Target: **https://thetravelkart.in**, running on the same VPS that already
serves **travelytics.cloud**, without disturbing it.

Both sites run as their own Node process on their own loopback port. One web
server sits in front on 80/443 and routes by domain name. Neither app is
exposed directly.

```
                                 ┌──────────────────────────────┐
  travelytics.cloud  ──────────► │                              │ ──► 127.0.0.1:<existing>
                                 │  Nginx (ports 80/443)        │
  thetravelkart.in   ──────────► │  routes on server_name       │ ──► 127.0.0.1:3001
                                 └──────────────────────────────┘
```

> **Read this before you start.** An earlier version of this file assumed a
> fresh box. Three of its steps would take travelytics.cloud offline:
> `rm /etc/nginx/sites-enabled/default`, `systemctl stop apache2`, and binding
> the new app to port 3000. None of them appear below. If you are following an
> older copy, stop and use this one.

---

## 0. Survey the box — do this first

Nothing here changes anything. **Send me the output** and I will tailor the
rest; the commands below assume the common case (Nginx + PM2).

```bash
# OS and resources
cat /etc/os-release | head -2
free -m | head -2
df -h / | tail -1

# Which web server is in front, and what holds the public ports
systemctl is-active nginx apache2 2>/dev/null
sudo ss -tlnp | grep -E ':(80|443)\s'

# Which loopback ports are already taken — pick a free one for the new app
sudo ss -tlnp | grep 127.0.0.1

# How travelytics is run
pm2 list 2>/dev/null || echo "pm2: not installed"
ls /etc/nginx/sites-enabled/ 2>/dev/null
node -v 2>/dev/null || echo "node: not installed"
```

Three things decide the rest:

| What | Why it matters |
|---|---|
| Nginx or Apache | Which vhost syntax to use in step 5 |
| Free loopback port | The new app must not collide with what is already running |
| Node version | Next 16 needs **Node ≥ 20.9** |

### This box, as surveyed

| | |
|---|---|
| OS | Ubuntu 22.04.5 LTS |
| RAM | 7.9 GB total, ~6.7 GB available — **no swap needed** |
| Front door | **Nginx** on 80/443; Apache inactive — leave it that way |
| Existing Nginx site | `ttkb` |
| Existing PM2 apps | `ttkb-api`, `lead-worker` (running as root) |
| Node | **v24.13.0** — already above the minimum, skip step 1 |
| Loopback in use | redis 6379, mysql 3306/33060 |

Everything runs as **root** here, so `sudo` is redundant but harmless, and
`$USER`/`$HOME` resolve to `root`/`/root`.

This runbook uses **port 3001**. Confirm it is free before starting — see the
guard at the top of step 4.

---

## 1. Node.js

Check first — travelytics may already have a suitable version:

```bash
node -v
```

If it is below 20.9, install Node 22 LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

> **If travelytics needs an older Node**, do not replace the system version —
> that would break it. Install `nvm` and pin per-app instead, or run
> TheTravelKart from a Node 22 path while leaving the system Node alone. Tell
> me if this applies and I will write that variant.

---

## 2. Get the code

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/vasupro19/TTK.IN.git thetravelkart
sudo chown -R $USER:$USER /var/www/thetravelkart
cd /var/www/thetravelkart
```

The clone pulls about **110 MB of photography** under `public/img`, so give it
a minute. That is expected — the images are committed deliberately so the
server never has to fetch them at build time.

---

## 3. Environment variables

`NEXT_PUBLIC_*` values are **inlined at build time**, so this file must exist
*before* you build.

```bash
cd /var/www/thetravelkart
nano .env.local
```

```ini
NEXT_PUBLIC_SITE_URL=https://thetravelkart.in

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=thetravelkart@gmail.com
SMTP_PASS=your16charapppassword

# Enquiries are delivered here
LEADS_TO_EMAIL=enquiry.thetravelkart@gmail.com
# Gmail refuses to send as anything but the authenticated mailbox,
# so this must stay equal to SMTP_USER
LEADS_FROM_EMAIL=thetravelkart@gmail.com
```

```bash
chmod 600 .env.local
```

Generate the App Password at <https://myaccount.google.com/apppasswords>
(requires 2-Step Verification on that Google account).

---

## 4. Install, build, run on its own port

First confirm nothing already holds the port, and see what the existing apps
use so you can pick a different one if needed:

```bash
ss -tlnp | grep -E 'LISTEN' | awk '{print $4, $6}' | sort
ss -tln | grep -q ':3001\b' && echo "3001 TAKEN — pick another" || echo "3001 is free"
```

```bash
npm ci
npm run build
```

**If the build is killed**, the box is out of RAM. This one has ~6.7 GB free so
it should not happen; if it somehow does, add swap and retry:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Start it under PM2 on **port 3001**, bound to loopback only:

```bash
sudo npm install -g pm2   # skip if travelytics already uses pm2

pm2 start npm --name thetravelkart -- start -- -p 3001 -H 127.0.0.1
pm2 save
curl -I http://127.0.0.1:3001     # expect HTTP/1.1 200 OK
pm2 list                          # travelytics should still be online
```

If PM2 was not already installed, enable it at boot — **run the command it
prints**:

```bash
pm2 startup systemd -u $USER --hp $HOME
```

---

## 5. Add an Nginx server block — a new file, nothing edited

Do **not** touch the existing travelytics config. Add a second one beside it:

```bash
sudo nano /etc/nginx/sites-available/thetravelkart
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name thetravelkart.in www.thetravelkart.in;

    # Immutable build output and committed photography, served by Nginx
    # directly so they never touch the Node process.
    location /_next/static/ {
        alias /var/www/thetravelkart/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /img/ {
        alias /var/www/thetravelkart/public/img/;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    client_max_body_size 10M;
}
```

Before enabling it, check the existing site is not a catch-all. If `ttkb` is
marked `default_server`, it answers for any hostname that reaches the box —
including this one — and the new block would never be consulted:

```bash
grep -nE 'server_name|default_server' /etc/nginx/sites-enabled/ttkb
```

A specific `server_name` (e.g. `travelytics.cloud`) is fine. If you see
`default_server`, tell me before going further.

```bash
sudo ln -s /etc/nginx/sites-available/thetravelkart /etc/nginx/sites-enabled/
sudo nginx -t          # must say "syntax is ok" AND "test is successful"
sudo systemctl reload nginx
```

`reload` re-reads config without dropping connections — travelytics stays up.
**If `nginx -t` fails, do not reload.** Fix the file first; the running config
is untouched until a successful reload.

Check travelytics is still fine before going further:

```bash
curl -I https://travelytics.cloud
```

<details>
<summary>If the box runs <b>Apache</b>, not Nginx</summary>

Do not install Nginx alongside it — they will fight over port 80. Use an Apache
vhost instead:

```apache
<VirtualHost *:80>
    ServerName thetravelkart.in
    ServerAlias www.thetravelkart.in

    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/
    RequestHeader set X-Forwarded-Proto "http"
</VirtualHost>
```

```bash
sudo a2enmod proxy proxy_http headers
sudo a2ensite thetravelkart
sudo apache2ctl configtest && sudo systemctl reload apache2
```
</details>

---

## 6. Point the domain at the VPS

At your DNS host for **thetravelkart.in**:

| Type | Name | Value |
|---|---|---|
| A | `@` | *your VPS IP* |
| A (or CNAME) | `www` | *your VPS IP* (or `thetravelkart.in`) |

Find the IP with `curl -4 ifconfig.me` on the server. Remove any A record
pointing at the old host, and any Vercel records if the domain was there.

Wait until this resolves before the next step — certbot verifies over HTTP:

```bash
dig +short thetravelkart.in
```

---

## 7. SSL for the new domain only

Certbot is almost certainly already installed, since the existing site serves
HTTPS. Confirm, then scope the run to the new domain so existing certificates
are untouched:

```bash
which certbot || sudo apt-get install -y certbot python3-certbot-nginx
```

```bash
sudo certbot --nginx -d thetravelkart.in -d www.thetravelkart.in
```

Choose **redirect** when it offers to. It edits only the server block matching
those names.

```bash
sudo certbot certificates          # both domains listed
sudo systemctl status certbot.timer   # auto-renewal active
curl -I https://travelytics.cloud     # still fine
```

---

## 8. Verify

```bash
curl -I https://thetravelkart.in
curl -s https://thetravelkart.in/himachal-pradesh-tour-packages | grep -o "<title>[^<]*"
curl -s -o /dev/null -w "%{http_code}\n" https://thetravelkart.in/himachal-tour-packages   # 308
```

In a browser:

- [ ] `https://thetravelkart.in` loads with a valid padlock
- [ ] `https://www.thetravelkart.in` redirects to it
- [ ] `https://travelytics.cloud` **still works**
- [ ] `/himachal-pradesh-tour-packages` renders, images and all
- [ ] The enquiry dialog opens by itself after a few seconds
- [ ] Submit it — lands on `/thank-you` **and** mail arrives at
      `enquiry.thetravelkart@gmail.com`
- [ ] Landing-page filters narrow the ten itineraries
- [ ] WhatsApp buttons open a chat to **9816100105**
- [ ] On a phone: the dialog can be closed, and buttons respond
- [ ] Submit the sitemap at <https://search.google.com/search-console>:
      `https://thetravelkart.in/sitemap.xml`

If mail does not arrive, `pm2 logs thetravelkart` and look for `[mailer]`. It
names the recipient, or the reason it failed. A lead is never lost to a mail
failure — it is written to the log either way.

---

## Redeploying after a code change

```bash
cd /var/www/thetravelkart && ./deploy.sh
```

That script is in the repo. It pulls, installs, builds and reloads, and stops
on the first failure so a broken build never replaces a working one.

---

## Day-to-day

```bash
pm2 logs thetravelkart        # app logs, including [mailer] lines
pm2 restart thetravelkart
pm2 monit                     # live CPU and memory for both apps
sudo tail -f /var/log/nginx/error.log
```

## Rollback

```bash
cd /var/www/thetravelkart
git log --oneline -5
git checkout <previous-commit>
npm ci && npm run build && pm2 reload thetravelkart
```

Return to the tip with `git checkout main`.

## If something breaks travelytics

Nothing in this runbook edits its config, so the likely culprits are a port
collision or a bad Nginx file. To back out completely:

```bash
sudo rm /etc/nginx/sites-enabled/thetravelkart
sudo nginx -t && sudo systemctl reload nginx
pm2 delete thetravelkart && pm2 save
```

That returns the box to exactly its previous state.
