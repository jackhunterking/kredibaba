import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { useAuth } from "../AuthContext.jsx";
import {
  loadDemoProfile,
  loadDemoTable,
  newDemoId,
  saveDemoProfile,
  saveDemoTable,
} from "../demoStore.js";
import {
  buildDefaultPlanSteps,
  defaultPlanName,
  isPlanVisible,
} from "../planWorkflow.js";

// ── Generic owner-scoped table hook ───────────────────────────────────
// RLS enforces ownership server-side; inserts stamp user_id client-side.
export function useTable(table, { order = "created_at", ascending = false } = {}) {
  const { user, isDemo } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortRows = useCallback((items) => {
    const sorted = [...items];
    sorted.sort((a, b) => {
      const av = a?.[order] ?? "";
      const bv = b?.[order] ?? "";
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (ascending ? 1 : -1);
    });
    return sorted;
  }, [order, ascending]);

  const refresh = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    if (isDemo) {
      setRows(sortRows(loadDemoTable(table)));
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(order, { ascending });
    if (error) setError(error.message);
    else { setRows(data || []); setError(null); }
    setLoading(false);
  }, [user, isDemo, table, order, ascending, sortRows]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (values) => {
    if (isDemo) {
      const data = {
        id: newDemoId(table),
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...values,
      };
      setRows((r) => {
        const next = sortRows([...r, data]);
        saveDemoTable(table, next);
        return next;
      });
      return data;
    }
    const { data, error } = await supabase.from(table).insert({ ...values, user_id: user.id }).select().single();
    if (error) throw error;
    setRows((r) => (ascending ? [...r, data] : [data, ...r]));
    return data;
  };

  const update = async (id, values) => {
    if (isDemo) {
      let data = null;
      setRows((r) => {
        const next = sortRows(r.map((x) => {
          if (x.id !== id) return x;
          data = { ...x, ...values, updated_at: new Date().toISOString() };
          return data;
        }));
        saveDemoTable(table, next);
        return next;
      });
      return data;
    }
    const { data, error } = await supabase.from(table).update(values).eq("id", id).select().single();
    if (error) throw error;
    setRows((r) => r.map((x) => (x.id === id ? data : x)));
    return data;
  };

  const remove = async (id) => {
    if (isDemo) {
      setRows((r) => {
        const next = r.filter((x) => x.id !== id);
        saveDemoTable(table, next);
        return next;
      });
      return;
    }
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return { rows, loading, error, refresh, add, update, remove };
}

// ── Plans ─────────────────────────────────────────────────────────────
export function usePlans() {
  const t = useTable("plans");
  const steps = useTable("plan_steps", { order: "position", ascending: true });

  const createPlan = async (type) => {
    const plan = await t.add({
      type,
      name: defaultPlanName(type),
      status: "new",
      outstanding_loan: null,
      activated_at: null,
      cancelled_at: null,
    });
    const stepRows = buildDefaultPlanSteps(plan.id);
    for (const row of stepRows) await steps.add(row);
    return plan;
  };

  const updatePlan = (id, values) => t.update(id, values);
  const activatePlan = (id) => t.update(id, { status: "active", activated_at: new Date().toISOString() });
  const cancelPlan = (id) => t.update(id, { status: "cancelled", cancelled_at: new Date().toISOString() });

  return {
    plans: t.rows.filter(isPlanVisible),
    allPlans: t.rows,
    loading: t.loading,
    error: t.error,
    createPlan,
    updatePlan,
    activatePlan,
    cancelPlan,
    removePlan: cancelPlan,
    refresh: t.refresh,
  };
}

export function usePlan(planId) {
  const t = useTable("plans");
  const plan = t.rows.find((row) => row.id === planId) || null;
  const updatePlan = (values) => t.update(planId, values);
  const activatePlan = () => t.update(planId, { status: "active", activated_at: new Date().toISOString() });
  const cancelPlan = () => t.update(planId, { status: "cancelled", cancelled_at: new Date().toISOString() });
  return { plan, loading: t.loading, error: t.error, updatePlan, activatePlan, cancelPlan, refresh: t.refresh };
}

export function usePlanSteps(planId) {
  const t = useTable("plan_steps", { order: "position", ascending: true });
  const steps = t.rows.filter((row) => row.plan_id === planId);

  const ensureSteps = async () => {
    if (!planId || t.loading || steps.length > 0) return;
    for (const row of buildDefaultPlanSteps(planId)) await t.add(row);
  };

  const updateStep = (id, values) => t.update(id, values);
  const updateStepByKey = async (key, values) => {
    const step = steps.find((row) => row.key === key);
    if (!step) return null;
    return updateStep(step.id, values);
  };

  return { steps, loading: t.loading, error: t.error, ensureSteps, updateStep, updateStepByKey, refresh: t.refresh };
}

export function usePlanMortgageDetails(planId) {
  const t = useTable("plan_mortgage_details");
  const details = t.rows.find((row) => row.plan_id === planId) || null;
  const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
  const saveDetails = (values) => {
    const payload = {
      plan_id: planId,
      property_id: values.property_id || null,
      target_property_address: values.target_property_address || null,
      target_city: values.target_city || null,
      target_province: values.target_province || null,
      target_postal_code: values.target_postal_code || null,
      purchase_price: num(values.purchase_price),
      down_payment: num(values.down_payment),
      requested_amount: num(values.requested_amount),
      closing_date: values.closing_date || null,
      notes: values.notes || null,
    };
    return details ? t.update(details.id, payload) : t.add(payload);
  };
  return { details, loading: t.loading, error: t.error, saveDetails, refresh: t.refresh };
}

export function usePlanOffers(planId) {
  const t = useTable("plan_offers");
  const offers = t.rows.filter((row) => row.plan_id === planId);
  const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
  const addOffer = (values) => t.add({
    plan_id: planId,
    lender_name: values.lender_name,
    rate_percent: num(values.rate_percent),
    term_months: num(values.term_months),
    amortization_years: num(values.amortization_years),
    payment_monthly: num(values.payment_monthly),
    loan_amount: num(values.loan_amount),
    offer_type: values.offer_type || null,
    status: values.status || "draft",
    selected_at: values.status === "selected" ? new Date().toISOString() : null,
  });
  const updateOffer = (id, values) => t.update(id, values);
  const selectOffer = async (id) => {
    for (const offer of offers) {
      await t.update(offer.id, {
        status: offer.id === id ? "selected" : "draft",
        selected_at: offer.id === id ? new Date().toISOString() : null,
      });
    }
  };
  return { offers, loading: t.loading, error: t.error, addOffer, updateOffer, selectOffer, removeOffer: t.remove, refresh: t.refresh };
}

export function useCoApplicants(planId) {
  const t = useTable("co_applicants");
  const coApplicants = t.rows.filter((row) => row.plan_id === planId);
  const addCoApplicant = (values) => t.add({
    plan_id: planId,
    first_name: values.first_name,
    last_name: values.last_name || null,
    email: values.email || null,
    phone: values.phone || null,
    relationship: values.relationship || null,
    is_title_holder: values.is_title_holder !== false,
    status: values.status || "draft",
    invited_at: values.status === "invited" ? new Date().toISOString() : null,
  });
  const updateCoApplicant = (id, values) => t.update(id, values);
  return { coApplicants, loading: t.loading, error: t.error, addCoApplicant, updateCoApplicant, removeCoApplicant: t.remove, refresh: t.refresh };
}

// ── Properties ────────────────────────────────────────────────────────
export function useProperties() {
  const t = useTable("properties");
  return { properties: t.rows, loading: t.loading, error: t.error, addProperty: t.add, removeProperty: t.remove, refresh: t.refresh };
}

// ── Profile (single row, keyed on auth uid) ───────────────────────────
export function useProfile() {
  const { user, isDemo } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    if (isDemo) {
      setProfile(loadDemoProfile());
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    setProfile(data || { id: user.id, email: user.email });
    setLoading(false);
  }, [user, isDemo]);

  useEffect(() => { refresh(); }, [refresh]);

  const updateProfile = async (values) => {
    if (isDemo) {
      const data = { ...loadDemoProfile(), ...values, updated_at: new Date().toISOString() };
      saveDemoProfile(data);
      setProfile(data);
      return data;
    }
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email, ...values })
      .select()
      .single();
    if (error) throw error;
    setProfile(data);
    return data;
  };

  return { profile, loading, updateProfile, refresh };
}

// ── Profile sub-collections ───────────────────────────────────────────
export const useResidences = () => useTable("residences");
export const useEmployment = () => useTable("employment");
export const useAdditionalIncome = () => useTable("additional_income");
export const useAssets = () => useTable("assets");

// ── Documents (+ storage upload) ──────────────────────────────────────
export function useDocuments(planId = null) {
  const { user, isDemo } = useAuth();
  const t = useTable("documents");
  const documents = planId ? t.rows.filter((doc) => doc.plan_id === planId) : t.rows;

  const uploadDocument = async (file, category = null, extra = {}) => {
    if (isDemo) {
      return t.add({
        name: file.name,
        category,
        status: "uploaded",
        storage_path: null,
        uploaded_at: new Date().toISOString(),
        plan_id: extra.plan_id || planId || null,
        step_key: extra.step_key || null,
      });
    }
    const safe = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${user.id}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file, { upsert: false });
    if (upErr) throw upErr;
    return t.add({
      name: file.name,
      category,
      status: "uploaded",
      storage_path: path,
      uploaded_at: new Date().toISOString(),
      plan_id: extra.plan_id || planId || null,
      step_key: extra.step_key || null,
    });
  };

  const removeDocument = async (doc) => {
    if (doc.storage_path && !isDemo) await supabase.storage.from("documents").remove([doc.storage_path]);
    return t.remove(doc.id);
  };

  return { documents, loading: t.loading, error: t.error, uploadDocument, removeDocument, refresh: t.refresh };
}
