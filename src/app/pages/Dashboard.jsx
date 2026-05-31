import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home, RefreshCw, PiggyBank, ArrowRight, MessageCircle, Info, Building2, ShieldCheck,
} from "lucide-react";
import { C, FB, R, S, PhotoAvatar, PEOPLE, WA } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang, interp } from "../../i18n/LanguageContext.jsx";
import { usePlans, useProfile } from "../data/hooks.js";
import { PanelCard, IconBubble, StatusBadge, Spinner, appPrimaryBtn } from "../components/ui.jsx";
import { PLAN_STATUS_TONE } from "../planWorkflow.js";

const PLAN_ICON = { purchase: <Home size={20} />, renewal: <RefreshCw size={20} />, refinance: <PiggyBank size={20} /> };

function PlanCard({ plan }) {
  const { t } = useLang();
  const d = t.app.dashboard;
  const statusLabel = d.statuses?.[plan.status] || plan.status || d.statusNew;
  return (
    <PanelCard padding="0" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px", borderBottom: `1px solid ${A.borderL}` }}>
        <IconBubble icon={PLAN_ICON[plan.type] || <Home size={20} />} size={42} />
        <div>
          <div style={{ fontFamily: FB, fontWeight: 700, fontSize: 16, color: A.text }}>{plan.name || d.unnamedPlan}</div>
          <div style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", color: A.muted, textTransform: "uppercase" }}>
            {d.types[plan.type] || plan.type}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: A.body, fontFamily: FB, fontSize: 13.5, fontWeight: 600 }}>
          {d.planStatus}
        </span>
        <StatusBadge tone={PLAN_STATUS_TONE[plan.status] || "accent"}>{statusLabel}</StatusBadge>
      </div>
      {plan.status === "new" && (
        <div style={{ margin: "0 20px 16px", padding: "12px 14px", background: A.accentFaint, borderRadius: R.control, display: "flex", gap: 9, alignItems: "flex-start" }}>
          <Info size={16} color={A.accent} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: FB, fontSize: 13, color: A.body, lineHeight: 1.5 }}>{d.planAlert}</span>
        </div>
      )}
      <div style={{ marginTop: "auto", padding: "0 20px 18px", display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/app/plans/${plan.id}`} style={{ textDecoration: "none" }}>
          <button style={appPrimaryBtn({ padding: "10px 18px" })}>{d.continue} <ArrowRight size={15} /></button>
        </Link>
      </div>
    </PanelCard>
  );
}

function ActionCard({ icon, title, desc, button, onClick, busy }) {
  return (
    <PanelCard style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{ fontFamily: FB, fontSize: 20, fontWeight: 700, color: A.text, margin: 0 }}>{title}</h3>
        <IconBubble icon={icon} size={44} tone="plain" />
      </div>
      <p style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.55, margin: "0 0 18px", flex: 1 }}>{desc}</p>
      <button onClick={onClick} disabled={busy} style={appPrimaryBtn({ width: "100%", padding: "12px 16px", opacity: busy ? 0.7 : 1 })}>
        {busy ? <Spinner size={16} color="#fff" /> : button}
      </button>
    </PanelCard>
  );
}

function HelpCard() {
  const { t } = useLang();
  const d = t.app.dashboard;
  const { profile } = useProfile();
  const name = profile?.first_name || "";
  return (
    <div style={{
      borderRadius: R.panel, padding: "22px 22px 20px", color: "#fff",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyM} 100%)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ display: "inline-flex" }}>
          <PhotoAvatar src={PEOPLE.jack.src} pos={PEOPLE.jack.pos} alt={PEOPLE.jack.alt} size={40} initials={PEOPLE.jack.initials} frame />
          <span style={{ marginLeft: -14, display: "inline-flex" }}>
            <PhotoAvatar src={PEOPLE.tara.src} pos={PEOPLE.tara.pos} alt={PEOPLE.tara.alt} size={40} initials={PEOPLE.tara.initials} frame />
          </span>
        </span>
      </div>
      <div style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>
        {name ? interp(d.help.greeting, { name }) : d.help.greetingNoName}
      </div>
      <div style={{ fontFamily: FB, fontSize: 21, fontWeight: 700, marginBottom: 16 }}>{d.help.title}</div>
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: R.control, padding: "12px 14px",
        }}>
          <div>
            <div style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 600, color: "#fff" }}>{d.help.ask}</div>
            <div style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{d.help.askSub}</div>
          </div>
          <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MessageCircle size={18} color={C.navy} />
          </span>
        </div>
      </a>
    </div>
  );
}

function OwnPropertyCard() {
  const { t } = useLang();
  const d = t.app.dashboard;
  return (
    <PanelCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{ fontFamily: FB, fontSize: 18, fontWeight: 700, color: A.text, margin: 0, maxWidth: 180 }}>{d.ownProperty.title}</h3>
        <IconBubble icon={<Building2 size={20} />} size={42} />
      </div>
      <p style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.55, margin: "0 0 14px" }}>{d.ownProperty.body}</p>
      <ul style={{ listStyle: "disc", paddingLeft: 20, margin: "0 0 18px", color: A.body, fontFamily: FB, fontSize: 13, lineHeight: 1.65 }}>
        {d.ownProperty.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <Link to="/app/properties" style={{ textDecoration: "none" }}>
        <button style={{ ...appPrimaryBtn({ width: "100%", padding: "11px 16px", background: "transparent", color: A.accent, border: `1px solid ${A.accent}` }) }}>
          {d.ownProperty.button}
        </button>
      </Link>
    </PanelCard>
  );
}

export default function Dashboard() {
  const { t } = useLang();
  const d = t.app.dashboard;
  const { plans, loading, createPlan } = usePlans();
  const navigate = useNavigate();
  const [busyType, setBusyType] = useState(null);

  const start = async (type) => {
    setBusyType(type);
    try {
      const plan = await createPlan(type);
      navigate(`/app/plans/${plan.id}`);
    } finally { setBusyType(null); }
  };

  const actions = [
    { type: "purchase", icon: <Home size={22} />, ...d.actions.buy },
    { type: "renewal", icon: <RefreshCw size={22} />, ...d.actions.renew },
    { type: "refinance", icon: <PiggyBank size={22} />, ...d.actions.refinance },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,320px)", gap: 24, alignItems: "start" }} className="kb-dash-grid">
      <style>{`@media(max-width:1120px){.kb-dash-grid{grid-template-columns:1fr!important}.kb-dash-grid aside{position:static!important}}
        @media(max-width:680px){.kb-dash-cards,.kb-dash-actions{grid-template-columns:1fr!important}}`}</style>

      <div>
        <div style={{ fontFamily: FB, fontSize: 13, color: A.muted, marginBottom: 18 }}>{d.crumb}</div>

        {loading ? (
          <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}><Spinner /></div>
        ) : plans.length > 0 ? (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: FB, fontSize: 24, fontWeight: 700, color: A.text, margin: "0 0 16px" }}>
              {interp(d.activePlans, { n: plans.length })}
            </h2>
            <div className="kb-dash-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
              {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
            </div>
          </section>
        ) : null}

        <section>
          <h2 style={{ fontFamily: FB, fontSize: 24, fontWeight: 700, color: A.text, margin: "0 0 16px" }}>{d.whatToday}</h2>
          <div className="kb-dash-actions" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {actions.map((act) => (
              <ActionCard key={act.type} icon={act.icon} title={act.title} desc={act.desc} button={act.button}
                onClick={() => start(act.type)} busy={busyType === act.type} />
            ))}
          </div>
        </section>

        <div style={{ marginTop: 24 }}>
          <PanelCard style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <IconBubble icon={<ShieldCheck size={22} />} size={48} tone="green" />
            <div style={{ flex: "1 1 240px", minWidth: 0 }}>
              <div style={{ fontFamily: FB, fontSize: 17, fontWeight: 700, color: A.text }}>{d.preApproved.title}</div>
              <div style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.5, marginTop: 3 }}>{d.preApproved.body}</div>
            </div>
            <button onClick={() => start("purchase")} disabled={busyType === "purchase"}
              style={appPrimaryBtn({ padding: "12px 20px", opacity: busyType === "purchase" ? 0.7 : 1 })}>
              {d.preApproved.button} <ArrowRight size={16} />
            </button>
          </PanelCard>
        </div>
      </div>

      <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>
        <HelpCard />
        <OwnPropertyCard />
      </aside>
    </div>
  );
}
