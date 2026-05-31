import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, Briefcase, Clock, Mail, Wallet, Building2, Pencil, Plus, Trash2,
} from "lucide-react";
import { FB, R } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { useAuth } from "../AuthContext.jsx";
import {
  useProfile, useResidences, useEmployment, useAdditionalIncome, useAssets,
} from "../data/hooks.js";
import {
  PageHeading, PanelCard, SectionBlock, IconBubble, Spinner, fmtMoney, fmtDate,
  appPrimaryBtn, appGhostBtn,
} from "../components/ui.jsx";
import EntryModal from "../components/EntryModal.jsx";

const labelOf = (options, value) => options.find((o) => o.value === value)?.label || value || null;

// ── Right-rail identity card ──────────────────────────────────────────
function ProfileCard({ profile, onEdit }) {
  const { t } = useLang();
  const pr = t.app.profile;
  const { user } = useAuth();
  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || pr.noName;

  const rows = [
    { label: pr.fields.email, value: profile?.email || user?.email },
    { label: pr.fields.phone, value: profile?.phone },
    { label: pr.fields.date_of_birth, value: profile?.date_of_birth ? fmtDate(profile.date_of_birth) : null },
    { label: pr.fields.marital_status, value: labelOf(pr.maritalOptions, profile?.marital_status) },
    { label: pr.fields.residency_status, value: labelOf(pr.residencyOptions, profile?.residency_status) },
    { label: pr.fields.first_time_home_buyer, value: profile?.first_time_home_buyer ? pr.yes : pr.no },
  ];

  return (
    <PanelCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: FB, fontSize: 20, fontWeight: 700, color: A.text, margin: 0 }}>{name}</h3>
        <button onClick={onEdit} aria-label={pr.edit}
          style={{ ...appPrimaryBtn({ padding: 0, width: 34, height: 34, borderRadius: "50%" }) }}>
          <Pencil size={15} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: A.muted }}>{r.label}</div>
            <div style={{ fontFamily: FB, fontSize: 14.5, fontWeight: 600, marginTop: 3, color: r.value ? A.text : A.danger }}>
              {r.value || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

// ── Generic entry row ─────────────────────────────────────────────────
function EntryRow({ title, meta, onRemove }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      background: A.card2, border: `1px solid ${A.border}`, borderRadius: R.control, padding: "12px 14px",
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: FB, fontSize: 14.5, fontWeight: 700, color: A.text }}>{title}</div>
        {meta && <div style={{ fontFamily: FB, fontSize: 12.5, color: A.muted, marginTop: 2 }}>{meta}</div>}
      </div>
      <button onClick={onRemove} aria-label="Remove"
        style={{ ...appGhostBtn({ padding: 0, width: 32, height: 32, borderRadius: R.control }), color: A.muted, flexShrink: 0 }}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={appPrimaryBtn({ padding: "10px 18px" })}><Plus size={15} /> {label}</button>
  );
}

function TwoUp({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="kb-prof-2up">
      <style>{`@media(max-width:560px){.kb-prof-2up{grid-template-columns:1fr!important}}`}</style>
      {children}
    </div>
  );
}

function MiniCard({ icon, title, body, action }) {
  return (
    <div style={{ background: A.card2, border: `1px solid ${A.border}`, borderRadius: R.card, padding: "18px 18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: A.text, fontFamily: FB, fontWeight: 700, fontSize: 15 }}>
        {icon} {title}
      </div>
      <p style={{ fontFamily: FB, fontSize: 13, color: A.body, lineHeight: 1.5, margin: "0 0 14px" }}>{body}</p>
      {action}
    </div>
  );
}

export default function Profile() {
  const { t } = useLang();
  const pr = t.app.profile;
  const { profile, loading, updateProfile } = useProfile();
  const residences = useResidences();
  const employment = useEmployment();
  const income = useAdditionalIncome();
  const assets = useAssets();
  const [modal, setModal] = useState(null);

  const num = (v) => (v === "" || v == null ? null : Number(v));

  // Modal configs keyed by `kind`.
  const configs = {
    profile: {
      title: pr.editTitle,
      initial: {
        first_name: profile?.first_name || "", last_name: profile?.last_name || "",
        phone: profile?.phone || "", date_of_birth: profile?.date_of_birth || "",
        marital_status: profile?.marital_status || "", residency_status: profile?.residency_status || "",
        first_time_home_buyer: !!profile?.first_time_home_buyer,
      },
      fields: [
        { key: "first_name", label: pr.fields.first_name, type: "text", half: true },
        { key: "last_name", label: pr.fields.last_name, type: "text", half: true },
        { key: "phone", label: pr.fields.phone, type: "text", half: true },
        { key: "date_of_birth", label: pr.fields.date_of_birth, type: "date", half: true },
        { key: "marital_status", label: pr.fields.marital_status, type: "select", half: true, options: pr.maritalOptions },
        { key: "residency_status", label: pr.fields.residency_status, type: "select", half: true, options: pr.residencyOptions },
        { key: "first_time_home_buyer", label: pr.fields.first_time_home_buyer, type: "checkbox" },
      ],
      submit: (v) => updateProfile(v),
    },
    residence: {
      title: pr.residence.add,
      fields: [
        { key: "address", label: pr.residence.address, type: "text", required: true },
        { key: "status", label: pr.residence.status, type: "select", half: true, options: pr.residence.statusOptions },
        { key: "is_current", label: pr.residence.current, type: "checkbox", half: true },
        { key: "move_in", label: pr.residence.moveIn, type: "date", half: true },
        { key: "move_out", label: pr.residence.moveOut, type: "date", half: true },
      ],
      submit: (v) => residences.add(v),
    },
    employment: {
      title: pr.employment.add,
      initial: { type: "full_time" },
      fields: [
        { key: "type", label: pr.employment.type, type: "select", required: true, options: pr.employment.typeOptions },
        { key: "employer", label: pr.employment.employer, type: "text", half: true },
        { key: "job_title", label: pr.employment.jobTitle, type: "text", half: true },
        { key: "income_annual", label: pr.employment.income, type: "number", half: true },
        { key: "is_current", label: pr.employment.current, type: "checkbox", half: true },
        { key: "start_date", label: pr.employment.start, type: "date", half: true },
        { key: "end_date", label: pr.employment.end, type: "date", half: true },
      ],
      submit: (v) => employment.add({ ...v, income_annual: num(v.income_annual) }),
    },
    retirement: {
      title: pr.employment.addGap,
      initial: { type: "retired" },
      fields: [
        { key: "type", label: pr.employment.type, type: "select", required: true, options: pr.employment.gapOptions },
        { key: "income_annual", label: pr.employment.income, type: "number", half: true },
        { key: "is_current", label: pr.employment.current, type: "checkbox", half: true },
        { key: "start_date", label: pr.employment.start, type: "date", half: true },
        { key: "end_date", label: pr.employment.end, type: "date", half: true },
      ],
      submit: (v) => employment.add({ ...v, income_annual: num(v.income_annual) }),
    },
    income: {
      title: pr.income.add,
      fields: [
        { key: "source", label: pr.income.source, type: "text", required: true },
        { key: "amount_annual", label: pr.income.amount, type: "number" },
      ],
      submit: (v) => income.add({ ...v, amount_annual: num(v.amount_annual) }),
    },
    asset: {
      title: pr.asset.add,
      fields: [
        { key: "type", label: pr.asset.type, type: "select", options: pr.asset.typeOptions },
        { key: "institution", label: pr.asset.institution, type: "text" },
        { key: "value", label: pr.asset.value, type: "number" },
      ],
      submit: (v) => assets.add({ ...v, value: num(v.value) }),
    },
  };

  const cfg = modal ? configs[modal] : null;

  if (loading) {
    return <div style={{ padding: "60px 0", display: "flex", justifyContent: "center" }}><Spinner /></div>;
  }

  const empTypeLabel = (v) => labelOf([...pr.employment.typeOptions, ...pr.employment.gapOptions], v);

  return (
    <div>
      <PageHeading crumb={pr.crumb} title={pr.title} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 24, alignItems: "start" }} className="kb-prof-grid">
        <style>{`@media(max-width:980px){.kb-prof-grid{grid-template-columns:1fr!important}.kb-prof-card{order:-1}}`}</style>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Residential history */}
          <SectionBlock icon={<Home size={24} />} title={pr.residence.title} description={pr.residence.desc}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: residences.rows.length ? 16 : 0 }}>
              {residences.rows.map((r) => (
                <EntryRow key={r.id} title={r.address}
                  meta={[labelOf(pr.residence.statusOptions, r.status), `${fmtDate(r.move_in)} – ${r.is_current ? pr.residence.present : fmtDate(r.move_out)}`].filter(Boolean).join(" · ")}
                  onRemove={() => residences.remove(r.id)} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AddBtn label={pr.residence.add} onClick={() => setModal("residence")} />
            </div>
          </SectionBlock>

          {/* Employment income */}
          <SectionBlock icon={<Briefcase size={24} />} title={pr.employment.title} description={pr.employment.desc}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: employment.rows.length ? 16 : 0 }}>
              {employment.rows.map((r) => (
                <EntryRow key={r.id}
                  title={[r.job_title, r.employer].filter(Boolean).join(" · ") || empTypeLabel(r.type)}
                  meta={[empTypeLabel(r.type), r.income_annual ? fmtMoney(r.income_annual) + pr.employment.perYear : null].filter(Boolean).join(" · ")}
                  onRemove={() => employment.remove(r.id)} />
              ))}
            </div>
            <TwoUp>
              <MiniCard icon={<Briefcase size={16} />} title={pr.employment.empCardTitle} body={pr.employment.empCardBody}
                action={<AddBtn label={pr.employment.add} onClick={() => setModal("employment")} />} />
              <MiniCard icon={<Clock size={16} />} title={pr.employment.gapCardTitle} body={pr.employment.gapCardBody}
                action={<AddBtn label={pr.employment.addGap} onClick={() => setModal("retirement")} />} />
            </TwoUp>
          </SectionBlock>

          {/* Additional income */}
          <SectionBlock icon={<Mail size={24} />} title={pr.income.title} description={pr.income.desc}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: income.rows.length ? 16 : 0 }}>
              {income.rows.map((r) => (
                <EntryRow key={r.id} title={r.source}
                  meta={r.amount_annual ? fmtMoney(r.amount_annual) + pr.employment.perYear : null}
                  onRemove={() => income.remove(r.id)} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AddBtn label={pr.income.add} onClick={() => setModal("income")} />
            </div>
          </SectionBlock>

          {/* Assets */}
          <SectionBlock icon={<Wallet size={24} />} title={pr.asset.title} description={pr.asset.desc}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: assets.rows.length ? 16 : 0 }}>
              {assets.rows.map((r) => (
                <EntryRow key={r.id}
                  title={labelOf(pr.asset.typeOptions, r.type) || pr.asset.title}
                  meta={[r.institution, fmtMoney(r.value)].filter(Boolean).join(" · ")}
                  onRemove={() => assets.remove(r.id)} />
              ))}
            </div>
            <TwoUp>
              <MiniCard icon={<Wallet size={16} />} title={pr.asset.assetCardTitle} body={pr.asset.assetCardBody}
                action={<AddBtn label={pr.asset.add} onClick={() => setModal("asset")} />} />
              <MiniCard icon={<Building2 size={16} />} title={pr.asset.propCardTitle} body={pr.asset.propCardBody}
                action={<Link to="/app/properties" style={{ textDecoration: "none" }}><AddBtn label={pr.asset.propCardBtn} onClick={() => {}} /></Link>} />
            </TwoUp>
          </SectionBlock>
        </div>

        <aside className="kb-prof-card" style={{ position: "sticky", top: 24 }}>
          <ProfileCard profile={profile} onEdit={() => setModal("profile")} />
        </aside>
      </div>

      {cfg && (
        <EntryModal
          title={cfg.title}
          fields={cfg.fields}
          initial={cfg.initial || {}}
          submitLabel={t.app.common.save}
          cancelLabel={t.app.common.cancel}
          onSubmit={cfg.submit}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
