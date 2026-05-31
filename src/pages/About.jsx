import { useOutletContext } from "react-router-dom";
import { ArrowRight, Eye, Heart, MessageCircle, ShieldCheck, Users } from "lucide-react";
import {
  C, FB, R, S, WA, wrap, primaryBtn, PersonCard, PageHero, SectionLabel, BROKERAGE, LICENSE,
} from "../theme.jsx";
import { useLang, interp } from "../i18n/LanguageContext.jsx";

const VALUE_ICONS = [<Eye size={20}/>, <Heart size={20}/>, <Users size={20}/>];

function Values() {
  const { t } = useLang();
  const vals = t.about.values.map((v, i) => ({ ...v, icon: VALUE_ICONS[i] }));
  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[32]}}>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
        {vals.map((v,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 22px'}}>
            <div style={{width:46,height:46,borderRadius:R.icon,background:C.blueFaint,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>{v.icon}</div>
            <h3 style={{fontFamily:FB,fontSize:23,color:C.navy,fontWeight:600,marginBottom:5}}>{v.t}</h3>
            <p style={{fontSize:13.5,color:C.muted,fontWeight:600}}>{v.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const { t } = useLang();
  const leaders = t.about.team;
  return (
    <section style={{...wrap,paddingTop:S[40],paddingBottom:S[32]}}>
      <div style={{textAlign:'center',maxWidth:560,margin:'0 auto 28px'}}>
        <SectionLabel>{t.about.teamLabel}</SectionLabel>
        <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
          {t.about.teamTitle}
        </h2>
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
        {leaders.map((p,i)=>(
          <PersonCard key={i} {...p} photoSize={96}/>
        ))}
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

function CTA({ onCTA }) {
  const { t } = useLang();
  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56],textAlign:'center'}}>
        <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16,marginBottom:18}}>
          {t.about.cta.title}
        </h2>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            {t.about.cta.btnAccount} <ArrowRight size={18}/>
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{padding:'15px 26px',fontSize:16,background:'#fff',color:C.navy,cursor:'pointer',
                            border:`1px solid ${C.border}`,borderRadius:R.control,fontFamily:FB,fontWeight:600,
                            display:'inline-flex',alignItems:'center',gap:8}}>
              <MessageCircle size={18}/> {t.about.cta.btnWhatsapp}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { openForm } = useOutletContext();
  const { t } = useLang();
  return (
    <>
      <PageHero
        label={t.about.label}
        title={t.about.title}
        sub={t.about.sub}
      />
      <Values/>
      <Team/>
      <Brokerage/>
      <CTA onCTA={openForm}/>
    </>
  );
}
