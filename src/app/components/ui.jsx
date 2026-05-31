import { FB, R, S } from "../../theme.jsx";
import { A } from "../appTheme.js";

// ── Button style helpers (mirror theme.jsx btn helpers, but theme-aware) ──
export const appBtn = (extra = {}) => ({
  border: "none", borderRadius: R.control, cursor: "pointer", fontFamily: FB,
  fontWeight: 600, fontSize: 14.5, padding: "11px 18px", transition: "all .15s",
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, ...extra,
});
export const appPrimaryBtn = (extra = {}) => ({ ...appBtn(extra), background: A.accent, color: A.onAccent });
export const appGhostBtn = (extra = {}) => ({ ...appBtn(extra), background: A.card, color: A.text, border: `1px solid ${A.border}` });
export const appSubtleBtn = (extra = {}) => ({ ...appBtn(extra), background: A.accentFaint, color: A.accent });

// ── Rounded icon bubble ───────────────────────────────────────────────
export function IconBubble({ icon, size = 48, tone = "accent" }) {
  const tones = {
    accent: { bg: A.accentFaint, fg: A.accent },
    green:  { bg: A.greenFaint,  fg: A.green },
    amber:  { bg: A.amberFaint,  fg: A.amber },
    plain:  { bg: A.card2,       fg: A.body },
  };
  const c = tones[tone] || tones.accent;
  return (
    <span style={{
      width: size, height: size, borderRadius: R.icon, background: c.bg, color: c.fg,
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {icon}
    </span>
  );
}

// ── White panel card ──────────────────────────────────────────────────
export function PanelCard({ children, style, padding = "22px" }) {
  return (
    <div style={{
      background: A.card, border: `1px solid ${A.border}`, borderRadius: R.card,
      boxShadow: A.shadow, padding, ...style,
    }}>
      {children}
    </div>
  );
}

// ── Page heading (breadcrumb label + title) ───────────────────────────
export function PageHeading({ crumb, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
      <div>
        {crumb && (
          <div style={{ fontFamily: FB, fontSize: 13, color: A.muted, fontWeight: 500, marginBottom: 6 }}>{crumb}</div>
        )}
        <h1 style={{ fontFamily: FB, fontSize: "clamp(26px,3.4vw,34px)", fontWeight: 700, color: A.text, lineHeight: 1.15, margin: 0 }}>
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}

// ── Status pill ───────────────────────────────────────────────────────
export function StatusBadge({ tone = "accent", children }) {
  const tones = {
    accent: { bg: A.accentFaint, fg: A.accent },
    green:  { bg: A.greenFaint,  fg: A.green },
    amber:  { bg: A.amberFaint,  fg: A.amber },
    danger: { bg: "rgba(192,57,43,0.12)", fg: A.danger },
  };
  const c = tones[tone] || tones.accent;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px",
      borderRadius: R.chip, background: c.bg, color: c.fg, fontFamily: FB, fontSize: 12.5, fontWeight: 700,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.fg }} />
      {children}
    </span>
  );
}

// ── Empty-state block (dashed) ────────────────────────────────────────
export function EmptyState({ icon, title, lines = [], action }) {
  return (
    <div style={{
      border: `1.5px dashed ${A.border}`, borderRadius: R.panel, background: A.card,
      padding: "44px 28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {icon && <div style={{ marginBottom: 18 }}><IconBubble icon={icon} size={56} /></div>}
      {title && (
        <h3 style={{ fontFamily: FB, fontSize: 22, fontWeight: 700, color: A.text, margin: "0 0 14px" }}>{title}</h3>
      )}
      {lines.length > 0 && (
        <ul style={{ listStyle: "disc", textAlign: "left", color: A.body, fontFamily: FB, fontSize: 14.5, lineHeight: 1.7, margin: "0 0 22px", paddingLeft: 22, maxWidth: 560 }}>
          {lines.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
      {action}
    </div>
  );
}

// ── Section block with dashed frame (profile-style) ───────────────────
export function SectionBlock({ icon, title, description, children }) {
  return (
    <div style={{ border: `1.5px dashed ${A.border}`, borderRadius: R.panel, background: A.card, padding: "28px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        {icon && <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}><IconBubble icon={icon} size={56} /></div>}
        <h3 style={{ fontFamily: FB, fontSize: 22, fontWeight: 700, color: A.text, margin: "0 0 8px" }}>{title}</h3>
        {description && <p style={{ fontFamily: FB, fontSize: 14.5, color: A.body, lineHeight: 1.6, margin: "0 0 20px" }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Small inline spinner ──────────────────────────────────────────────
export function Spinner({ size = 22, color = A.accent }) {
  return (
    <span style={{ display: "inline-flex" }}>
      <span style={{
        width: size, height: size, border: `2.5px solid ${A.border}`, borderTopColor: color,
        borderRadius: "50%", display: "inline-block", animation: "kbspin 0.8s linear infinite",
      }} />
      <style>{`@keyframes kbspin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}

// ── Formatting helpers ────────────────────────────────────────────────
export const fmtMoney = (v) =>
  v === null || v === undefined || v === "" ? "—" : "$" + Number(v).toLocaleString("en-CA");

export const fmtDate = (v) => {
  if (!v) return "—";
  const d = /^\d{4}-\d{2}-\d{2}$/.test(v)
    ? new Date(Number(v.slice(0, 4)), Number(v.slice(5, 7)) - 1, Number(v.slice(8, 10)))
    : new Date(v);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
};

export const _spacing = S; // re-export convenience
