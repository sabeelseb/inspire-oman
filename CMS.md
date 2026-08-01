# Inspire Oman CMS (Keystatic)

Content is edited in the browser and saved as files in Git under `content/`.

## Open the admin

```bash
npm run dev
```

Then visit: http://localhost:3000/keystatic

Live: https://inspire-oman.vercel.app/keystatic

## What you can edit

| Section | Controls |
|--------|----------|
| Site Settings | Name, slogan, dates, venue, hero/banner images |
| Partners | Logos and names |
| Stats | Home counters |
| Speakers | Featured + guest speakers |
| Testimonials | Home quotes |

## Important

- Seeded content lives in `content/*.yaml` (in Git).
- Prefer editing with `npm run dev` locally, then commit and push.
- On Vercel, **viewing** entries works after deploy; **saving** from the live admin is unreliable with local storage. Switch to GitHub mode later for production editing.
