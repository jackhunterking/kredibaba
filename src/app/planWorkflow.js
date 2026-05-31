export const PLAN_TYPE_DEFAULTS = {
  purchase: { label: "New Mortgage", defaultName: "New Mortgage" },
  renewal: { label: "Renew / Switch", defaultName: "Renew / Switch" },
  refinance: { label: "Refinance", defaultName: "Refinance" },
};

export const PLAN_STATUSES = [
  "new",
  "active",
  "submitted",
  "approved",
  "closing",
  "funded",
  "closed",
  "cancelled",
];

export const PLAN_STATUS_TONE = {
  new: "amber",
  active: "accent",
  submitted: "accent",
  approved: "green",
  closing: "amber",
  funded: "green",
  closed: "green",
  cancelled: "danger",
};

export const PLAN_STEPS = [
  { key: "profile", title: "Profile", estimated_minutes: 15 },
  { key: "property_mortgage", title: "Property and Mortgage", estimated_minutes: 8 },
  { key: "review_offer", title: "Review Mortgage Offer", estimated_minutes: 5 },
  { key: "mortgage_application", title: "Mortgage Application", estimated_minutes: 5 },
  { key: "compliance_documents", title: "Compliance Documents", estimated_minutes: 8 },
  { key: "commitment_letter", title: "Commitment Letter", estimated_minutes: 5 },
  { key: "ready_to_fund", title: "Ready to Fund", estimated_minutes: 3 },
];

export function defaultPlanName(type) {
  return PLAN_TYPE_DEFAULTS[type]?.defaultName || null;
}

export function buildDefaultPlanSteps(planId) {
  return PLAN_STEPS.map((step, index) => ({
    plan_id: planId,
    key: step.key,
    title: step.title,
    status: "pending",
    position: index + 1,
    estimated_minutes: step.estimated_minutes,
    completed_at: null,
    metadata: {},
  }));
}

export function isPlanVisible(plan) {
  return plan?.status !== "cancelled" && !plan?.cancelled_at;
}

export function orderedSteps(steps = []) {
  return [...steps].sort((a, b) => {
    const ap = a?.position ?? 0;
    const bp = b?.position ?? 0;
    if (ap === bp) return String(a?.key || "").localeCompare(String(b?.key || ""));
    return ap - bp;
  });
}

export function isStepLocked(step, steps = []) {
  const ordered = orderedSteps(steps);
  const index = ordered.findIndex((s) => s.key === step?.key);
  if (index <= 0) return false;
  return ordered.slice(0, index).some((s) => s.status !== "complete");
}

export function nextOpenStepKey(steps = []) {
  const ordered = orderedSteps(steps);
  return ordered.find((step) => step.status !== "complete" && !isStepLocked(step, ordered))?.key || ordered[0]?.key;
}

const present = (value) => value !== null && value !== undefined && String(value).trim() !== "";
const uploadedForStep = (documents = [], key) =>
  documents.some((doc) => doc.step_key === key && doc.status !== "missing");

export function canCompleteStep(key, ctx = {}) {
  const {
    profile,
    residences = [],
    employment = [],
    assets = [],
    mortgageDetails,
    offers = [],
    documents = [],
    step,
    plan,
  } = ctx;
  const metadata = step?.metadata || {};

  switch (key) {
    case "profile":
      return !!(
        present(profile?.first_name) &&
        present(profile?.last_name) &&
        present(profile?.email) &&
        residences.length > 0 &&
        employment.length > 0 &&
        assets.length > 0
      );
    case "property_mortgage":
      return !!(
        (present(mortgageDetails?.target_property_address) || present(mortgageDetails?.property_id)) &&
        (present(mortgageDetails?.requested_amount) ||
          present(mortgageDetails?.purchase_price) ||
          present(plan?.outstanding_loan))
      );
    case "review_offer":
      return offers.some((offer) => offer.status === "selected");
    case "mortgage_application":
      return metadata.application_confirmed === true;
    case "compliance_documents":
      return metadata.documents_confirmed === true || uploadedForStep(documents, key);
    case "commitment_letter":
      return metadata.documents_confirmed === true || uploadedForStep(documents, key);
    case "ready_to_fund":
      return metadata.funding_confirmed === true;
    default:
      return false;
  }
}

export function completionPayload() {
  return { status: "complete", completed_at: new Date().toISOString() };
}
