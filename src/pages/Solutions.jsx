import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Banknote, Building2, CreditCard, Hammer, Home as HomeIcon,
  KeyRound, RefreshCw, Search, Unlock,
} from "lucide-react";
import { C, FB, R, S, SHADOW, wrap, primaryBtn, PageHero, SectionLabel, IMG, AdvisorStrip, PersonaPhotoCard } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const WHO_ICONS = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <Building2 size={20}/>, <Banknote size={20}/>, <KeyRound size={20}/>];
const WHO_IMAGES = [IMG.personaFirst, IMG.personaOwner, IMG.personaInvestor, IMG.personaSelf, IMG.personaNewcomer];
const WHAT_ICONS = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <Hammer size={20}/>, <CreditCard size={20}/>, <Unlock size={20}/>, <Search size={20}/>];

export default function Solutions() {
  const { openForm } = useOutletContext();
  const { t } = useLang();
  const s = t.solutions;
  const personaLinks = t.mega.cozumler.groups[0].items.map((item) => item.href);
  const WHO = s.who.map((it, i) => ({ ...it, icon: WHO_ICONS[i], image: WHO_IMAGES[i], to: personaLinks[i] }));
  const WHAT = s.what.map((it, i) => ({ ...it, icon: WHAT_ICONS[i] }));

  return (
    <>
      <PageHero
        label={s.label}
        title={s.title}
        sub={s.sub}
      />

      <section id="kime-yardim" style={{...wrap,paddingTop:S[56],paddingBottom:S[40]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 36px'}}>
          {s.whoLabel ? <SectionLabel>{s.whoLabel}</SectionLabel> : null}
          {s.whoHeading ? (
            <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.2}}>
              {s.whoHeading}
            </h2>
          ) : null}
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {WHO.map((item,i)=>(
            <PersonaPhotoCard
              key={i}
              id={item.id}
              image={item.image}
              imgAlt={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
              to={item.to}
            />
          ))}
        </div>
      </section>

      <AdvisorStrip onCTA={openForm}/>

      <section id="ne-yardim" style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 36px'}}>
          <SectionLabel>{s.whatLabel}</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.2}}>
            {s.whatHeading}
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {WHAT.map((item,i)=>(
            <div id={item.id} key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 24px',display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{width:42,height:42,borderRadius:R.icon,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {item.icon}
              </div>
              <div>
                <h3 style={{fontSize:17,color:C.navy,fontWeight:600,fontFamily:FB,marginBottom:7}}>{item.title}</h3>
                <p style={{fontSize:13.5,color:C.muted,fontWeight:500,lineHeight:1.45}}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,borderRadius:R.panel,
                     padding:'36px 34px',color:'#fff',marginTop:42}}>
          <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:26,alignItems:'center'}}>
            <div>
              <h2 style={{fontFamily:FB,fontSize:'clamp(24px,4vw,32px)',fontWeight:700,marginBottom:12}}>
                {s.ctaTitle}
              </h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.76)',lineHeight:1.55,maxWidth:560}}>{s.ctaSub}</p>
            </div>
            <button onClick={openForm} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8,whiteSpace:'nowrap'})}>
              {s.ctaButton} <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
