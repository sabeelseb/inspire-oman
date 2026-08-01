# Inspire Oman CMS

The site currently reads **Keystatic** YAML (`content/`). **Payload CMS** runs beside it at `/admin` with the same content model (draft/publish). Switching the public site to Payload is a later step.

## Two dashboards

| Admin | URL | Storage | Best for |
|-------|-----|---------|----------|
| **Keystatic** (current live site source) | `/keystatic` | Git YAML in `content/` | Editing what the public site shows today |
| **Payload** (open source, MIT) | `/admin` | SQLite locally / Postgres in prod | Draft → Publish workflow, auth, future site source |

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

## Notes
- Public pages still use [`src/lib/cms.ts`](src/lib/cms.ts) → Keystatic. Payload is parallel until a `CMS_SOURCE` switch is added.
- Do not remove Keystatic or `content/` while the site depends on them.
