import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, BookOpen, Check, HelpCircle, Info, RefreshCw } from "lucide-react";
import { C, FB, R, S, wrap, primaryBtn, PageHero, SectionLabel } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const GUIDE_ICONS = [<BookOpen size={21}/>, <RefreshCw size={21}/>, <Info size={21}/>];

export default function Learn() {
  const { openForm } = useOutletContext();
  const { t } = useLang();
  const l = t.learn;
  const guides = l.guides.map((g, i) => ({ ...g, icon: GUIDE_ICONS[i] }));
  return (
    <>
      <PageHero
        label={l.label}
        title={l.title}
        sub={l.sub}
      />

      <section style={{...wrap,paddingTop:S[56],paddingBottom:S[32]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:22,marginBottom:24,flexWrap:'wrap'}}>
          <div>
            <SectionLabel>{l.glossaryLabel}</SectionLabel>
            <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
              {l.glossaryTitle}
            </h2>
          </div>
          <Link to="/araclar" style={{textDecoration:'none'}}>
            <button style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.control,padding:'12px 18px',fontFamily:FB,fontWeight:600,color:C.navy,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8}}>
              {l.glossaryButton} <ArrowRight size={16}/>
            </button>
          </Link>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {l.glossary.map((item,i)=>(
            <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'18px 18px'}}>
              <h3 style={{fontSize:16,color:C.navy,fontWeight:700,fontFamily:FB,marginBottom:5}}>{item.term}</h3>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:500}}>{item.plain}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[40],paddingBottom:S[32]}}>
        <div style={{textAlign:'center',maxWidth:560,margin:'0 auto 28px'}}>
          <SectionLabel>{l.guidesLabel}</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
            {l.guidesTitle}
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {guides.map((guide,i)=>(
            <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 22px'}}>
              <div style={{width:46,height:46,borderRadius:R.icon,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>
                {guide.icon}
              </div>
              <h3 style={{fontFamily:FB,fontSize:23,color:C.navy,fontWeight:600,marginBottom:6}}>{guide.title}</h3>
              <p style={{fontSize:14,color:C.muted,fontWeight:600}}>{guide.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'0.72fr 1.28fr',gap:28,alignItems:'start'}}>
          <div>
            <SectionLabel>{l.faqLabel}</SectionLabel>
            <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.16,marginBottom:18}}>
              {l.faqTitle}
            </h2>
            <button onClick={openForm} style={primaryBtn({padding:'14px 24px',display:'inline-flex',alignItems:'center',gap:8})}>
              {l.faqButton} <ArrowRight size={16}/>
            </button>
          </div>
          <div style={{display:'grid',gap:12}}>
            {l.faq.map((faq,i)=>(
              <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'16px 18px'}}>
                <h3 style={{display:'flex',alignItems:'center',gap:9,fontSize:15.5,color:C.navy,fontWeight:700,fontFamily:FB,marginBottom:5}}>
                  <HelpCircle size={16} color={C.blue}/> {faq.q}
                </h3>
                <p style={{fontSize:13.5,color:C.body,lineHeight:1.5}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.blueFaint,borderTop:`1px solid ${C.border}`}}>
        <div style={{...wrap,paddingTop:S[24],paddingBottom:S[24]}}>
          <p style={{fontSize:12.5,color:C.body,lineHeight:1.5,fontFamily:FB,margin:0}}>
            <Check size={14} color={C.blue} style={{verticalAlign:'-3px',marginRight:7}}/>
            {l.footnote}
          </p>
        </div>
      </section>
    </>
  );
}
