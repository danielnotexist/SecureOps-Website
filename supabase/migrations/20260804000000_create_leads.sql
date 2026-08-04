-- Leads captured from the website contact forms.
-- Written only by the submit-lead edge function (service role). RLS is on with
-- no policies, so the anon/public key cannot read or write this table at all --
-- customer contact details must never be readable from the browser.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  email         text not null,
  company_size  text,
  topic         text,
  message       text,
  source        text not null default 'unknown',
  user_agent    text,
  handled       boolean not null default false
);

alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_handled_idx on public.leads (handled) where handled = false;
