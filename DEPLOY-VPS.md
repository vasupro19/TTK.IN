# Deploying TheTravelKart on a Hostinger VPS

Target: **https://thetravelkart.in**, replacing the site currently served there.

Architecture: Next.js runs as a Node process on `127.0.0.1:3000`, managed by PM2.
Nginx sits in front on 80/443, terminates SSL and proxies through. The Next server
is never exposed directly — per the Next.js self-hosting guidance, the proxy
absorbs malformed requests, slow-connection attacks and rate limiting.

---

## 0. Survey what is already on the box

**Run this first and send me the output** — it decides the rest:

```bash
cat /etc/os-release | head -2
node -v 2>/dev/null || echo "node: not installed"
nginx -v 2>&1 || echo "nginx: not installed"
apache2 -v 2>/dev/null | head -1 || echo "apache: not installed"
systemctl is-active nginx apache2 2>/dev/null
ss -tlnp | grep -E ':(80|443|3000)\s'
ls /etc/nginx/sites-enabled/ 2>/dev/null
free -m | head -2
df -h / | tail -1
```

This tells us the OS, whether Apache or Nginx is serving the old site, what holds
ports 80/443, and whether there is RAM to build on the box.

---

## 1. Node.js 20 LTS

Next 16.3.4 requires **Node ≥ 20.9.0**.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v          # expect v20.x
```

## 2. Get the code

```bash
sudo mkdir -p /var/www && cd /var/www
sudo git clone https://github.com/vasupro19/TTK.IN.git thetravelkart
sudo chown -R $USER:$USER /var/www/thetravelkart
cd /var/www/thetravelkart
```

If you make the repo **private** (recommended), use a deploy key instead:

```bash
ssh-keygen -t ed25519 -C "vps-deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
# paste into GitHub → repo → Settings → Deploy keys → Add (read-only)
git clone git@github.com:vasupro19/TTK.IN.git thetravelkart
```

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
LEADS_TO_EMAIL=thetravelkart@gmail.com
LEADS_FROM_EMAIL=thetravelkart@gmail.com
```

```bash
chmod 600 .env.local
```

## 4. Install and build

```bash
npm ci
npm run build
```

If the build is killed on a small VPS, add swap first:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 5. Run it under PM2

```bash
sudo npm install -g pm2
pm2 start npm --name thetravelkart -- start
pm2 save
pm2 startup systemd -u $USER --hp $HOME   # run the command it prints
curl -I http://127.0.0.1:3000             # expect HTTP/1.1 200 OK
```

## 6. Nginx in front

```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/thetravelkart
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name thetravelkart.in www.thetravelkart.in;

    # Long-cache immutable build assets, bypassing the Node process.
    location /_next/static/ {
        alias /var/www/thetravelkart/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
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

```bash
sudo ln -s /etc/nginx/sites-available/thetravelkart /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default      # removes the old placeholder site
sudo nginx -t && sudo systemctl reload nginx
```

**If Apache currently holds port 80**, it must be stopped or moved first:

```bash
sudo systemctl stop apache2 && sudo systemctl disable apache2
```

## 7. SSL

DNS must already point at this VPS (it does, if the old site is live here).

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d thetravelkart.in -d www.thetravelkart.in
sudo systemctl status certbot.timer    # auto-renewal
```

Certbot rewrites the Nginx block for 443 and sets up the HTTP→HTTPS redirect.

## 8. Verify

```bash
curl -I https://thetravelkart.in
curl -s https://thetravelkart.in/packages | grep -o "<title>[^<]*"
```

Then in a browser:

- [ ] Home, `/packages`, a package page, `/plan-my-trip` all load over HTTPS
- [ ] Submit Plan My Trip — the email arrives at thetravelkart@gmail.com
- [ ] Filters work: `/packages?region=himachal`
- [ ] Favicon and logo render

---

## Redeploying after a code change

```bash
cd /var/www/thetravelkart
git pull
npm ci
npm run build
pm2 reload thetravelkart
```

Save as `deploy.sh` and `chmod +x deploy.sh` to make it one command.

## Useful commands

```bash
pm2 logs thetravelkart        # application logs, incl. [mailer] lines
pm2 restart thetravelkart
pm2 monit                     # live CPU/memory
sudo tail -f /var/log/nginx/error.log
```

## Rollback

```bash
cd /var/www/thetravelkart
git log --oneline -5
git checkout <previous-commit>
npm ci && npm run build && pm2 reload thetravelkart
```
