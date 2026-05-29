# Deepika & Harsh Wedding Website

A responsive wedding website built with Next.js 14 and Framer Motion.
**Live:** https://deepi-ka-harsh.vercel.app

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript, React 18
- **Styling:** Tailwind CSS + custom utilities in `app/globals.css`
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data:** RSVP → Google Sheets (Apps Script); Guest recommendations → Supabase (optional)

## Pages

- `/` — Home (envelope intro, hero slideshow, wedding info, Two State section)
- `/our-story` — Story timeline (alternating columns on desktop, left-rail layout on mobile)
- `/events` — Events & schedule (tap-to-flip cards)
- `/travel` — Travel & stay
- `/things-to-do` — Curated tips + guest recommendations feed (Supabase)
- `/rsvp` — RSVP form (writes to a Google Sheet)
- `/gallery` — Photo gallery
- `/registry` — Registry
- `/faq` — FAQs
- `/guestbook` — Guest book (currently **not linked in the nav**; demo only — messages are not persisted)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — also runs type-checking; run before pushing
```

## Environment Variables

Create `.env.local` (gitignored). All are `NEXT_PUBLIC_` so they are inlined at build time. See `.env.example`.

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | RSVP submissions → Google Sheet | No — a working default is committed in `components/RSVPForm.tsx` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (guest recommendations) | Only to enable recommendations |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | Only to enable recommendations |

## RSVP backend

The form (`components/RSVPForm.tsx`) POSTs each submission (`mode: 'no-cors'`) to a Google Apps Script web app that appends a row to a Google Sheet — free, no server. The `/exec` URL is the committed default; the env var overrides it. The Apps Script source lives in the deployment plan.

## Guest recommendations (optional)

`/things-to-do` includes a Supabase-backed recommendations feed (`components/Recommendations.tsx`). Without Supabase env vars it shows a "warming up" placeholder. To enable: create a free Supabase project, run `supabase/schema.sql` (creates `recommendations` + `replies` tables with public read/insert RLS), and set the two Supabase env vars.

## Deployment

Hosted on **Vercel** (free Hobby tier). **Production branch is `harsh`** — pushing to it auto-deploys. `main` is intentionally behind and currently won't build, so keep Vercel's production branch set to `harsh`.

## Fonts

| Font | Usage |
|------|-------|
| **Nothing You Could Do** | Names (Deepika & Harsh), section headings |
| **Montez** | Navigation logo (D & H) |
| **Source Code Pro** | Date, body text |
| **Playfair Display** | Headings (h1–h6) |
| **Great Vibes** | Script accent text |
| **Lato** | Base body font |

## Features

- Envelope intro animation
- Hero image slideshow with smooth sliding transitions
- Responsive navigation with mobile menu
- Two State Wedding section (Kolkata & Bangalore)
- Mobile-first responsive layouts throughout
- Elegant pastel color scheme
