import { useState } from "react";
import { Gift, Copy, Check, Users } from "lucide-react";
import { FB, R } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang, interp } from "../../i18n/LanguageContext.jsx";
import { useAuth } from "../AuthContext.jsx";
import { PageHeading, PanelCard, IconBubble, EmptyState } from "../components/ui.jsx";
import { appPrimaryBtn } from "../components/ui.jsx";

export default function Referrals() {
  const { t } = useLang();
  const rf = t.app.referrals;
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const code = (user?.id || "kredibaba").replace(/-/g, "").slice(0, 8).toUpperCase();
  const link = `${window.location.origin}/auth/sign-up?ref=${code}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <PageHeading crumb={rf.crumb} title={rf.title} />

      <PanelCard style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <IconBubble icon={<Gift size={22} />} size={48} tone="green" />
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <h2 style={{ fontFamily: FB, fontSize: 19, fontWeight: 700, color: A.text, margin: "0 0 6px" }}>{rf.cardTitle}</h2>
            <p style={{ fontFamily: FB, fontSize: 14, color: A.body, lineHeight: 1.55, margin: "0 0 16px" }}>{rf.cardBody}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{
                flex: "1 1 240px", minWidth: 0, display: "flex", alignItems: "center",
                background: A.card2, border: `1px solid ${A.border}`, borderRadius: R.control, padding: "10px 14px",
                fontFamily: FB, fontSize: 13.5, color: A.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{link}</div>
              <button onClick={copy} style={appPrimaryBtn({ padding: "11px 18px" })}>
                {copied ? <><Check size={16} /> {rf.copied}</> : <><Copy size={16} /> {rf.copy}</>}
              </button>
            </div>
          </div>
        </div>
      </PanelCard>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 }}>
        {rf.steps.map((s, i) => (
          <PanelCard key={i}>
            <div style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, color: A.accent, marginBottom: 8 }}>{interp(rf.stepLabel, { n: i + 1 })}</div>
            <div style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: A.text, marginBottom: 4 }}>{s.title}</div>
            <p style={{ fontFamily: FB, fontSize: 13, color: A.body, lineHeight: 1.5, margin: 0 }}>{s.text}</p>
          </PanelCard>
        ))}
      </div>

      <h2 style={{ fontFamily: FB, fontSize: 19, fontWeight: 700, color: A.text, margin: "0 0 14px" }}>{rf.listTitle}</h2>
      <EmptyState icon={<Users size={24} />} title={rf.emptyTitle} lines={[rf.emptyLine]} />
    </div>
  );
}
