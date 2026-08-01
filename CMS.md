# Inspire Oman CMS (Keystatic)

Admin: https://inspire-oman.vercel.app/keystatic  
Local: http://localhost:3000/keystatic (`npm run dev`)

All public site copy and lists below are seeded under `content/` and editable in the dashboard. The live pages read from these files.

## Dashboard sections

### Site-wide
| Section | Edits |
|--------|--------|
| **Site Settings** | Name, slogan, dates, venue, images, phones, emails, social links, partner org names |

### Pages
| Section | Edits |
|--------|--------|
| **Page: Home** | About copy, tags, CTA |
| **Page: About** | Hero, mission, quote, audience list, section titles |
| **Page: Pillars** | Hero copy |
| **Page: Summit** | Hero copy |
| **Page: Partner** | Hero copy |
| **Page: Media** | Hero copy |
| **Page: Contact** | Hero copy |

### Collections (wired to the live site)
| Section | Used on |
|--------|--------|
| **Partners** | Home partners strip |
| **Stats** | Home counters |
| **Speakers** | Home + Summit |
| **Testimonials** | Home |
| **Pillars** | Home + Pillars page (features + highlight cards) |
| **Partnership Packages** | Home + Partner page |
| **Summit Agenda** | Summit programme |
| **Media Gallery** | Media photo gallery |
| **Media Videos** | Media video cards |
| **Press Releases** | Media news list |
| **About Values** | About values grid |

## Workflow
1. Prefer editing locally (`npm run dev` → `/keystatic`)
2. Save → files update under `content/`
3. Commit & push → Vercel redeploys

Saving from the live Vercel admin is unreliable with local storage; use Git commits for lasting changes.
