import { useRef, useState } from "react";
import { FileText, Upload, Download, Trash2 } from "lucide-react";
import { FB, R } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { supabase } from "../../lib/supabase.js";
import { useDocuments } from "../data/hooks.js";
import {
  PageHeading, PanelCard, IconBubble, Spinner, fmtDate, appPrimaryBtn, appGhostBtn,
} from "../components/ui.jsx";

function DocRow({ doc, onRemove }) {
  const { t } = useLang();
  const dl = t.app.documents;
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (!doc.storage_path) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.storage.from("documents").createSignedUrl(doc.storage_path, 60);
      if (error) throw error;
      window.open(data.signedUrl, "_blank", "noopener");
    } catch {
      /* ignore — surfaced via console */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
      background: A.card, border: `1px solid ${A.border}`, borderRadius: R.control,
    }}>
      <IconBubble icon={<FileText size={18} />} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FB, fontSize: 14.5, fontWeight: 600, color: A.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
        <div style={{ fontFamily: FB, fontSize: 12.5, color: A.muted, marginTop: 2 }}>
          {[doc.category, fmtDate(doc.uploaded_at || doc.created_at)].filter(Boolean).join(" · ")}
        </div>
      </div>
      <button onClick={download} aria-label={dl.download} disabled={busy}
        style={{ ...appGhostBtn({ padding: 0, width: 34, height: 34, borderRadius: R.control }), color: A.body }}>
        {busy ? <Spinner size={15} /> : <Download size={16} />}
      </button>
      <button onClick={() => onRemove(doc)} aria-label={dl.remove}
        style={{ ...appGhostBtn({ padding: 0, width: 34, height: 34, borderRadius: R.control }), color: A.muted }}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function Section({ title, empty, items, onRemove }) {
  return (
    <PanelCard style={{ marginBottom: 20 }}>
      <h2 style={{ fontFamily: FB, fontSize: 19, fontWeight: 700, color: A.text, margin: "0 0 16px" }}>{title}</h2>
      {items.length === 0 ? (
        <p style={{ fontFamily: FB, fontSize: 14, color: A.muted, margin: 0 }}>{empty}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((doc) => <DocRow key={doc.id} doc={doc} onRemove={onRemove} />)}
        </div>
      )}
    </PanelCard>
  );
}

export default function Documents() {
  const { t } = useLang();
  const dl = t.app.documents;
  const { documents, loading, uploadDocument, removeDocument } = useDocuments();
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const missing = documents.filter((d) => d.status === "missing");
  const uploaded = documents.filter((d) => d.status !== "missing");

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true); setErr("");
    try {
      await uploadDocument(file);
    } catch (e2) {
      setErr(e2?.message || dl.uploadError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeading
        crumb={dl.crumb}
        title={dl.title}
        action={
          <>
            <input ref={fileRef} type="file" hidden onChange={onPick} />
            <button onClick={() => fileRef.current?.click()} disabled={busy} style={appPrimaryBtn({ padding: "11px 18px", opacity: busy ? 0.7 : 1 })}>
              {busy ? <Spinner size={16} color="#fff" /> : <><Upload size={16} /> {dl.upload}</>}
            </button>
          </>
        }
      />

      {err && <p style={{ fontFamily: FB, fontSize: 13, color: A.danger, fontWeight: 600, marginTop: -8, marginBottom: 16 }}>{err}</p>}

      {loading ? (
        <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}><Spinner /></div>
      ) : (
        <>
          <Section title={dl.missingTitle} empty={dl.missingEmpty} items={missing} onRemove={removeDocument} />
          <Section title={dl.uploadedTitle} empty={dl.uploadedEmpty} items={uploaded} onRemove={removeDocument} />
        </>
      )}
    </div>
  );
}
