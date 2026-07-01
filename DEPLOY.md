# Deploying the APXESS Storefront

The site is **static** (plain HTML/CSS/JS), so it can be hosted almost anywhere.
Below are two paths. Pick the one that fits.

- **Option A — Cloudflare Pages (recommended for a US-facing brand).** Free,
  global CDN (fast for US Facebook traffic), automatic HTTPS, zero changes to
  your Beijing ERP server. Best choice for APXESS.
- **Option B — Your Volcano Engine server** (`101.126.155.252`, `b2bsxlj.com`).
  Use this if you want everything on your own box. Runs as a small Docker
  container behind your existing reverse proxy, so it won't disturb the
  finance / ERP apps already running.

---

## ⚠️ Important: this is a China-region server hosting a US brand

Your ECS is in Beijing. For visitors in the **United States** (your Facebook
audience), pages served from Beijing will load **slowly** (cross-border latency
+ throttled international bandwidth). For a brand storefront that people reach
from US Facebook ads, a **global static host (Option A) is strongly
recommended.** Keep the Beijing server for your ERP/finance tools.

If you still prefer your own server, Option B works — `b2bsxlj.com` is already
实名认证/备案 and its subdomains resolve, so a new subdomain will serve fine.

---

## Option A — Cloudflare Pages (recommended)

No server changes. ~10 minutes.

1. Push this repo to GitHub (already done on your branch).
2. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → select this repository.
3. Build settings: **Framework preset = None**, **Build command = (empty)**,
   **Output directory = `/`** (the site is already static). Deploy.
4. You'll get a URL like `apxess.pages.dev`. Test it.
5. Add your domain: Pages project → **Custom domains** → add e.g.
   `shop.b2bsxlj.com` (or `www.apxess.com` if you buy that later).
6. In **火山引擎 → 云解析 DNS → b2bsxlj.com**, add the CNAME Cloudflare shows
   you (e.g. `shop  CNAME  apxess.pages.dev`). HTTPS is issued automatically.

> Netlify and Vercel work identically if you prefer them — connect the repo,
> no build command, publish directory = root.

---

## Option B — Your Volcano Engine server (Docker + subdomain)

Everything below is run **on the server**, via 火山引擎 → 实例 → **远程连接**
(SSH). It does **not** touch your existing finance/ERP sites — the APXESS
container listens only on `127.0.0.1:8095`, and you add ONE new server block to
the reverse proxy that already serves `erp/finance/app`.

### 1. Add a DNS record for the subdomain

In **云解析 DNS → b2bsxlj.com → 添加记录**:

```
主机记录(Host): shop        (or: apxess)
类型(Type):     A
记录值(Value):  101.126.155.252
```

This mirrors your existing `www` / `erp` records.

### 2. Pull the repo and build the container

```bash
# on the server
cd /opt   # or wherever you keep apps
git clone <YOUR_REPO_URL> apxess && cd apxess
git checkout claude/apxess-amazon-affiliate-site-cqq5tg

docker compose up -d --build
# verify it's serving locally:
curl -I http://127.0.0.1:8095/    # expect HTTP/1.1 200 OK
```

### 3. Route the subdomain to the container

**If your existing sites use a host nginx** (most likely, since erp/finance/app
share ports 80/443), create a new server block:

```bash
sudo tee /etc/nginx/conf.d/apxess.conf > /dev/null <<'NGINX'
server {
    listen 80;
    server_name shop.b2bsxlj.com;   # <-- match the subdomain you created

    location / {
        proxy_pass http://127.0.0.1:8095;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

sudo nginx -t && sudo systemctl reload nginx
```

> If your reverse proxy is **not** host nginx (e.g. it's Traefik, or the nginx
> inside your dify/docker stack), tell me and I'll give you the matching config
> — the idea is the same: forward `shop.b2bsxlj.com` → `127.0.0.1:8095`.

### 4. Enable HTTPS (free, Let's Encrypt)

```bash
sudo yum install -y certbot python3-certbot-nginx   # or: apt install
sudo certbot --nginx -d shop.b2bsxlj.com
```

Certbot auto-configures the 443 block and sets up renewal. Done — visit
`https://shop.b2bsxlj.com`.

### Updating the site later

```bash
cd /opt/apxess
git pull
docker compose up -d --build
```

---

## After deploying — go-live checklist

- [ ] Replace placeholder Amazon links (`https://www.amazon.com/`) in
      `assets/js/data.js` with your **real APXESS affiliate links**.
- [ ] Replace demo photos with real product images (put files in `assets/img/`).
- [ ] Set your **Facebook** link in `SITE.social.facebook` (in `data.js`).
- [ ] Confirm the Amazon Associates disclosure in the footer is visible.
