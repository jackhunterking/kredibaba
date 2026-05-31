import { useState } from "react";
import { ChevronDown, MessageCircle, Phone, CalendarClock } from "lucide-react";
import { FB, R, WA, TEL, CAL } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { PageHeading, PanelCard, IconBubble } from "../components/ui.jsx";

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${A.borderL}` }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        padding: "16px 2px", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: FB, fontSize: 15.5, fontWeight: 600, color: A.text, textAlign: "left",
      }}>
        {q}
        <ChevronDown size={18} color={A.muted} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {open && <p style={{ fontFamily: FB, fontSize: 14, color: A.body, lineHeight: 1.6, margin: "0 0 16px", paddingRight: 28 }}>{a}</p>}
    </div>
  );
}

export default function Help() {
  const { t } = useLang();
  const h = t.app.help;
  const [open, setOpen] = useState(0);

  const contacts = [
    { icon: <MessageCircle size={20} />, title: h.whatsapp, sub: h.whatsappSub, href: `https://wa.me/${WA}`, tone: "green" },
    { icon: <Phone size={20} />, title: h.call, sub: TEL, href: `tel:${TEL}`, tone: "accent" },
    { icon: <CalendarClock size={20} />, title: h.book, sub: h.bookSub, href: CAL, tone: "accent" },
  ];

  return (
    <div>
      <PageHeading crumb={h.crumb} title={h.title} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 24, alignItems: "start" }} className="kb-help-grid">
        <style>{`@media(max-width:980px){.kb-help-grid{grid-template-columns:1fr!important}}`}</style>

        <PanelCard>
          <h2 style={{ fontFamily: FB, fontSize: 19, fontWeight: 700, color: A.text, margin: "0 0 8px" }}>{h.faqTitle}</h2>
          <div>
            {h.faq.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </PanelCard>

        <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {contacts.map((c) => (
            <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <PanelCard style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <IconBubble icon={c.icon} size={46} tone={c.tone} />
                <div>
                  <div style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: A.text }}>{c.title}</div>
                  <div style={{ fontFamily: FB, fontSize: 13, color: A.muted, marginTop: 2 }}>{c.sub}</div>
                </div>
              </PanelCard>
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
}
