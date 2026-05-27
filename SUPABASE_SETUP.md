# Supabase setup

Koer denne SQL i Supabase SQL Editor:

```sql
create table if not exists public.stallholders (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
```

## Environment

Udfyld disse i `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Start appen igen efter aendring af `.env`.
