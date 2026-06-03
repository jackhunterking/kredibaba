import { Users, Handshake, TrendingUp, MessageCircle, Check } from "lucide-react";
import { FB, R, C, WA, buildWhatsAppUrl } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { PageHeading, PanelCard, IconBubble } from "../components/ui.jsx";
import { appPrimaryBtn } from "../components/ui.jsx";

const ICONS = [<Handshake size={20} />, <TrendingUp size={20} />, <Users size={20} />];

export default function Realtors() {
  const { t, lang } = useLang();
  const r = t.app.realtors;
  const items = r.benefits.map((b, i) => ({ ...b, icon: ICONS[i] }));

  return (
    <div>
      <PageHeading crumb={r.crumb} title={r.title} />

      <div style={{
        borderRadius: R.panel, padding: "30px 28px", marginBottom: 24, color: "#fff",
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyM} 100%)`,
      }}>
        <h2 style={{ fontFamily: FB, fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, margin: "0 0 10px", maxWidth: 620 }}>{r.heroTitle}</h2>
        <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 600 }}>{r.heroBody}</p>
        <a href={buildWhatsAppUrl({ lang })} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button style={appPrimaryBtn({ padding: "13px 22px", background: "#fff", color: C.navy })}>
            <MessageCircle size={17} /> {r.cta}
          </button>
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 24 }}>
        {items.map((it) => (
          <PanelCard key={it.title} style={{ height: "100%" }}>
            <div style={{ marginBottom: 14 }}><IconBubble icon={it.icon} size={46} /></div>
            <h3 style={{ fontFamily: FB, fontSize: 17, fontWeight: 700, color: A.text, margin: "0 0 6px" }}>{it.title}</h3>
            <p style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.55, margin: 0 }}>{it.text}</p>
          </PanelCard>
        ))}
      </div>

      <PanelCard>
        <h3 style={{ fontFamily: FB, fontSize: 17, fontWeight: 700, color: A.text, margin: "0 0 14px" }}>{r.howTitle}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {r.how.map((line, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, marginTop: 1, color: A.green }}><Check size={18} /></span>
              <span style={{ fontFamily: FB, fontSize: 14, color: A.body, lineHeight: 1.5 }}>{line}</span>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
