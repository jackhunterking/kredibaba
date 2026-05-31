import { Check, X } from "lucide-react";
import { BROKERAGE, C, FB, R, S, SHADOW, SectionLabel } from "../../theme.jsx";
import { interp } from "../../i18n/LanguageContext.jsx";

export default function RateDisclosureModal({ disclosure, onClose }) {
  if (!disclosure) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={disclosure.aria}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(6,25,44,0.52)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: S[24],
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(620px,100%)",
          background: "#fff",
          border: `1px solid ${C.border}`,
          borderRadius: R.panel,
          boxShadow: SHADOW.elevated,
          padding: "28px 28px 26px",
        }}
      >
        <div style={{display: "flex", alignItems: "start", justifyContent: "space-between", gap: 20, marginBottom: 18}}>
          <div>
            <SectionLabel>{disclosure.label}</SectionLabel>
            <h2 style={{fontFamily: FB, fontSize: 30, color: C.navy, fontWeight: 600, lineHeight: 1.12}}>
              {disclosure.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={disclosure.closeAria}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${C.border}`,
              borderRadius: R.control,
              background: C.surface,
              color: C.navy,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <X size={18}/>
          </button>
        </div>

        <div style={{display: "grid", gap: 12}}>
          {disclosure.bullets.map((item) => (
            <p
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: R.control,
                padding: "13px 14px",
                color: C.body,
                fontSize: 14,
                lineHeight: 1.5,
                margin: 0,
                fontFamily: FB,
              }}
            >
              <Check size={16} color={C.blue} style={{flexShrink: 0, marginTop: 2}}/>
              <span>{interp(item, { BROKERAGE })}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
