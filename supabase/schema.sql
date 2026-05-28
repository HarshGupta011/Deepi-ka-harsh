-- =====================================================================
-- Deepika & Harsh wedding site — Recommendations schema
--
-- Setup steps:
--   1. Create a free Supabase project at https://supabase.com (≈3 min)
--   2. In the Supabase dashboard → SQL Editor → paste this whole file → Run
--   3. In Project Settings → API, copy the "Project URL" and the "anon public"
--      key.
--   4. Add them to a `.env.local` file at the project root:
--        NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
--        NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
--   5. Restart `npm run dev` so Next.js picks up the env vars.
-- =====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  city text not null check (city in ('bangalore', 'kolkata', 'general')),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 1500),
  author_name text not null check (char_length(author_name) between 1 and 60),
  created_at timestamptz not null default now()
);

create index if not exists recommendations_created_at_idx
  on public.recommendations (created_at desc);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid not null references public.recommendations(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  author_name text not null check (char_length(author_name) between 1 and 60),
  created_at timestamptz not null default now()
);

create index if not exists replies_recommendation_id_idx
  on public.replies (recommendation_id, created_at);

-- Row Level Security: anyone can read + insert; nobody can update/delete
-- via the public API. To moderate (delete spam), use the Supabase dashboard.
alter table public.recommendations enable row level security;
alter table public.replies enable row level security;

drop policy if exists "recommendations are readable by anyone" on public.recommendations;
create policy "recommendations are readable by anyone"
  on public.recommendations for select using (true);

drop policy if exists "anyone can post a recommendation" on public.recommendations;
create policy "anyone can post a recommendation"
  on public.recommendations for insert with check (true);

drop policy if exists "replies are readable by anyone" on public.replies;
create policy "replies are readable by anyone"
  on public.replies for select using (true);

drop policy if exists "anyone can post a reply" on public.replies;
create policy "anyone can post a reply"
  on public.replies for insert with check (true);
