# Inspire Oman CMS (Keystatic)

Content is edited in the browser and saved as files in Git under `content/`.

## Open the admin

```bash
npm run dev
```

Then visit: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

## What you can edit

| Section | What it controls |
|--------|-------------------|
| **Site Settings** | Name, tagline, slogan, description, summit date, venue, hero/banner/summit images |
| **Partners** | OCCI, Gulf Madhyamam, mefriend logos & names |
| **Stats** | Home page counters (500+, 25+, etc.) |
| **Speakers** | Featured + guest speakers |
| **Testimonials** | Quotes on the home page |

Uploaded images go to `public/images/cms/` (also committed to Git).

## How it works

1. Edit in `/keystatic`
2. Files update in `content/` (and image folders)
3. Commit & push to GitHub
4. Vercel (or later DigitalOcean) redeploys with the new content

## Later: team editing on the live server

For production on DigitalOcean with multiple editors, switch `storage.kind` in `keystatic.config.ts` from `"local"` to `"github"` and connect the repo. See: https://keystatic.com/docs/github-mode
