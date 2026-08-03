# Inspire Oman CMS

## Production rule (droplet)

- **Live content source:** Payload (`CMS_SOURCE=payload`)
- **Live editor:** `/admin` only  
- **Keystatic on production:** **disabled** by default (`ENABLE_KEYSTATIC` unset/false). Visiting `/keystatic` redirects to `/admin`.
- **Keystatic code + `content/` YAML:** kept in **git** for local development, seeding Payload, and optional git/Vercel workflows.

| Environment | Public site reads | Editor to use |
|-------------|-------------------|---------------|
| Droplet (prod) | Payload Postgres | `/admin` |
| Local (`CMS_SOURCE=payload`) | Payload | `/admin` (Keystatic still available at `/keystatic` in dev) |
| Local (`CMS_SOURCE=keystatic` or unset) | Keystatic YAML `content/` | `/keystatic` |
| Vercel (if still deployed) | Usually Keystatic YAML | `/keystatic` |

## Two dashboards (both kept in the repo)

| Admin | URL | Storage | Role |
|-------|-----|---------|------|
| **Payload** | `/admin` | Postgres (prod) / SQLite (local) | **Production CMS** — draft → publish → live pages |
| **Keystatic** | `/keystatic` | Git YAML in `content/` | **Dev / git** — kept in repo; not served on prod droplet |

**Settings → Header** (Payload global `header`, Keystatic `content/header.yaml`): logo, brand wordmark, nav links, CTA. Controls the public Navbar and Footer quick links.

Local Keystatic: http://localhost:3000/keystatic  
Local Payload: http://localhost:3000/admin  

## Env flags

```env
# Public site content
CMS_SOURCE=payload          # production droplet
# CMS_SOURCE=keystatic      # local YAML-driven site

# Keystatic UI + /api/keystatic
# ENABLE_KEYSTATIC=false    # explicit off (prod compose default)
# ENABLE_KEYSTATIC=true     # force on even in prod (not recommended)
```

Default behaviour of `isKeystaticEnabled()`:

1. `ENABLE_KEYSTATIC=true` → on  
2. `ENABLE_KEYSTATIC=false` → off  
3. Else: **off** when `NODE_ENV=production` and `CMS_SOURCE=payload`  
4. Else: **on** (local/dev)

## Payload setup

1. Copy `.env.example` → `.env`
2. Default `DATABASE_URI=file:./payload.db` (SQLite, no Docker)
3. For Postgres: `docker compose up -d` and set `DATABASE_URI=postgresql://payload:payload@127.0.0.1:5432/inspire_oman`
4. `npm install` then `npm run seed:payload` (copies Keystatic YAML into Payload; does **not** change `content/`)
5. `npm run dev` → open `/admin`

Payload has draft/publish on mirrored pages and collections. Production admin branding uses Findown marks; public site stays Inspire Oman.

## Keystatic (local / git only on droplet)

Still in the repo: `keystatic.config.ts`, `content/**`, `src/app/(site)/keystatic/**`, `/api/keystatic`.

### When to use it

- Local content editing against YAML  
- Updating seed source before `npm run seed:payload`  
- Optional Vercel Keystatic deploy  

### Dashboard map (Keystatic)

#### Pages
| Dashboard item | Live page |
|----------------|-----------|
| **Home** | `/` Hero + About + bottom CTA |
| **About** | `/about` |
| **Pillars page** | `/pillars` hero |
| **Summit page** | `/summit` hero |
| **Partner page** | `/partner` hero |
| **Media page** | `/media` hero |
| **Contact page** | `/contact` hero |

#### Site content
Partners, Stats, Speakers, Testimonials, Pillars, Partnership Packages, About Values

#### Summit & media
Summit Agenda, Media Gallery, Media Videos, Press Releases

#### Settings
Site Settings

### Keystatic workflow (local)

1. `npm run dev` → `/keystatic`
2. Toolbar: **Save** / **Save to draft** (git commit) / **Publish** (push)
3. Or commit & push manually

Draft/Publish git actions need a local git checkout (not the droplet).

## Droplet (full stack)

Production: Next.js + **Payload `/admin`** + Postgres + Caddy. Keystatic UI is off.

See [deploy/DEPLOY.md](deploy/DEPLOY.md).
