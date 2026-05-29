# CLAUDE.md

Context for AI coding sessions on this repo. See `README.md` for the user-facing overview.

## What this is
A wedding website for Deepika & Harsh — Next.js 14 (App Router), TypeScript, Tailwind + `app/globals.css`, Framer Motion, lucide-react. Static-style site (all pages are `'use client'`); no API routes, server actions, or middleware. Content (events, timeline, FAQs, travel) is hardcoded in each page file.

## Run / build / deploy
- `npm run dev` → http://localhost:3000
- `npm run build` → production build. **It type-checks; `next dev` does NOT.** Always run `npm run build` locally before pushing — type errors that are invisible in dev will fail the Vercel build.
- **Deploy:** Vercel, free Hobby. **Production branch is `main`.** Push to `main` → auto-deploys to https://deepi-ka-harsh.vercel.app. (`harsh` was the old production branch; production now tracks `main`.)

## Backends
- **RSVP → Google Sheets.** `components/RSVPForm.tsx` POSTs (`mode: 'no-cors'`) to a Google Apps Script web app whose `/exec` URL is the committed default (env `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` overrides). `no-cors` ⇒ the form can't read the POST response, so submit always shows success; dedupe is enforced server-side instead (`doPost` upserts by normalized name + `LockService`). **Apps Script source is now committed at `apps-script/Code.gs`** (version control only — Apps Script doesn't pull from the repo). To change the backend: paste `Code.gs` into the bound Apps Script editor, then Deploy → Manage deployments → edit the existing web app → **New version** (keeps the `/exec` URL stable).
  - **`doGet` lookup** (readable GET; falls back to JSONP): keyed on first+last name, returns `{ alreadyRSVPd, allowedEvents, found, ... }`. Powers two form behaviors: (1) **duplicate detection** — typing both names auto-checks for a prior RSVP and shows a "reach out to Harsh/Deepika" notice + disables submit; (2) **per-guest event allow-list** — the event tree is filtered to the guest's invited events. Both fail open (lookup error / unmatched name ⇒ all events shown, submit allowed). The +1 inherits the primary guest's allow-list.
  - **Sheet tabs:** `Responses` (submissions; has a trailing `nameKey` helper column) and `InviteList` (`firstName, lastName, allowedEvents` — comma-separated event ids or `ALL`). Name matching is normalized (lowercase, trimmed, diacritics stripped); `normalizeName` in `Code.gs` and `normalizeNameClient` in `RSVPForm.tsx` must stay identical. Moderation = edit/delete rows in the Sheet.
  - **Confirmation email:** `doPost` calls `sendConfirmationEmail(data)` (in `Code.gs`) after each successful upsert — a branded HTML email via `MailApp.sendEmail` (free; ~100 recipients/day on consumer Gmail). Attendees get their event list (ids → `EVENT_LABELS`); decliners get a "we'll miss you" note. Only the primary guest is emailed (the form collects no +1 email). The send is fully self-guarded (validates address, swallows all errors) so a mail failure never affects the RSVP write. **Adding `MailApp` introduced a new OAuth scope — re-deploying prompts a one-time re-authorization.** Reply-to = `COUPLE_CONTACT_EMAIL` const.
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

## RSVP changes — implemented
1. ~~Limit additional guests to a single **+1**.~~ Done (`guestCount` toggles 1↔2).
2. ~~**Duplicate handling.**~~ Done — `doPost` upserts by normalized name; `doGet` lets the form detect a prior RSVP on name entry. See the RSVP backend bullet above.
3. ~~**Per-guest event allow-lists.**~~ Done — `InviteList` tab + `doGet` lookup filter the event tree (fail-open). See above.

## Still open / future
- Name-only matching can't distinguish two real guests with the same name, and won't catch transliteration variants (Deepika/Dipika) — fail-open covers the latter. Email-augmented keying is the upgrade path if collisions show up.
