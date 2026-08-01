# Inspire Oman CMS

Set `CMS_SOURCE=payload` (droplet default) so the public site reads **Payload**. Use `CMS_SOURCE=keystatic` (or unset) to keep reading YAML under `content/`.

## Two dashboards

| Admin | URL | Storage | Best for |
|-------|-----|---------|----------|
| **Payload** (live site when `CMS_SOURCE=payload`) | `/admin` | Postgres on droplet / SQLite locally | Draft → **Publish** → public pages update |
| **Keystatic** (when `CMS_SOURCE=keystatic`) | `/keystatic` | Git YAML in `content/` | Local/git workflow; Vercel default |

Local Keystatic: http://localhost:3000/keystatic  
Local Payload: http://localhost:3000/admin  

Live Keystatic: https://inspire-oman.vercel.app/keystatic  

## Payload setup

1. Copy `.env.example` → `.env`
2. Default `DATABASE_URI=file:./payload.db` (SQLite, no Docker)
3. For Postgres: `docker compose up -d` and set `DATABASE_URI=postgresql://payload:payload@127.0.0.1:5432/inspire_oman`
4. `npm install` then `npm run seed:payload` (copies Keystatic YAML into Payload; does **not** change `content/`)
5. `npm run dev` → open `/admin` → login with `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`

Payload has native **draft / publish** on all mirrored pages and collections. Logo branding matches Inspire Oman.

## Keystatic dashboard navigation

### Pages
| Dashboard item | Live page |
|----------------|-----------|
| **Home** | `/` Hero + About + bottom CTA |
| **About** | `/about` |
| **Pillars page** | `/pillars` hero |
| **Summit page** | `/summit` hero |
| **Partner page** | `/partner` hero |
| **Media page** | `/media` hero |
| **Contact page** | `/contact` hero |

### Site content
Partners, Stats, Speakers, Testimonials, Pillars, Partnership Packages, About Values

### Summit & media
Summit Agenda, Media Gallery, Media Videos, Press Releases

### Settings
Site Settings

## Keystatic workflow
1. Prefer editing locally (`npm run dev` → `/keystatic`)
2. Give lists a few seconds to load
3. CMS toolbar: **Save** / **Save to draft** (git commit) / **Publish** (push)
4. Or commit & push manually → Vercel redeploys

Saving from the live Vercel Keystatic admin is unreliable with local storage; Draft/Publish git actions only work locally.

## Droplet (full stack)

Production on DigitalOcean: Next.js + Payload + Postgres + Caddy.

See [deploy/DEPLOY.md](deploy/DEPLOY.md).

