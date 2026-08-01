# Inspire Oman CMS (Keystatic)

Admin: https://inspire-oman.vercel.app/keystatic  
Local (recommended): http://localhost:3000/keystatic (`npm run dev`)

All public site copy is stored under `content/` and shown in the dashboard. Live pages read from these files.

## Dashboard navigation

### Pages
Edit hero / section copy for each route:
| Dashboard item | Live page |
|----------------|-----------|
| **Home** | `/` **Hero** (date, city, title, slogan, venue, CTAs, image) + About + bottom CTA |
| **About** | `/about` |
| **Pillars page** | `/pillars` hero |
| **Summit page** | `/summit` hero |
| **Partner page** | `/partner` hero |
| **Media page** | `/media` hero |
| **Contact page** | `/contact` hero |

### Site content
| Dashboard item | Used on |
|----------------|---------|
| **Partners** | Home partners |
| **Stats** | Home counters |
| **Speakers** | Home + Summit |
| **Testimonials** | Home |
| **Pillars** | Home + Pillars page body |
| **Partnership Packages** | Home + Partner page |
| **About Values** | About values grid |

### Summit & media
| Dashboard item | Used on |
|----------------|---------|
| **Summit Agenda** | Summit programme |
| **Media Gallery** | Media photos |
| **Media Videos** | Media videos |
| **Press Releases** | Media news |

### Settings
| Dashboard item | Used on |
|----------------|---------|
| **Site Settings** | Global name, slogan, dates, venue, phones, emails, social, partner org names, images |

## Workflow
1. Prefer editing locally (`npm run dev` → `/keystatic`)
2. Give lists a few seconds to load (first open can look empty while files sync)
3. Save → files update under `content/`
4. Commit & push → Vercel redeploys

Saving from the live Vercel admin is unreliable with local storage; use local edits + Git for lasting changes.
