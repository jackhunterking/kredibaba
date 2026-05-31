-- Add covering indexes for optional workflow foreign keys flagged by advisors.

create index if not exists idx_plan_mortgage_details_property_id
  on public.plan_mortgage_details (property_id);

create index if not exists idx_plan_offers_document_id
  on public.plan_offers (document_id);
