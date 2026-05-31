// ════════════════════════════════════════════════════════════════════════
// App (/app) theme — CSS-variable palette so light/dark flips with one toggle.
// The marketing site keeps using the static `C` tokens from theme.jsx; only the
// authenticated /app area opts into these variables (scoped under `.kb-app`).
//
// Components reference colors via `A.*` (which resolve to `var(--app-*)`), so a
// single `data-theme` switch on the app wrapper re-themes every screen.
// Non-color tokens (R, S, type, SHADOW, FB) still come from theme.jsx.
// ════════════════════════════════════════════════════════════════════════

export const A = {
  bg:          "var(--app-bg)",
  card:        "var(--app-card)",
  card2:       "var(--app-card2)",
  sidebar:     "var(--app-sidebar)",
  text:        "var(--app-text)",
  body:        "var(--app-body)",
  muted:       "var(--app-muted)",
  border:      "var(--app-border)",
  borderL:     "var(--app-border-l)",
  hover:       "var(--app-hover)",
  accent:      "var(--app-accent)",
  accentFaint: "var(--app-accent-faint)",
  green:       "var(--app-green)",
  greenFaint:  "var(--app-green-faint)",
  amber:       "var(--app-amber)",
  amberFaint:  "var(--app-amber-faint)",
  danger:      "var(--app-danger)",
  onAccent:    "#ffffff",
  shadow:      "var(--app-shadow)",
};

// Injected once by AppLayout. Light values on `.kb-app`, dark overrides under
// `.kb-app[data-theme="dark"]`.
export const APP_THEME_CSS = `
  .kb-app{
    --app-bg:#F4F7FB;
    --app-card:#FFFFFF;
    --app-card2:#F6F8FB;
    --app-sidebar:#FFFFFF;
    --app-text:#0A2540;
    --app-body:#3F4F60;
    --app-muted:#69788A;
    --app-border:#E2E8F0;
    --app-border-l:#EDF1F6;
    --app-hover:#EAF1FC;
    --app-accent:#1B5FCC;
    --app-accent-faint:#EAF1FC;
    --app-green:#0A8754;
    --app-green-faint:#E7F5EE;
    --app-amber:#B7791F;
    --app-amber-faint:#FBF3E2;
    --app-danger:#C0392B;
    --app-shadow:0 8px 28px rgba(10,37,64,0.06);
  }
  .kb-app[data-theme="dark"]{
    --app-bg:#0A1420;
    --app-card:#111F2E;
    --app-card2:#0E1A27;
    --app-sidebar:#0C1825;
    --app-text:#EAF1FB;
    --app-body:#B7C5D6;
    --app-muted:#7E92A6;
    --app-border:#1E3247;
    --app-border-l:#182A3C;
    --app-hover:rgba(59,130,246,0.16);
    --app-accent:#4C8DF6;
    --app-accent-faint:rgba(76,141,246,0.16);
    --app-green:#34C58C;
    --app-green-faint:rgba(52,197,140,0.14);
    --app-amber:#E0A93C;
    --app-amber-faint:rgba(224,169,60,0.14);
    --app-danger:#F0726A;
    --app-shadow:0 10px 30px rgba(0,0,0,0.35);
  }
`;
