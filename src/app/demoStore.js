import { buildDefaultPlanSteps } from "./planWorkflow.js";

export const DEMO_AUTH_KEY = "kb-demo-auth";
export const DEMO_DATA_KEY = "kb-demo-data-v3";

export const DEMO_USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "demo@kredibaba.ca",
  user_metadata: { first_name: "Ahmet", last_name: "Yilmaz" },
};

const now = "2026-05-31T18:00:00.000Z";

const demoSteps = (planId, completeKeys = []) =>
  buildDefaultPlanSteps(planId).map((step, index) => ({
    ...step,
    id: `demo-step-${planId}-${step.key}`,
    user_id: DEMO_USER.id,
    status: completeKeys.includes(step.key) ? "complete" : "pending",
    completed_at: completeKeys.includes(step.key) ? "2026-05-29T16:00:00.000Z" : null,
    created_at: new Date(Date.parse(now) + index * 1000).toISOString(),
    updated_at: new Date(Date.parse(now) + index * 1000).toISOString(),
  }));

export const DEMO_PROFILE = {
  id: DEMO_USER.id,
  email: DEMO_USER.email,
  first_name: "Ahmet",
  last_name: "Yilmaz",
  phone: "+1 416 555 0198",
  date_of_birth: "1988-04-14",
  marital_status: "married",
  residency_status: "permanent_resident",
  first_time_home_buyer: true,
  created_at: now,
  updated_at: now,
};

export const DEMO_TABLES = {
  plans: [
    {
      id: "demo-plan-purchase",
      user_id: DEMO_USER.id,
      name: "İlk Ev Ön Onayı",
      type: "purchase",
      status: "new",
      outstanding_loan: null,
      activated_at: null,
      cancelled_at: null,
      created_at: "2026-05-28T15:30:00.000Z",
      updated_at: "2026-05-28T15:30:00.000Z",
    },
    {
      id: "demo-plan-refinance",
      user_id: DEMO_USER.id,
      name: "Refinansman İncelemesi",
      type: "refinance",
      status: "new",
      outstanding_loan: 512000,
      activated_at: null,
      cancelled_at: null,
      created_at: "2026-05-22T11:10:00.000Z",
      updated_at: "2026-05-22T11:10:00.000Z",
    },
  ],
  plan_steps: [
    ...demoSteps("demo-plan-purchase"),
    ...demoSteps("demo-plan-refinance", ["profile"]),
  ],
  plan_mortgage_details: [
    {
      id: "demo-mortgage-detail-refinance",
      user_id: DEMO_USER.id,
      plan_id: "demo-plan-refinance",
      property_id: "demo-property-1",
      target_property_address: "1285 Queen St W",
      target_city: "Toronto",
      target_province: "ON",
      target_postal_code: "M6K 1L2",
      purchase_price: null,
      down_payment: null,
      requested_amount: 535000,
      closing_date: null,
      notes: "Review refinance options and possible HELOC alternatives.",
      created_at: "2026-05-29T12:00:00.000Z",
      updated_at: "2026-05-29T12:00:00.000Z",
    },
  ],
  plan_offers: [
    {
      id: "demo-offer-refinance-1",
      user_id: DEMO_USER.id,
      plan_id: "demo-plan-refinance",
      lender_name: "Sample Lender",
      rate_percent: 4.69,
      term_months: 36,
      amortization_years: 25,
      payment_monthly: 3025,
      loan_amount: 535000,
      offer_type: "fixed",
      status: "draft",
      selected_at: null,
      document_id: null,
      created_at: "2026-05-30T10:00:00.000Z",
      updated_at: "2026-05-30T10:00:00.000Z",
    },
  ],
  co_applicants: [
    {
      id: "demo-coapplicant-1",
      user_id: DEMO_USER.id,
      plan_id: "demo-plan-refinance",
      first_name: "Elif",
      last_name: "Yilmaz",
      email: "elif@example.com",
      phone: "+1 416 555 0199",
      relationship: "Spouse",
      is_title_holder: true,
      status: "draft",
      invited_at: null,
      created_at: "2026-05-30T12:00:00.000Z",
      updated_at: "2026-05-30T12:00:00.000Z",
    },
  ],
  properties: [
    {
      id: "demo-property-1",
      user_id: DEMO_USER.id,
      address: "1285 Queen St W",
      city: "Toronto",
      province: "ON",
      postal_code: "M6K 1L2",
      property_type: "condo",
      estimated_value: 815000,
      mortgage_balance: 512000,
      created_at: "2026-05-26T13:15:00.000Z",
      updated_at: "2026-05-26T13:15:00.000Z",
    },
  ],
  residences: [
    {
      id: "demo-residence-1",
      user_id: DEMO_USER.id,
      address: "1285 Queen St W, Toronto, ON",
      status: "own",
      move_in: "2023-09-01",
      move_out: null,
      is_current: true,
      created_at: now,
    },
    {
      id: "demo-residence-2",
      user_id: DEMO_USER.id,
      address: "44 King St E, Mississauga, ON",
      status: "rent",
      move_in: "2021-06-01",
      move_out: "2023-08-31",
      is_current: false,
      created_at: "2026-05-20T16:20:00.000Z",
    },
  ],
  employment: [
    {
      id: "demo-employment-1",
      user_id: DEMO_USER.id,
      employer: "Maple Cloud Systems",
      job_title: "Ürün Yöneticisi",
      type: "full_time",
      income_annual: 126000,
      start_date: "2022-03-01",
      end_date: null,
      is_current: true,
      created_at: now,
    },
  ],
  additional_income: [
    {
      id: "demo-income-1",
      user_id: DEMO_USER.id,
      source: "Yıllık bonus",
      amount_annual: 12000,
      created_at: now,
    },
  ],
  assets: [
    {
      id: "demo-asset-1",
      user_id: DEMO_USER.id,
      type: "savings",
      institution: "RBC",
      value: 68000,
      created_at: now,
    },
    {
      id: "demo-asset-2",
      user_id: DEMO_USER.id,
      type: "investment",
      institution: "Questrade",
      value: 42500,
      created_at: "2026-05-21T12:00:00.000Z",
    },
  ],
  documents: [
    {
      id: "demo-document-1",
      user_id: DEMO_USER.id,
      name: "2025 Notice of Assessment.pdf",
      category: "Gelir",
      status: "uploaded",
      storage_path: null,
      plan_id: "demo-plan-refinance",
      step_key: "compliance_documents",
      uploaded_at: "2026-05-27T14:10:00.000Z",
      created_at: "2026-05-27T14:10:00.000Z",
    },
    {
      id: "demo-document-2",
      user_id: DEMO_USER.id,
      name: "Son iki maaş bordrosu",
      category: "Gelir",
      status: "missing",
      storage_path: null,
      plan_id: "demo-plan-purchase",
      step_key: "mortgage_application",
      uploaded_at: null,
      created_at: "2026-05-25T09:00:00.000Z",
    },
  ],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readData() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(DEMO_DATA_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeData(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(data));
  } catch {
    /* ignore storage failures */
  }
}

export function isDemoAuthStored() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_AUTH_KEY) === "1";
}

export function setDemoAuthStored(enabled) {
  if (typeof window === "undefined") return;
  if (enabled) window.localStorage.setItem(DEMO_AUTH_KEY, "1");
  else window.localStorage.removeItem(DEMO_AUTH_KEY);
}

export function loadDemoTable(table) {
  const data = readData();
  if (!data[table]) {
    data[table] = clone(DEMO_TABLES[table] || []);
    writeData(data);
  }
  return data[table];
}

export function saveDemoTable(table, rows) {
  const data = readData();
  data[table] = rows;
  writeData(data);
}

export function loadDemoProfile() {
  const data = readData();
  if (!data.profile) {
    data.profile = clone(DEMO_PROFILE);
    writeData(data);
  }
  return data.profile;
}

export function saveDemoProfile(profile) {
  const data = readData();
  data.profile = profile;
  writeData(data);
}

export function newDemoId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
