import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  DollarSign,
  Edit3,
  FileText,
  Home,
  Info,
  LockKeyhole,
  MessageCircle,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { C, FB, PEOPLE, PhotoAvatar, R, WA, buildWhatsAppUrl } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang, interp } from "../../i18n/LanguageContext.jsx";
import {
  useAssets,
  useCoApplicants,
  useDocuments,
  useEmployment,
  usePlan,
  usePlanMortgageDetails,
  usePlanOffers,
  usePlanSteps,
  useProfile,
  useProperties,
  useResidences,
  useAdditionalIncome,
} from "../data/hooks.js";
import {
  appGhostBtn,
  appPrimaryBtn,
  appSubtleBtn,
  EmptyState,
  fmtDate,
  fmtMoney,
  IconBubble,
  PanelCard,
  Spinner,
  StatusBadge,
} from "../components/ui.jsx";
import EntryModal from "../components/EntryModal.jsx";
import {
  canCompleteStep,
  completionPayload,
  isStepLocked,
  nextOpenStepKey,
  orderedSteps,
  PLAN_STATUSES,
  PLAN_STEPS,
} from "../planWorkflow.js";

const STEP_ICON = {
  profile: <UserCircle size={28} />,
  property_mortgage: <LockKeyhole size={28} />,
  review_offer: <DollarSign size={28} />,
  mortgage_application: <ClipboardList size={28} />,
  compliance_documents: <FileText size={28} />,
  commitment_letter: <ShieldCheck size={28} />,
  ready_to_fund: <Wallet size={28} />,
};

const inputStyle = {
  width: "100%",
  padding: "11px 13px",
  fontFamily: FB,
  fontSize: 14,
  color: A.text,
  background: A.card2,
  border: `1px solid ${A.border}`,
  borderRadius: R.control,
  outline: "none",
};

function numOrNull(value) {
  return value === "" || value === null || value === undefined ? null : Number(value);
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block", minWidth: 0 }}>
      <span style={{ display: "block", fontFamily: FB, fontSize: 12.5, fontWeight: 700, color: A.text, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

function MiniRow({ label, value, tone }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
      <span style={{ fontFamily: FB, fontSize: 12.5, fontWeight: 700, color: A.muted }}>{label}</span>
      <span style={{ fontFamily: FB, fontSize: 14, fontWeight: 700, color: tone === "danger" ? A.danger : A.text, textAlign: "right" }}>{value || "N/A"}</span>
    </div>
  );
}

function Callout({ children, tone = "accent", action }) {
  const styles = {
    accent: { bg: A.accentFaint, fg: A.accent, border: A.border },
    amber: { bg: A.amberFaint, fg: A.amber, border: "rgba(183,121,31,.25)" },
    green: { bg: A.greenFaint, fg: A.green, border: "rgba(10,135,84,.2)" },
  };
  const c = styles[tone] || styles.accent;
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      padding: "13px 16px", borderRadius: R.control, background: c.bg, border: `1px solid ${c.border}`,
      color: A.body, fontFamily: FB, fontSize: 14, lineHeight: 1.5,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <Info size={17} color={c.fg} style={{ marginTop: 2, flexShrink: 0 }} />
        <div>{children}</div>
      </div>
      {action}
    </div>
  );
}

function CompletionBar({ step, locked, canComplete, error, labels, onComplete }) {
  if (step.status === "complete") {
    return (
      <Callout tone="green">
        <strong>{labels.complete}</strong>
      </Callout>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {error && (
        <Callout tone="amber">
          <strong>{error}</strong>
        </Callout>
      )}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap",
        padding: "14px 16px", borderRadius: R.control, background: A.amberFaint, border: `1px solid rgba(183,121,31,.22)`,
      }}>
        <div style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.5 }}>{locked ? labels.lockedHelp : labels.completeHelp}</div>
        <button
          type="button"
          disabled={locked || !canComplete}
          onClick={onComplete}
          style={appPrimaryBtn({ padding: "10px 18px", opacity: locked || !canComplete ? 0.48 : 1 })}
        >
          <CheckCircle2 size={16} /> {labels.markComplete}
        </button>
      </div>
    </div>
  );
}

function SupportCard() {
  const { t, lang } = useLang();
  const d = t.app.dashboard;
  const { profile } = useProfile();
  const name = profile?.first_name || "";
  return (
    <div style={{
      borderRadius: R.card, padding: "22px", color: "#fff",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyM} 100%)`,
      boxShadow: A.shadow,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 48 }}>
        <span style={{ fontFamily: FB, fontSize: 26, fontWeight: 800 }}>K</span>
        <span style={{ display: "inline-flex" }}>
          <PhotoAvatar src={PEOPLE.jack.src} pos={PEOPLE.jack.pos} alt={PEOPLE.jack.alt} size={36} initials={PEOPLE.jack.initials} frame />
          <span style={{ marginLeft: -12, display: "inline-flex" }}>
            <PhotoAvatar src={PEOPLE.tara.src} pos={PEOPLE.tara.pos} alt={PEOPLE.tara.alt} size={36} initials={PEOPLE.tara.initials} frame />
          </span>
        </span>
      </div>
      <div style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.72)", marginBottom: 2 }}>
        {name ? interp(d.help.greeting, { name }) : d.help.greetingNoName}
      </div>
      <div style={{ fontFamily: FB, fontSize: 21, fontWeight: 800, marginBottom: 16 }}>{d.help.title}</div>
      <a href={buildWhatsAppUrl({ lang })} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          background: "#fff", color: C.navy, borderRadius: R.control, padding: "12px 14px",
        }}>
          <div>
            <div style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 700 }}>{d.help.ask}</div>
            <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(10,37,64,0.65)" }}>{d.help.askSub}</div>
          </div>
          <span style={{ width: 36, height: 36, borderRadius: "50%", background: C.navy, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MessageCircle size={18} color="#fff" />
          </span>
        </div>
      </a>
    </div>
  );
}

function PlanSummary({ plan, labels, onEdit, onActivate, onCancel }) {
  const typeLabel = labels.types[plan.type] || plan.type;
  const statusLabel = labels.statuses[plan.status] || plan.status;
  return (
    <PanelCard padding="0" style={{ overflow: "hidden" }}>
      <div style={{ padding: "20px 20px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: FB, fontSize: 21, fontWeight: 800, color: A.text, margin: "0 0 3px" }}>{labels.summaryTitle}</h2>
          <div style={{ fontFamily: FB, fontSize: 12, fontWeight: 800, letterSpacing: ".05em", color: A.muted, textTransform: "uppercase" }}>{typeLabel}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={onEdit} aria-label={labels.editPlan} style={appGhostBtn({ padding: 0, width: 36, height: 36, borderRadius: "50%" })}>
            <Edit3 size={15} />
          </button>
          <button type="button" onClick={onCancel} aria-label={labels.cancelPlan} style={appGhostBtn({ padding: 0, width: 36, height: 36, borderRadius: "50%", color: A.danger })}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
        <MiniRow label={labels.planName} value={plan.name || labels.unnamedPlan} />
        <MiniRow label={labels.planStatus} value={statusLabel} />
        <MiniRow label={labels.outstandingLoan} value={fmtMoney(plan.outstanding_loan)} />
      </div>
      {plan.status === "new" && (
        <div style={{ padding: "16px 20px 20px", borderTop: `1px solid ${A.borderL}`, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: FB, fontSize: 12.5, fontWeight: 800, color: A.muted, textTransform: "uppercase" }}>{labels.nextSteps}</div>
          <Callout>
            {labels.inactiveAlert}
          </Callout>
          <button type="button" onClick={onActivate} style={appPrimaryBtn({ padding: "11px 18px", width: "100%" })}>
            {labels.activate}
          </button>
        </div>
      )}
    </PanelCard>
  );
}

function CoApplicantsCard({ coApplicants, labels, onAdd, onRemove, onInvite }) {
  return (
    <PanelCard style={{ textAlign: "center" }}>
      <IconBubble icon={<Home size={22} />} size={54} tone="plain" />
      <h2 style={{ fontFamily: FB, fontSize: 22, fontWeight: 800, color: A.text, margin: "16px 0 8px" }}>{labels.coApplicantsTitle}</h2>
      <p style={{ fontFamily: FB, fontSize: 14, color: A.body, lineHeight: 1.55, margin: "0 0 18px" }}>{labels.coApplicantsBody}</p>
      {coApplicants.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, textAlign: "left" }}>
          {coApplicants.map((person) => (
            <div key={person.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: R.control, border: `1px solid ${A.border}`, background: A.card2 }}>
              <IconBubble icon={<Users size={16} />} size={34} tone="green" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 800, color: A.text }}>{[person.first_name, person.last_name].filter(Boolean).join(" ")}</div>
                <div style={{ fontFamily: FB, fontSize: 12, color: A.muted }}>{labels.coApplicantStatuses[person.status] || person.status}</div>
              </div>
              {person.status === "draft" && (
                <button type="button" onClick={() => onInvite(person)} style={appSubtleBtn({ padding: "7px 10px", fontSize: 12 })}>{labels.invite}</button>
              )}
              <button type="button" onClick={() => onRemove(person.id)} aria-label={labels.remove} style={appGhostBtn({ padding: 0, width: 30, height: 30, color: A.muted })}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={onAdd} style={appPrimaryBtn({ padding: "11px 18px" })}>
        <Plus size={16} /> {labels.addCoApplicant}
      </button>
    </PanelCard>
  );
}

function ProfileContent({ labels, profile, residences, employment, income, assets, step, locked, canComplete, error, onComplete }) {
  const rows = [
    { label: labels.personalDetails, value: [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || labels.missing },
    { label: labels.residenceHistory, value: interp(labels.itemsCount, { n: residences.length }) },
    { label: labels.employmentHistory, value: interp(labels.itemsCount, { n: employment.length }) },
    { label: labels.additionalIncome, value: interp(labels.itemsCount, { n: income.length }) },
    { label: labels.assets, value: interp(labels.itemsCount, { n: assets.length }) },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Callout tone="green">{labels.profileIntro}</Callout>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ padding: "13px 14px", borderRadius: R.control, border: `1px solid ${A.border}`, background: A.card2 }}>
            <div style={{ fontFamily: FB, fontSize: 12, fontWeight: 800, color: A.muted, marginBottom: 4 }}>{row.label}</div>
            <div style={{ fontFamily: FB, fontSize: 14, fontWeight: 800, color: A.text }}>{row.value}</div>
          </div>
        ))}
      </div>
      <Link to="/app/profile" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
        <button type="button" style={appGhostBtn({ padding: "10px 16px" })}>{labels.openProfile}</button>
      </Link>
      <CompletionBar step={step} locked={locked} canComplete={canComplete} error={error} labels={labels} onComplete={onComplete} />
    </div>
  );
}

function MortgageDetailsContent({ labels, plan, properties, details, saveDetails, step, locked, canComplete, error, onComplete }) {
  const [values, setValues] = useState({
    property_id: "",
    target_property_address: "",
    target_city: "",
    target_province: "",
    target_postal_code: "",
    purchase_price: "",
    down_payment: "",
    requested_amount: "",
    closing_date: "",
    notes: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValues({
      property_id: details?.property_id || "",
      target_property_address: details?.target_property_address || "",
      target_city: details?.target_city || "",
      target_province: details?.target_province || "",
      target_postal_code: details?.target_postal_code || "",
      purchase_price: details?.purchase_price || "",
      down_payment: details?.down_payment || "",
      requested_amount: details?.requested_amount || "",
      closing_date: details?.closing_date || "",
      notes: details?.notes || "",
    });
  }, [details?.id]);

  const set = (key, value) => {
    setSaved(false);
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await saveDetails(values);
    setSaved(true);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Callout>{labels.propertyIntro}</Callout>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="kb-plan-form-grid">
        <Field label={labels.property}>
          <select style={inputStyle} value={values.property_id} onChange={(e) => set("property_id", e.target.value)}>
            <option value="">{labels.noLinkedProperty}</option>
            {properties.map((property) => <option key={property.id} value={property.id}>{property.address}</option>)}
          </select>
        </Field>
        <Field label={labels.address}>
          <input style={inputStyle} value={values.target_property_address} onChange={(e) => set("target_property_address", e.target.value)} />
        </Field>
        <Field label={labels.city}>
          <input style={inputStyle} value={values.target_city} onChange={(e) => set("target_city", e.target.value)} />
        </Field>
        <Field label={labels.province}>
          <input style={inputStyle} value={values.target_province} onChange={(e) => set("target_province", e.target.value)} />
        </Field>
        <Field label={labels.postalCode}>
          <input style={inputStyle} value={values.target_postal_code} onChange={(e) => set("target_postal_code", e.target.value)} />
        </Field>
        <Field label={plan.type === "purchase" ? labels.purchasePrice : labels.currentValue}>
          <input style={inputStyle} type="number" value={values.purchase_price} onChange={(e) => set("purchase_price", e.target.value)} />
        </Field>
        <Field label={labels.downPayment}>
          <input style={inputStyle} type="number" value={values.down_payment} onChange={(e) => set("down_payment", e.target.value)} />
        </Field>
        <Field label={labels.requestedAmount}>
          <input style={inputStyle} type="number" value={values.requested_amount} onChange={(e) => set("requested_amount", e.target.value)} />
        </Field>
        <Field label={labels.closingDate}>
          <input style={inputStyle} type="date" value={values.closing_date} onChange={(e) => set("closing_date", e.target.value)} />
        </Field>
      </div>
      <Field label={labels.notes}>
        <textarea style={{ ...inputStyle, minHeight: 86, resize: "vertical" }} value={values.notes} onChange={(e) => set("notes", e.target.value)} />
      </Field>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" style={appPrimaryBtn({ padding: "10px 18px" })}>{labels.saveDetails}</button>
        {saved && <span style={{ fontFamily: FB, fontSize: 13, color: A.green, fontWeight: 800 }}>{labels.saved}</span>}
      </div>
      <CompletionBar step={step} locked={locked} canComplete={canComplete} error={error} labels={labels} onComplete={onComplete} />
    </form>
  );
}

function OffersContent({ labels, offers, onAdd, onSelect, onRemove, step, locked, canComplete, error, onComplete }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Callout>{labels.offerIntro}</Callout>
      {offers.length === 0 ? (
        <EmptyState icon={<DollarSign size={24} />} title={labels.noOffers} lines={[labels.noOffersLine]} action={<button type="button" onClick={onAdd} style={appPrimaryBtn()}><Plus size={16} /> {labels.addOffer}</button>} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          {offers.map((offer) => (
            <div key={offer.id} style={{ border: `1px solid ${offer.status === "selected" ? A.green : A.border}`, background: offer.status === "selected" ? A.greenFaint : A.card2, borderRadius: R.card, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                <div style={{ fontFamily: FB, fontSize: 16, fontWeight: 800, color: A.text }}>{offer.lender_name}</div>
                {offer.status === "selected" && <StatusBadge tone="green">{labels.selected}</StatusBadge>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                <MiniRow label={labels.rate} value={offer.rate_percent ? `${offer.rate_percent}%` : null} />
                <MiniRow label={labels.term} value={offer.term_months ? `${offer.term_months} mo` : null} />
                <MiniRow label={labels.payment} value={fmtMoney(offer.payment_monthly)} />
                <MiniRow label={labels.loanAmount} value={fmtMoney(offer.loan_amount)} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => onSelect(offer.id)} style={appPrimaryBtn({ padding: "9px 12px", flex: 1 })}>{labels.selectOffer}</button>
                <button type="button" onClick={() => onRemove(offer.id)} style={appGhostBtn({ padding: 0, width: 38, color: A.muted })}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {offers.length > 0 && <button type="button" onClick={onAdd} style={appGhostBtn({ padding: "10px 16px", alignSelf: "flex-start" })}><Plus size={16} /> {labels.addOffer}</button>}
      <CompletionBar step={step} locked={locked} canComplete={canComplete} error={error} labels={labels} onComplete={onComplete} />
    </div>
  );
}

function ConfirmationContent({ labels, step, locked, canComplete, error, onConfirm, onComplete }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Callout>{labels.body}</Callout>
      <button type="button" onClick={onConfirm} disabled={locked} style={appPrimaryBtn({ padding: "10px 18px", alignSelf: "flex-start", opacity: locked ? 0.5 : 1 })}>
        <CheckCircle2 size={16} /> {labels.confirm}
      </button>
      <CompletionBar step={step} locked={locked} canComplete={canComplete} error={error} labels={labels} onComplete={onComplete} />
    </div>
  );
}

function DocumentContent({ labels, step, locked, canComplete, error, documents, onUpload, onConfirm, onComplete }) {
  const ref = useRef(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Callout>{labels.body}</Callout>
      <input
        ref={ref}
        type="file"
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) await onUpload(file);
        }}
      />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="button" onClick={() => ref.current?.click()} disabled={locked} style={appPrimaryBtn({ padding: "10px 18px", opacity: locked ? 0.5 : 1 })}>
          <Upload size={16} /> {labels.upload}
        </button>
        <button type="button" onClick={onConfirm} disabled={locked} style={appGhostBtn({ padding: "10px 18px", opacity: locked ? 0.5 : 1 })}>
          <CheckCircle2 size={16} /> {labels.confirm}
        </button>
      </div>
      {documents.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {documents.map((doc) => (
            <div key={doc.id} style={{ padding: "10px 12px", borderRadius: R.control, border: `1px solid ${A.border}`, background: A.card2, fontFamily: FB, fontSize: 13.5, color: A.text }}>
              {doc.name} <span style={{ color: A.muted }}>- {fmtDate(doc.uploaded_at || doc.created_at)}</span>
            </div>
          ))}
        </div>
      )}
      <CompletionBar step={step} locked={locked} canComplete={canComplete} error={error} labels={labels} onComplete={onComplete} />
    </div>
  );
}

function StepCard({ step, steps, open, labels, onToggle, children }) {
  const locked = isStepLocked(step, steps);
  const complete = step.status === "complete";
  const statusLabel = complete ? labels.complete : locked ? labels.locked : labels.pending;
  return (
    <div className="kb-plan-step-wrap">
      <span className={`kb-plan-node ${complete ? "is-complete" : ""}`} />
      <PanelCard padding="0" style={{ overflow: "hidden", borderColor: open ? A.amber : A.border }}>
        <button type="button" onClick={onToggle} style={{
          width: "100%", border: "none", background: A.card, padding: "16px 18px", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 14, cursor: "pointer", textAlign: "left",
          borderLeft: `3px solid ${complete ? A.green : A.amber}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
            <span style={{ color: complete ? A.green : locked ? A.muted : A.text, display: "inline-flex", flexShrink: 0 }}>
              {locked ? <LockKeyhole size={28} /> : STEP_ICON[step.key] || <ClipboardList size={28} />}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: FB, fontSize: 17, fontWeight: 800, color: A.text }}>{labels.steps[step.key]?.title || step.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontFamily: FB, fontSize: 12.5, color: A.muted, marginTop: 3 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <AlertCircle size={13} color={complete ? A.green : locked ? A.muted : A.amber} /> {statusLabel}
                </span>
                {step.estimated_minutes && <span>{interp(labels.estimatedTime, { n: step.estimated_minutes })}</span>}
              </div>
            </div>
          </div>
          <ChevronDown size={20} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .15s", color: A.body }} />
        </button>
        {open && (
          <div style={{ padding: "18px 20px 20px", borderTop: `1px solid ${A.borderL}` }}>
            {children}
          </div>
        )}
      </PanelCard>
    </div>
  );
}

export default function PlanDetail() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const labels = t.app.planDetail;
  const dashboardLabels = t.app.dashboard;

  const { plan, loading: planLoading, updatePlan, activatePlan, cancelPlan } = usePlan(planId);
  const stepsHook = usePlanSteps(planId);
  const { profile, loading: profileLoading } = useProfile();
  const residences = useResidences();
  const employment = useEmployment();
  const income = useAdditionalIncome();
  const assets = useAssets();
  const properties = useProperties();
  const mortgage = usePlanMortgageDetails(planId);
  const offers = usePlanOffers(planId);
  const coApplicants = useCoApplicants(planId);
  const documents = useDocuments(planId);

  const [openKey, setOpenKey] = useState(null);
  const [modal, setModal] = useState(null);
  const [stepErrors, setStepErrors] = useState({});

  useEffect(() => {
    if (plan && !stepsHook.loading && stepsHook.steps.length === 0) stepsHook.ensureSteps();
  }, [plan?.id, stepsHook.loading, stepsHook.steps.length]);

  const steps = useMemo(() => {
    const rows = stepsHook.steps.length ? stepsHook.steps : PLAN_STEPS.map((step, index) => ({ ...step, position: index + 1, status: "pending", metadata: {} }));
    return orderedSteps(rows);
  }, [stepsHook.steps]);

  useEffect(() => {
    if (!openKey && steps.length) setOpenKey(nextOpenStepKey(steps));
  }, [openKey, steps]);

  const completionContext = (step) => ({
    profile,
    residences: residences.rows,
    employment: employment.rows,
    assets: assets.rows,
    mortgageDetails: mortgage.details,
    offers: offers.offers,
    documents: documents.documents,
    step,
    plan,
  });

  const markComplete = async (step, override = {}) => {
    if (!step?.id) return;
    const locked = isStepLocked(step, steps);
    const mergedStep = { ...step, ...override, metadata: { ...(step.metadata || {}), ...(override.metadata || {}) } };
    if (locked) {
      setStepErrors((current) => ({ ...current, [step.key]: labels.lockedMessage }));
      return;
    }
    if (!canCompleteStep(step.key, { ...completionContext(mergedStep), step: mergedStep })) {
      setStepErrors((current) => ({ ...current, [step.key]: labels.validationMessage }));
      return;
    }
    setStepErrors((current) => ({ ...current, [step.key]: "" }));
    await stepsHook.updateStep(step.id, { ...override, ...completionPayload(), metadata: mergedStep.metadata });
  };

  const patchStepMetadata = async (step, patch, complete = false) => {
    const metadata = { ...(step.metadata || {}), ...patch };
    if (complete) return markComplete(step, { metadata });
    return stepsHook.updateStep(step.id, { metadata });
  };

  if (planLoading || profileLoading) {
    return <div style={{ padding: "70px 0", display: "flex", justifyContent: "center" }}><Spinner /></div>;
  }

  if (!plan) {
    return (
      <PanelCard>
        <h1 style={{ fontFamily: FB, fontSize: 24, color: A.text, margin: "0 0 8px" }}>{labels.notFoundTitle}</h1>
        <p style={{ fontFamily: FB, fontSize: 14, color: A.body, margin: "0 0 18px" }}>{labels.notFoundBody}</p>
        <Link to="/app" style={{ textDecoration: "none" }}><button style={appPrimaryBtn()}><ArrowLeft size={16} /> {labels.backToDashboard}</button></Link>
      </PanelCard>
    );
  }

  const editPlanFields = [
    { key: "name", label: labels.planName, type: "text" },
    { key: "type", label: labels.planType, type: "select", options: Object.entries(labels.types).map(([value, label]) => ({ value, label })) },
    { key: "status", label: labels.planStatus, type: "select", options: PLAN_STATUSES.map((value) => ({ value, label: labels.statuses[value] || value })) },
    { key: "outstanding_loan", label: labels.outstandingLoan, type: "number" },
  ];

  const offerFields = [
    { key: "lender_name", label: labels.lenderName, type: "text", required: true },
    { key: "rate_percent", label: labels.rate, type: "number", half: true },
    { key: "term_months", label: labels.termMonths, type: "number", half: true },
    { key: "amortization_years", label: labels.amortizationYears, type: "number", half: true },
    { key: "payment_monthly", label: labels.payment, type: "number", half: true },
    { key: "loan_amount", label: labels.loanAmount, type: "number", half: true },
    { key: "offer_type", label: labels.offerType, type: "select", half: true, options: labels.offerTypes },
  ];

  const coApplicantFields = [
    { key: "first_name", label: labels.firstName, type: "text", required: true, half: true },
    { key: "last_name", label: labels.lastName, type: "text", half: true },
    { key: "email", label: labels.email, type: "text", half: true },
    { key: "phone", label: labels.phone, type: "text", half: true },
    { key: "relationship", label: labels.relationship, type: "text", half: true },
    { key: "status", label: labels.inviteStatus, type: "select", half: true, options: labels.coApplicantStatusOptions },
    { key: "is_title_holder", label: labels.titleHolder, type: "checkbox" },
  ];

  const renderStepContent = (step) => {
    const locked = isStepLocked(step, steps);
    const ctx = completionContext(step);
    const canComplete = canCompleteStep(step.key, ctx);
    const common = {
      labels,
      step,
      locked,
      canComplete,
      error: stepErrors[step.key],
      onComplete: () => markComplete(step),
    };
    if (step.key === "profile") {
      return (
        <ProfileContent
          {...common}
          profile={profile}
          residences={residences.rows}
          employment={employment.rows}
          income={income.rows}
          assets={assets.rows}
        />
      );
    }
    if (step.key === "property_mortgage") {
      return (
        <MortgageDetailsContent
          {...common}
          plan={plan}
          properties={properties.properties}
          details={mortgage.details}
          saveDetails={mortgage.saveDetails}
        />
      );
    }
    if (step.key === "review_offer") {
      return (
        <OffersContent
          {...common}
          offers={offers.offers}
          onAdd={() => setModal("offer")}
          onSelect={offers.selectOffer}
          onRemove={offers.removeOffer}
        />
      );
    }
    if (step.key === "mortgage_application") {
      return (
        <ConfirmationContent
          {...common}
          labels={{ ...labels, body: labels.applicationBody, confirm: labels.confirmApplication }}
          onConfirm={() => patchStepMetadata(step, { application_confirmed: true }, true)}
        />
      );
    }
    if (step.key === "compliance_documents" || step.key === "commitment_letter") {
      const stepDocs = documents.documents.filter((doc) => doc.step_key === step.key && doc.status !== "missing");
      return (
        <DocumentContent
          {...common}
          labels={{
            ...labels,
            body: step.key === "compliance_documents" ? labels.complianceBody : labels.commitmentBody,
            upload: step.key === "compliance_documents" ? labels.uploadCompliance : labels.uploadCommitment,
            confirm: labels.confirmDocuments,
          }}
          documents={stepDocs}
          onUpload={(file) => documents.uploadDocument(file, labels.documentCategory, { step_key: step.key })}
          onConfirm={() => patchStepMetadata(step, { documents_confirmed: true }, true)}
        />
      );
    }
    return (
      <ConfirmationContent
        {...common}
        labels={{ ...labels, body: labels.readyBody, confirm: labels.confirmReady }}
        onConfirm={() => patchStepMetadata(step, { funding_confirmed: true }, true)}
      />
    );
  };

  return (
    <div>
      <style>{`
        @media(max-width:1120px){.kb-plan-grid{grid-template-columns:1fr!important}.kb-plan-rail{position:static!important}}
        @media(max-width:720px){.kb-plan-form-grid{grid-template-columns:1fr!important}.kb-plan-activation{grid-template-columns:1fr!important}}
        .kb-plan-timeline{position:relative;display:flex;flex-direction:column;gap:14px;}
        .kb-plan-timeline:before{content:"";position:absolute;left:13px;top:16px;bottom:18px;width:2px;background:${A.border};}
        .kb-plan-step-wrap{position:relative;margin-left:34px;}
        .kb-plan-node{position:absolute;left:-29px;top:23px;width:14px;height:14px;border-radius:50%;background:${A.card};border:3px solid ${A.amber};z-index:1;}
        .kb-plan-node.is-complete{border-color:${A.green};background:${A.green};}
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, fontFamily: FB, fontSize: 14 }}>
        <Link to="/app" style={{ color: A.accent, fontWeight: 700 }}>{dashboardLabels.crumb}</Link>
        <span style={{ color: A.muted }}>/</span>
        <span style={{ color: A.body }}>{plan.id.slice(0, 8)}</span>
      </div>

      {plan.status === "new" && (
        <div className="kb-plan-activation" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center", padding: "13px 16px", marginBottom: 18, borderRadius: R.control, background: A.accentFaint, border: `1px solid ${A.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FB, fontSize: 14.5, color: A.body, lineHeight: 1.45 }}>
            <Info size={18} color={A.accent} style={{ flexShrink: 0 }} />
            <span>{interp(labels.activationBanner, { name: profile?.first_name || labels.friend })}</span>
          </div>
          <button type="button" onClick={activatePlan} style={appPrimaryBtn({ padding: "11px 38px" })}>{labels.activate}</button>
        </div>
      )}

      <div className="kb-plan-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(300px,360px)", gap: 24, alignItems: "start" }}>
        <div className="kb-plan-timeline">
          {steps.map((step) => (
            <StepCard
              key={step.key}
              step={step}
              steps={steps}
              labels={labels}
              open={openKey === step.key}
              onToggle={() => setOpenKey(openKey === step.key ? null : step.key)}
            >
              {renderStepContent(step)}
            </StepCard>
          ))}
        </div>

        <aside className="kb-plan-rail" style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <PlanSummary
            plan={plan}
            labels={{ ...labels, types: dashboardLabels.types, statuses: dashboardLabels.statuses || labels.statuses, unnamedPlan: dashboardLabels.unnamedPlan }}
            onEdit={() => setModal("plan")}
            onActivate={activatePlan}
            onCancel={async () => {
              await cancelPlan();
              navigate("/app");
            }}
          />
          <CoApplicantsCard
            coApplicants={coApplicants.coApplicants}
            labels={labels}
            onAdd={() => setModal("coApplicant")}
            onRemove={coApplicants.removeCoApplicant}
            onInvite={(person) => coApplicants.updateCoApplicant(person.id, { status: "invited", invited_at: new Date().toISOString() })}
          />
          <SupportCard />
        </aside>
      </div>

      {modal === "plan" && (
        <EntryModal
          title={labels.editPlan}
          fields={editPlanFields}
          initial={{ name: plan.name || "", type: plan.type, status: plan.status, outstanding_loan: plan.outstanding_loan || "" }}
          submitLabel={t.app.common.save}
          cancelLabel={t.app.common.cancel}
          onSubmit={(values) => updatePlan({ ...values, outstanding_loan: numOrNull(values.outstanding_loan) })}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "offer" && (
        <EntryModal
          title={labels.addOffer}
          fields={offerFields}
          submitLabel={t.app.common.save}
          cancelLabel={t.app.common.cancel}
          onSubmit={offers.addOffer}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "coApplicant" && (
        <EntryModal
          title={labels.addCoApplicant}
          fields={coApplicantFields}
          initial={{ status: "draft", is_title_holder: true }}
          submitLabel={t.app.common.save}
          cancelLabel={t.app.common.cancel}
          onSubmit={coApplicants.addCoApplicant}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
