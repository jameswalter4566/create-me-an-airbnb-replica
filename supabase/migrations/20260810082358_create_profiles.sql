-- Profiles table: stores a username tied to a Phantom wallet address.
-- Sign-in is wallet-based (Phantom), so rows are created by the anon role
-- directly from the client using the public anon key.

create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  wallet_address text not null unique,
  username      text not null,
  created_at    timestamptz not null default now()
);

-- Fast lookups by wallet when checking whether a wallet already registered.
create index if not exists profiles_wallet_address_idx
  on public.profiles (wallet_address);

-- Row Level Security -------------------------------------------------------
alter table public.profiles enable row level security;

-- Profiles are public (usernames + wallet addresses are non-secret).
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles
  for select
  using (true);

-- Anyone connecting a wallet may create their profile row. Basic guards keep
-- the data sane (non-empty username, reasonable length).
drop policy if exists "Anyone can create a profile" on public.profiles;
create policy "Anyone can create a profile"
  on public.profiles
  for insert
  with check (
    char_length(trim(username)) between 1 and 40
    and char_length(wallet_address) between 1 and 100
  );
