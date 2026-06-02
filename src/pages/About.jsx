import { useOutletContext } from "react-router-dom";
import { ArrowRight, Eye, Heart, ShieldCheck, Users } from "lucide-react";
import {
  C, FB, R, S, wrap, whatsAppBtn, WhatsAppIconBadge, PersonCard, BROKERAGE, LICENSE, PEOPLE,
} from "../theme.jsx";
import { useLang, interp } from "../i18n/LanguageContext.jsx";

const VALUE_ICONS = [<Eye size={16}/>, <Heart size={16}/>, <Users size={16}/>];

function Team() {
  const { t } = useLang();
  const leaders = t.about.team;
  const vals = t.about.values.map((v, i) => ({ ...v, icon: VALUE_ICONS[i] }));
  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[32]}}>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:40}}>
        {vals.map((v,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.icon,padding:'8px 14px'}}>
            <span style={{color:C.blue,display:'flex'}}>{v.icon}</span>
            <span style={{fontFamily:FB,fontSize:13,color:C.navy,fontWeight:600}}>{v.t}</span>
            <span style={{fontSize:12.5,color:C.muted}}>— {v.d}</span>
          </div>
        ))}
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
        {leaders.map((p,i)=>{
          const person = p.photoKey ? PEOPLE[p.photoKey] : null;
          return <PersonCard key={i} {...p} photo={person?.src} photoPos={person?.pos} photoSize={96}/>;
        })}
      </div>
    </section>
  );
}

function Brokerage() {
  const { t } = useLang();
  return (
    <section style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
      <div style={{background:C.navy,color:'#fff',borderRadius:R.panel,padding:'30px 28px'}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:20,alignItems:'center'}}>
          <div style={{width:58,height:58,borderRadius:R.icon,background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ShieldCheck size={26} color={C.blueLight}/>
          </div>
          <div>
            <h3 style={{fontFamily:FB,fontSize:28,fontWeight:600,marginBottom:8}}>{t.about.brokerageTitle}</h3>
            <p style={{fontSize:14.5,color:'rgba(255,255,255,0.76)',lineHeight:1.55,maxWidth:760}}>
              {interp(t.about.brokerageText, { BROKERAGE, LICENSE })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ ctaHref }) {
  const { t } = useLang();
  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56],textAlign:'center'}}>
        <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16,marginBottom:18}}>
          {t.about.cta.title}
        </h2>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'14px 24px',fontSize:16,display:'inline-flex',alignItems:'center',gap:9})}>
              <WhatsAppIconBadge size={26} logoSize={18}/> {t.about.cta.btnAccount} <ArrowRight size={18}/>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { getWhatsAppHref } = useOutletContext();
  const { t } = useLang();
  return (
    <>
      <Team/>
      <Brokerage/>
      <CTA ctaHref={getWhatsAppHref("hakkimizda")}/>
    </>
  );
}
