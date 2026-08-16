# Inspire Oman — Live Tech Stack

**Site:** https://inspireoman.com  
**Origin server:** `45.194.47.155`  
**Hostname:** `inspire-oman`  
**App path:** `/opt/inspire-oman-production`  
**Compose file:** `docker-compose.prod.yml`  
**Git repo:** `inspire-oman-production`

---

## 1. Language and runtime

| Item | Technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js 22 (`node:22-bookworm-slim`) |
| App command | `node server.js` (Next.js standalone) |
| Package manager | npm (`package-lock.json`) |

---

## 2. Frontend

| Item | Technology |
|---|---|
| Framework | Next.js 15 — App Router |
| UI library | React 19 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Font | Inter |
| Images | Next.js Image + sharp |

### Public pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/pillars` | Pillars |
| `/summit` | Investors Summit |
| `/partner` | Partnership |
| `/media` | Media |
| `/contact` | Contact |

Brand palette: black / charcoal + gold (`#C5A55A`).

---

## 3. Backend and CMS

| Item | Technology |
|---|---|
| CMS + API | Payload CMS 3.86 (same Node process as the public site) |
| Admin dashboard | `/admin` |
| REST API | `/api/*` |
| GraphQL | `/api/graphql` |
| Public forms | Get in Touch, Summit Registrations, Partner Applications |
| Email | Postmark (when configured) |
| Auth | Payload users |

**Live CMS users**

- `pc@madhyamam.com`
- `rohit@mefriend.com`

Keystatic is in git for local/dev only. It is **disabled** on this live server (`CMS_SOURCE=payload`).

---

## 4. Database and storage

| Item | Technology |
|---|---|
| Engine | PostgreSQL 16 Alpine |
| Database name | `inspire_oman` |
| Database user | `payload` |
| Data volume | `postgres_data` |
| Media uploads | Docker volume `media_data` → `/app/public/media` |
| Local/dev fallback | SQLite `payload.db` |

---

## 5. Docker containers and services

All production services run in Docker Compose. Restart policy: `unless-stopped`.

| Container | Image | Role | Published ports |
|---|---|---|---|
| `inspire-oman-production-caddy-1` | `caddy:2-alpine` | Reverse proxy | Host **80** and **443** |
| `inspire-oman-production-app-1` | `inspire-oman-production-app` | Next.js site + Payload admin/API | **3000** internal only |
| `inspire-oman-production-postgres-1` | `postgres:16-alpine` | Database | **5432** internal only |

### Networks

| Network | Used by | Purpose |
|---|---|---|
| `edge` | Caddy + app | Public HTTP traffic |
| `internal` | App + Postgres | Database traffic only |

### Volumes

- `postgres_data` — database files  
- `media_data` — CMS media uploads  
- `caddy_data` — Caddy certificates/state  
- `caddy_config` — Caddy config cache  

---

## 6. Traffic path

```
Visitor
  → Cloudflare  (inspireoman.com)
  → 45.194.47.155 :80   Caddy  (SITE_ADDRESS=:80)
  → app:3000            Next.js + Payload
  → postgres:5432       PostgreSQL
```

HTTPS for the public domain is terminated at **Cloudflare**.  
On the origin, Caddy listens on HTTP (`:80`). Origin port **443** is not open from the internet. Next.js and Postgres are not published on the host.

---

## 7. Host and operations

| Item | Value |
|---|---|
| OS | Ubuntu |
| SSH user | `ubuntu` |
| Size | 8 GB RAM, 96 GB disk, 4 CPU |
| Firewall | UFW enabled — 22, 80, 443 |
| Process manager | Docker only (no PM2) |
| Internet-open ports | 22 (SSH), 80 (HTTP), 21 (FTP) |

### Typical commands

```bash
cd /opt/inspire-oman-production
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 8. Not used on this live server

- Redis  
- Nginx  
- PM2  
- Vercel runtime  
- Keystatic UI  
- The Findown / `ponnonam` droplet (`68.183.95.87`) — that is a separate host  

---

## 9. Stack summary

**Cloudflare → Caddy → Next.js / React / Payload on Node 22 → PostgreSQL 16**, all managed with Docker Compose on Ubuntu.
