import { useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";
import { FB, R } from "../../theme.jsx";
import { A } from "../appTheme.js";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { useProperties } from "../data/hooks.js";
import {
  PageHeading, PanelCard, EmptyState, IconBubble, Spinner, fmtMoney,
  appPrimaryBtn, appGhostBtn,
} from "../components/ui.jsx";
import EntryModal from "../components/EntryModal.jsx";

function PropertyCard({ property, onRemove }) {
  const { t } = useLang();
  const p = t.app.properties;
  const types = p.propertyTypes.reduce((m, o) => ({ ...m, [o.value]: o.label }), {});
  return (
    <PanelCard style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <IconBubble icon={<Building2 size={22} />} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: FB, fontSize: 16.5, fontWeight: 700, color: A.text }}>{property.address}</div>
            <div style={{ fontFamily: FB, fontSize: 13, color: A.muted, marginTop: 2 }}>
              {[property.city, property.province, property.postal_code].filter(Boolean).join(", ") || "—"}
            </div>
          </div>
          <button onClick={() => onRemove(property.id)} aria-label={p.remove}
            style={{ ...appGhostBtn({ padding: 0, width: 34, height: 34, borderRadius: R.control }), color: A.muted }}>
            <Trash2 size={16} />
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", marginTop: 14 }}>
          <Stat label={p.fields.estimated_value} value={fmtMoney(property.estimated_value)} />
          <Stat label={p.fields.mortgage_balance} value={fmtMoney(property.mortgage_balance)} />
          {property.property_type && <Stat label={p.fields.property_type} value={types[property.property_type] || property.property_type} />}
        </div>
      </div>
    </PanelCard>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: A.muted }}>{label}</div>
      <div style={{ fontFamily: FB, fontSize: 15, fontWeight: 600, color: A.text, marginTop: 3 }}>{value}</div>
    </div>
  );
}

export default function Properties() {
  const { t } = useLang();
  const p = t.app.properties;
  const { properties, loading, addProperty, removeProperty } = useProperties();
  const [open, setOpen] = useState(false);

  const fields = [
    { key: "address", label: p.fields.address, type: "text", required: true, placeholder: "123 Main St" },
    { key: "city", label: p.fields.city, type: "text", half: true },
    { key: "province", label: p.fields.province, type: "text", half: true },
    { key: "postal_code", label: p.fields.postal_code, type: "text", half: true },
    { key: "property_type", label: p.fields.property_type, type: "select", half: true, options: p.propertyTypes },
    { key: "estimated_value", label: p.fields.estimated_value, type: "number", half: true, placeholder: "850000" },
    { key: "mortgage_balance", label: p.fields.mortgage_balance, type: "number", half: true, placeholder: "420000" },
  ];

  const addBtn = (
    <button onClick={() => setOpen(true)} style={appPrimaryBtn({ padding: "11px 18px" })}>
      <Plus size={16} /> {p.add}
    </button>
  );

  return (
    <div>
      <PageHeading crumb={p.crumb} title={p.title} action={properties.length > 0 ? addBtn : null} />

      {loading ? (
        <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}><Spinner /></div>
      ) : properties.length === 0 ? (
        <EmptyState
          icon={<Building2 size={26} />}
          title={p.emptyTitle}
          lines={p.emptyBullets}
          action={addBtn}
        />
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {properties.map((prop) => <PropertyCard key={prop.id} property={prop} onRemove={removeProperty} />)}
        </div>
      )}

      {open && (
        <EntryModal
          title={p.add}
          subtitle={p.modalSubtitle}
          fields={fields}
          submitLabel={p.add}
          cancelLabel={t.app.common.cancel}
          onSubmit={(v) => addProperty({
            ...v,
            estimated_value: v.estimated_value === "" ? null : Number(v.estimated_value),
            mortgage_balance: v.mortgage_balance === "" ? null : Number(v.mortgage_balance),
          })}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
