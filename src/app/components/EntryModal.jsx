import { useState } from "react";
import { X } from "lucide-react";
import { FB, R, S } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { appPrimaryBtn, appGhostBtn, Spinner } from "./ui.jsx";

// Generic add/edit modal. Drive it with a `fields` config:
//   { key, label, type: 'text'|'number'|'date'|'select'|'checkbox', placeholder,
//     options:[{value,label}], required, half (two-up layout), prefix }
export default function EntryModal({
  title,
  subtitle,
  fields = [],
  initial = {},
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onSubmit,
  onClose,
}) {
  const [values, setValues] = useState(() => {
    const base = {};
    fields.forEach((f) => {
      base[f.key] = f.key in initial ? initial[f.key] : f.type === "checkbox" ? false : "";
    });
    return base;
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const missing = fields.find((f) => f.required && !String(values[f.key] ?? "").trim());
    if (missing) {
      setErr(`"${missing.label}" is required.`);
      return;
    }
    setErr("");
    setBusy(true);
    try {
      await onSubmit(values);
      onClose();
    } catch (e2) {
      setErr(e2?.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "11px 13px", fontSize: 14.5, fontFamily: FB,
    color: A.text, background: A.card2, border: `1px solid ${A.border}`, borderRadius: R.control, outline: "none",
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && !busy && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(6,25,44,0.55)",
        backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <style>{`@keyframes kbslide{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        .kb-entry-input:focus{border-color:${A.accent}!important;box-shadow:0 0 0 3px ${A.accentFaint};}
        .kb-entry-input::placeholder{color:${A.muted};}`}</style>

      <div style={{
        width: "100%", maxWidth: 480, maxHeight: "90vh", overflow: "auto", background: A.card,
        borderRadius: R.panel, boxShadow: "0 24px 50px rgba(0,0,0,0.35)", animation: "kbslide .25s ease-out",
      }}>
        <div style={{
          position: "sticky", top: 0, background: A.card, borderBottom: `1px solid ${A.borderL}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", zIndex: 1,
        }}>
          <div>
            <h2 style={{ fontFamily: FB, fontSize: 18, fontWeight: 700, color: A.text, margin: 0 }}>{title}</h2>
            {subtitle && <p style={{ fontFamily: FB, fontSize: 13, color: A.muted, margin: "3px 0 0" }}>{subtitle}</p>}
          </div>
          <button onClick={() => !busy && onClose()} aria-label="Close" style={{
            ...appGhostBtn({ padding: 0, width: 34, height: 34, borderRadius: R.control }), color: A.muted,
          }}>
            <X size={17} />
          </button>
        </div>

        <form onSubmit={submit} style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: S[16] }}>
          {fields.map((f) => (
            <label key={f.key} style={{ display: "block", flex: f.half ? "1 1 calc(50% - 8px)" : "1 1 100%", minWidth: 0 }}>
              {f.type !== "checkbox" && (
                <span style={{ display: "block", fontFamily: FB, fontSize: 12.5, fontWeight: 600, color: A.text, marginBottom: 6 }}>
                  {f.label}{f.required && <span style={{ color: A.danger }}> *</span>}
                </span>
              )}

              {f.type === "select" ? (
                <select className="kb-entry-input" style={inputStyle} value={values[f.key]} onChange={(e) => set(f.key, e.target.value)}>
                  <option value="">{f.placeholder || "Select…"}</option>
                  {(f.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === "checkbox" ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: FB, fontSize: 14, color: A.text, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!values[f.key]} onChange={(e) => set(f.key, e.target.checked)} style={{ width: 17, height: 17, accentColor: A.accent }} />
                  {f.label}
                </span>
              ) : (
                <input
                  className="kb-entry-input"
                  style={inputStyle}
                  type={f.type || "text"}
                  placeholder={f.placeholder || ""}
                  value={values[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
            </label>
          ))}

          {err && <p style={{ flex: "1 1 100%", fontFamily: FB, fontSize: 13, color: A.danger, fontWeight: 600, margin: 0 }}>{err}</p>}

          <div style={{ flex: "1 1 100%", display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={() => !busy && onClose()} style={appGhostBtn({ padding: "11px 18px" })}>{cancelLabel}</button>
            <button type="submit" disabled={busy} style={appPrimaryBtn({ padding: "11px 22px", opacity: busy ? 0.7 : 1 })}>
              {busy ? <Spinner size={16} color="#fff" /> : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
