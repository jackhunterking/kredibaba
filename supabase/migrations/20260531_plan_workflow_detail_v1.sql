-- Kredibaba plan detail workflow v1.
-- Safe to apply after the initial dashboard schema.

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end; $$;

alter table public.plans
  add column if not exists outstanding_loan numeric,
  add column if not exists activated_at timestamptz,
  add column if not exists cancelled_at timestamptz;

alter table public.plans drop constraint if exists plans_status_check;
alter table public.plans
  add constraint plans_status_check
  check (status in ('new','active','submitted','approved','closing','funded','closed','cancelled'));

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

alter table public.documents
  add column if not exists plan_id uuid references public.plans (id) on delete set null,
  add column if not exists step_key text;

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

create index if not exists idx_plan_steps_user_id on public.plan_steps (user_id);
create index if not exists idx_plan_steps_plan_id on public.plan_steps (plan_id);
create index if not exists idx_documents_plan_id on public.documents (plan_id);
create index if not exists idx_plan_mortgage_details_user_id on public.plan_mortgage_details (user_id);
create index if not exists idx_plan_mortgage_details_plan_id on public.plan_mortgage_details (plan_id);
create index if not exists idx_plan_offers_user_id on public.plan_offers (user_id);
create index if not exists idx_plan_offers_plan_id on public.plan_offers (plan_id);
create index if not exists idx_co_applicants_user_id on public.co_applicants (user_id);
create index if not exists idx_co_applicants_plan_id on public.co_applicants (plan_id);

drop trigger if exists trg_plan_steps_updated on public.plan_steps;
create trigger trg_plan_steps_updated before update on public.plan_steps
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

alter table public.plan_steps enable row level security;
alter table public.plan_mortgage_details enable row level security;
alter table public.plan_offers enable row level security;
alter table public.co_applicants enable row level security;

do $$
declare t text;
begin
  foreach t in array array['plan_steps','plan_mortgage_details','plan_offers','co_applicants']
  loop
    execute format('drop policy if exists "%s_owner" on public.%I;', t, t);
    execute format(
      'create policy "%s_owner" on public.%I for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);',
      t, t);
  end loop;
end $$;
