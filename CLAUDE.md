# CLAUDE.md

Context for AI coding sessions on this repo. See `README.md` for the user-facing overview.

## What this is
A wedding website for Deepika & Harsh — Next.js 14 (App Router), TypeScript, Tailwind + `app/globals.css`, Framer Motion, lucide-react. Static-style site (all pages are `'use client'`); no API routes, server actions, or middleware. Content (events, timeline, FAQs, travel) is hardcoded in each page file.

## Run / build / deploy
- `npm run dev` → http://localhost:3000
- `npm run build` → production build. **It type-checks; `next dev` does NOT.** Always run `npm run build` locally before pushing — type errors that are invisible in dev will fail the Vercel build.
- **Deploy:** Vercel, free Hobby. **Production branch is `harsh`** (NOT `main`). Push to `harsh` → auto-deploys to https://deepi-ka-harsh.vercel.app.
- `main` is behind and currently does **not build** (the type fixes only exist on `harsh`). Don't point Vercel at `main` unless `harsh` is merged into it first.

## Backends
- **RSVP → Google Sheets.** `components/RSVPForm.tsx` POSTs (`mode: 'no-cors'`) to a Google Apps Script web app whose `/exec` URL is the committed default (env `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` overrides). `no-cors` ⇒ the form can't read the response, so it always shows success. Apps Script `doPost` appends a row; source is in the deploy plan file.
- **Recommendations → Supabase** (optional). `components/Recommendations.tsx` + `lib/supabase.ts` + `supabase/schema.sql`. Shows a "warming up" placeholder unless `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set and the schema is run. RLS allows public read+insert; moderation = delete rows in the Supabase dashboard.
- **Guestbook** (`app/guestbook/page.tsx`): exists but **unlinked in nav** and **not persisted** (local React state only). Treat as a demo until intentionally wired up.

## Key files
- `components/Navbar.tsx` — nav links live in an array at top (guestbook is intentionally absent).
- `components/Timeline.tsx` — our-story timeline. **Two layouts:** mobile (`md:hidden`, left rail + heart markers, photo-on-top) and desktop (`hidden md:grid`, alternating columns). Edit the matching block.
- `components/RSVPForm.tsx` — large form (guest count, per-guest names, hierarchical event checkboxes, message).
- `app/events/page.tsx` — `EventCard` flip cards; mobile touch handling uses `pointer-events` per face + scroll-reset on flip.
- `app/globals.css` — design tokens + utility classes (`.section-padding`, `.card-elegant`, `.input-elegant`, color vars).

## Conventions
- **Mobile-first is a hard requirement.** Headings scale down on mobile (`text-3xl sm:text-5xl md:text-7xl …`), hero sections under the fixed navbar use the offset `-mt-16 md:-mt-20 pt-28 md:pt-36`, inputs ≥48px touch targets. Re-apply this pattern to any new/refactored UI.
- Keep comments minimal (explain *why*, not *what*).
- Framer-motion v12 typing: `transition.ease` must be a literal (`'easeOut' as const`), not a widened `string`, or the build fails.
- Avoid spreading Sets (`[...new Set(x)]`) — use `Array.from(new Set(x))` (tsconfig target is below es2015).

## Planned / under discussion (RSVP changes — not yet implemented)
1. Limit additional guests to a single **+1** (currently an arbitrary 1–5 count) — simplify `RSVPForm.tsx` guest UI.
2. **Duplicate handling:** dedupe when the same person RSVPs twice (e.g. Apps Script upsert by email instead of always appending).
3. **Per-guest event allow-lists:** maintain an invited-guest list (with allowed events) in the sheet; the form should only show each guest the events they're invited to. Needs a lookup (Apps Script `doGet`/read) keyed on name or email.
