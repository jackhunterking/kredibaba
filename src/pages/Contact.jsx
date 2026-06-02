import { useOutletContext } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { C, FB, R, S, TEL, TEL_LINK, WhatsAppIconBadge, WhatsAppLogo, whatsAppBtn, wrap } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Contact() {
  const { getWhatsAppHref } = useOutletContext();
  const { t } = useLang();
  const c = t.contact;
  const whatsappHref = getWhatsAppHref("iletisim");

  return (
    <section style={{background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`,minHeight:"62vh"}}>
      <div style={{...wrap,paddingTop:S[64],paddingBottom:S[64],maxWidth:880,textAlign:"center"}}>
        <div style={{
          width:62,
          height:62,
          borderRadius:R.icon,
          background:"#fff",
          border:`1px solid ${C.waDark}22`,
          boxShadow:"0 16px 34px rgba(37,211,102,0.18)",
          display:"inline-flex",
          alignItems:"center",
          justifyContent:"center",
          marginBottom:22,
        }}>
          <WhatsAppLogo size={42} title="WhatsApp"/>
        </div>
        <h1 style={{
          fontFamily:FB,
          fontSize:"clamp(34px,5vw,52px)",
          color:C.navy,
          fontWeight:700,
          lineHeight:1.1,
          letterSpacing:0,
          marginBottom:16,
        }}>
          {c.title}
        </h1>
        <p style={{fontSize:17,color:C.body,lineHeight:1.55,maxWidth:680,margin:"0 auto 28px"}}>
          {c.sub}
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:"14px 24px",fontSize:16,display:"inline-flex",alignItems:"center",gap:9})}>
              <WhatsAppIconBadge size={26} logoSize={18}/> {c.button} <ArrowRight size={18}/>
            </span>
          </a>
          <a href={`tel:${TEL_LINK}`} style={{textDecoration:"none"}}>
            <span style={{
              padding:"15px 24px",
              fontSize:16,
              background:"#fff",
              color:C.navy,
              border:`1px solid ${C.border}`,
              borderRadius:R.control,
              fontFamily:FB,
              fontWeight:600,
              display:"inline-flex",
              alignItems:"center",
              gap:8,
            }}>
              <Phone size={18}/> {TEL}
            </span>
          </a>
        </div>
        <p style={{fontSize:13.5,color:C.muted,lineHeight:1.5,maxWidth:600,margin:"0 auto"}}>
          <ShieldCheck size={15} color={C.blue} style={{verticalAlign:"-3px",marginRight:6}}/>
          {c.note}
        </p>
      </div>
    </section>
  );
}
