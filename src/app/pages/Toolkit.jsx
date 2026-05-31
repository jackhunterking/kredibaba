import { Link } from "react-router-dom";
import {
  FileCheck, Calculator, Landmark, Receipt, RefreshCw, Percent, ArrowRight,
} from "lucide-react";
import { FB, R } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { PageHeading, PanelCard, IconBubble } from "../components/ui.jsx";

const ICONS = [<FileCheck size={20} />, <Calculator size={20} />, <Percent size={20} />, <Receipt size={20} />, <RefreshCw size={20} />, <Landmark size={20} />];
const LINKS = [
  "/araclar#on-onay", "/araclar#mortgage-hesaplayici", "/araclar#uygunluk-hesaplayici",
  "/araclar#kapanis-masrafi", "/araclar#mortgage-yenileme-hesaplayici", "/araclar#tapu-devir-vergisi",
];

export default function Toolkit() {
  const { t } = useLang();
  const tk = t.app.toolkit;
  const items = tk.items.map((it, i) => ({ ...it, icon: ICONS[i], to: LINKS[i] }));

  return (
    <div>
      <PageHeading crumb={tk.crumb} title={tk.title} />
      <p style={{ fontFamily: FB, fontSize: 15, color: A.body, lineHeight: 1.6, maxWidth: 640, margin: "-8px 0 24px" }}>{tk.intro}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {items.map((it) => (
          <Link key={it.to} to={it.to} style={{ textDecoration: "none" }}>
            <PanelCard style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 14 }}><IconBubble icon={it.icon} size={46} /></div>
              <h3 style={{ fontFamily: FB, fontSize: 18, fontWeight: 700, color: A.text, margin: "0 0 6px" }}>{it.title}</h3>
              <p style={{ fontFamily: FB, fontSize: 13.5, color: A.body, lineHeight: 1.5, margin: "0 0 16px", flex: 1 }}>{it.desc}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: A.accent, fontFamily: FB, fontSize: 13.5, fontWeight: 700 }}>
                {tk.open} <ArrowRight size={15} />
              </span>
            </PanelCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
