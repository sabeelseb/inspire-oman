# Deploy Inspire Oman on a DigitalOcean droplet

Full stack: **Next.js site + Payload `/admin` + Postgres + Caddy**

## 1. Droplet prep (Ubuntu 22.04/24.04)

SSH in as root (or sudo user):

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl git ufw
curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
```

## 2. Clone the app

```bash
mkdir -p /opt && cd /opt
git clone https://github.com/sabeelseb/inspire-oman.git
cd inspire-oman
git checkout main
```

## 3. Env file

```bash
cp .env.production.example .env
nano .env
```

Set at least:

- `PAYLOAD_SECRET` — long random string  
- `POSTGRES_PASSWORD` — strong password  
- `NEXT_PUBLIC_SERVER_URL` — `http://YOUR_DROPLET_IP` (or `https://your-domain.com`)  
- `SITE_ADDRESS` — `:80` for IP, or `your-domain.com` for HTTPS  
- `CMS_SOURCE=payload` — public site reads Payload `/admin` (default in compose)  

After editing in `/admin`, click **Publish changes** (not only Save Draft) for the public site to update.

## 4. Build & start

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
```

Site: `http://YOUR_DROPLET_IP`  
Admin: `http://YOUR_DROPLET_IP/admin`  
Keystatic: `http://YOUR_DROPLET_IP/keystatic`

## 5. Seed Payload (once)

```bash
docker compose -f docker-compose.prod.yml exec app \
  node -e "console.log('App container ready — seed from a one-off job if needed')"
```

Recommended: run seed from your laptop against the droplet DB, or exec with `tsx` after copying scripts. Simpler first-time path: open `/admin`, create the first admin user in the UI, then optionally seed content later.

Local seed (if you expose Postgres temporarily — not recommended long-term):

```bash
# On droplet, temporarily publish 5432 only from your IP, then:
DATABASE_URI=postgresql://payload:PASSWORD@DROPLET_IP:5432/inspire_oman \
PAYLOAD_SECRET=... \
npm run seed:payload
```

## 6. Domain + HTTPS

1. Point DNS A record → droplet IP  
2. In `.env`: `SITE_ADDRESS=your-domain.com` and `NEXT_PUBLIC_SERVER_URL=https://your-domain.com`  
3. `docker compose -f docker-compose.prod.yml up -d`

Caddy will fetch Let’s Encrypt certificates automatically.

## 7. Updates

```bash
cd /opt/inspire-oman
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
```

## Notes

- Public site still reads **Keystatic** YAML in `content/` (bundled in the image).  
- Payload `/admin` uses **Postgres** on the droplet.  
- Media uploads live in the `media_data` Docker volume.  
- Keep Vercel as a backup or turn it off once the droplet is primary.
