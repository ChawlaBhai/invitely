-- Run this in your Supabase SQL editor to set up the schema

create table if not exists invites (
  slug text primary key,
  template_id text not null,
  data jsonb not null,
  created_at timestamptz default now(),
  expires_at timestamptz not null,
  tier text default 'classic',
  views integer default 0,
  last_viewed_at timestamptz,
  referred_by text
);

create table if not exists rsvps (
  id text primary key,
  slug text not null references invites(slug) on delete cascade,
  name text not null,
  phone text,
  attending text not null check (attending in ('yes', 'no', 'maybe')),
  guests integer default 1,
  message text,
  created_at timestamptz default now()
);

create index if not exists rsvps_slug_idx on rsvps(slug);

create table if not exists leads (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz default now()
);

-- Function for atomic view increment (avoids race conditions)
create or replace function increment_views(invite_slug text)
returns void as $$
  update invites
  set views = views + 1, last_viewed_at = now()
  where slug = invite_slug;
$$ language sql;

-- Enable RLS (Row Level Security) — all access via service role key only
alter table invites enable row level security;
alter table rsvps enable row level security;
alter table leads enable row level security;
