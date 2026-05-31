-- ════════════════════════════════════════════════════════════════════════
-- Kredibaba — Supabase schema, row-level security, storage, and signup trigger
-- Run this once in: Supabase dashboard → SQL Editor → New query → Run.
-- Safe to re-run (idempotent where practical).
-- ════════════════════════════════════════════════════════════════════════

-- ── Helper: keep updated_at fresh ───────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ════════════════════════════════════════════════════════════════════════
-- TABLES
-- ════════════════════════════════════════════════════════════════════════

-- One profile row per auth user (mirrors auth.users.id).
create table if not exists public.profiles (
  id                   uuid primary key references auth.users (id) on delete cascade,
  first_name           text,
  last_name            text,
  email                text,
  phone                text,
  date_of_birth        date,
  marital_status       text,
  residency_status     text,
  first_time_home_buyer boolean default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table if not exists public.plans (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  name             text,
  type             text not null check (type in ('purchase','renewal','refinance')),
  status           text not null default 'new' check (status in ('new','active','submitted','approved','closing','funded','closed','cancelled')),
  outstanding_loan numeric,
  activated_at     timestamptz,
  cancelled_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.plan_steps (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  plan_id           uuid not null references public.plans (id) on delete cascade,
  key               text not null,
  title             text not null,
  status            text not null default 'pending' check (status in ('pending','complete','locked')),
  position          integer not null,
  estimated_minutes integer,
  completed_at      timestamptz,
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (plan_id, key)
);

create table if not exists public.properties (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  address          text not null,
  city             text,
  province         text,
  postal_code      text,
  property_type    text,
  estimated_value  numeric,
  mortgage_balance numeric,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.residences (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  address    text not null,
  status     text check (status in ('own','rent','other')),
  move_in    date,
  move_out   date,
  is_current boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists public.employment (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  employer      text,
  job_title     text,
  type          text check (type in ('full_time','part_time','self_employed','unemployed','retired')),
  income_annual numeric,
  start_date    date,
  end_date      date,
  is_current    boolean default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.additional_income (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  source        text not null,
  amount_annual numeric,
  created_at    timestamptz not null default now()
);

create table if not exists public.assets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  type        text,
  institution text,
  value       numeric,
  created_at  timestamptz not null default now()
);

create table if not exists public.documents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  plan_id      uuid references public.plans (id) on delete set null,
  step_key     text,
  name         text not null,
  category     text,
  status       text not null default 'uploaded' check (status in ('missing','uploaded')),
  storage_path text,
  uploaded_at  timestamptz,
  created_at   timestamptz not null default now()
);

create table if not exists public.plan_mortgage_details (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users (id) on delete cascade,
  plan_id                 uuid not null references public.plans (id) on delete cascade,
  property_id             uuid references public.properties (id) on delete set null,
  target_property_address text,
  target_city             text,
  target_province         text,
  target_postal_code      text,
  purchase_price          numeric,
  down_payment            numeric,
  requested_amount        numeric,
  closing_date            date,
  notes                   text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique (plan_id)
);

create table if not exists public.plan_offers (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  plan_id            uuid not null references public.plans (id) on delete cascade,
  lender_name        text not null,
  rate_percent       numeric,
  term_months        integer,
  amortization_years integer,
  payment_monthly    numeric,
  loan_amount        numeric,
  offer_type         text,
  status             text not null default 'draft' check (status in ('draft','selected','declined')),
  selected_at        timestamptz,
  document_id        uuid references public.documents (id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists public.co_applicants (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  plan_id         uuid not null references public.plans (id) on delete cascade,
  first_name      text not null,
  last_name       text,
  email           text,
  phone           text,
  relationship    text,
  is_title_holder boolean not null default true,
  status          text not null default 'draft' check (status in ('draft','invited','accepted','declined')),
  invited_at      timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- owner lookup indexes (also cover FK checks)
create index if not exists idx_plans_user_id on public.plans (user_id);
create index if not exists idx_plan_steps_user_id on public.plan_steps (user_id);
create index if not exists idx_plan_steps_plan_id on public.plan_steps (plan_id);
create index if not exists idx_properties_user_id on public.properties (user_id);
create index if not exists idx_residences_user_id on public.residences (user_id);
create index if not exists idx_employment_user_id on public.employment (user_id);
create index if not exists idx_additional_income_user_id on public.additional_income (user_id);
create index if not exists idx_assets_user_id on public.assets (user_id);
create index if not exists idx_documents_user_id on public.documents (user_id);
create index if not exists idx_documents_plan_id on public.documents (plan_id);
create index if not exists idx_plan_mortgage_details_user_id on public.plan_mortgage_details (user_id);
create index if not exists idx_plan_mortgage_details_plan_id on public.plan_mortgage_details (plan_id);
create index if not exists idx_plan_mortgage_details_property_id on public.plan_mortgage_details (property_id);
create index if not exists idx_plan_offers_user_id on public.plan_offers (user_id);
create index if not exists idx_plan_offers_plan_id on public.plan_offers (plan_id);
create index if not exists idx_plan_offers_document_id on public.plan_offers (document_id);
create index if not exists idx_co_applicants_user_id on public.co_applicants (user_id);
create index if not exists idx_co_applicants_plan_id on public.co_applicants (plan_id);

-- updated_at triggers
drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
drop trigger if exists trg_plans_updated on public.plans;
create trigger trg_plans_updated before update on public.plans
  for each row execute function public.set_updated_at();
drop trigger if exists trg_plan_steps_updated on public.plan_steps;
create trigger trg_plan_steps_updated before update on public.plan_steps
  for each row execute function public.set_updated_at();
drop trigger if exists trg_properties_updated on public.properties;
create trigger trg_properties_updated before update on public.properties
  for each row execute function public.set_updated_at();
drop trigger if exists trg_plan_mortgage_details_updated on public.plan_mortgage_details;
create trigger trg_plan_mortgage_details_updated before update on public.plan_mortgage_details
  for each row execute function public.set_updated_at();
drop trigger if exists trg_plan_offers_updated on public.plan_offers;
create trigger trg_plan_offers_updated before update on public.plan_offers
  for each row execute function public.set_updated_at();
drop trigger if exists trg_co_applicants_updated on public.co_applicants;
create trigger trg_co_applicants_updated before update on public.co_applicants
  for each row execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — every row is private to its owner
-- ════════════════════════════════════════════════════════════════════════
alter table public.profiles          enable row level security;
alter table public.plans             enable row level security;
alter table public.plan_steps        enable row level security;
alter table public.properties        enable row level security;
alter table public.residences        enable row level security;
alter table public.employment        enable row level security;
alter table public.additional_income enable row level security;
alter table public.assets            enable row level security;
alter table public.documents         enable row level security;
alter table public.plan_mortgage_details enable row level security;
alter table public.plan_offers       enable row level security;
alter table public.co_applicants     enable row level security;

-- profiles keyed on id = auth.uid()
drop policy if exists "profiles_self" on public.profiles;
create policy "profiles_self" on public.profiles
  for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- everything else keyed on user_id = auth.uid()
do $$
declare t text;
begin
  foreach t in array array[
    'plans',
    'plan_steps',
    'properties',
    'residences',
    'employment',
    'additional_income',
    'assets',
    'documents',
    'plan_mortgage_details',
    'plan_offers',
    'co_applicants'
  ]
  loop
    execute format('drop policy if exists "%s_owner" on public.%I;', t, t);
    execute format(
      'create policy "%s_owner" on public.%I for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);',
      t, t);
  end loop;
end $$;

-- ════════════════════════════════════════════════════════════════════════
-- AUTO-CREATE a profile row whenever a new auth user signs up
-- ════════════════════════════════════════════════════════════════════════
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- ════════════════════════════════════════════════════════════════════════
-- STORAGE — private "documents" bucket, files namespaced by user id
-- Path convention: <auth.uid()>/<filename>
-- ════════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "documents_read_own"   on storage.objects;
drop policy if exists "documents_insert_own" on storage.objects;
drop policy if exists "documents_update_own" on storage.objects;
drop policy if exists "documents_delete_own" on storage.objects;

create policy "documents_read_own" on storage.objects
  for select using (
    bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "documents_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "documents_update_own" on storage.objects
  for update using (
    bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "documents_delete_own" on storage.objects
  for delete using (
    bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
