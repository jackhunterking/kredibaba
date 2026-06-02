import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Banknote, Building2, Home as HomeIcon,
  KeyRound, PiggyBank, RefreshCw,
} from "lucide-react";
import { C, FB, R, S, SHADOW, wrap, whatsAppBtn, WhatsAppIconBadge, SectionLabel, IMG, AdvisorStrip, PersonaPhotoCard } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const WHO_ICONS = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <Building2 size={20}/>, <Banknote size={20}/>, <KeyRound size={20}/>];
const WHO_IMAGES = [IMG.personaFirst, IMG.personaOwner, IMG.personaInvestor, IMG.personaSelf, IMG.personaNewcomer];
const WHAT_ICONS = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <PiggyBank size={20}/>];

export default function Solutions() {
  const { getWhatsAppHref } = useOutletContext();
  const { t } = useLang();
  const s = t.solutions;
  const solutionsCtaHref = getWhatsAppHref("cozumler");
  const personaLinks = t.mega.cozumler.groups[0].items.map((item) => item.href);
  const WHO = s.who.map((it, i) => ({ ...it, icon: WHO_ICONS[i], image: WHO_IMAGES[i], to: personaLinks[i] }));
  const WHAT = s.what.map((it, i) => ({ ...it, icon: WHAT_ICONS[i] }));

  return (
    <>
      <section id="kime-yardim" style={{...wrap,paddingTop:S[64],paddingBottom:S[40]}}>
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

      <AdvisorStrip ctaHref={getWhatsAppHref("cozumler-advisor")}/>

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
            <a href={solutionsCtaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'14px 24px',fontSize:16,display:'inline-flex',alignItems:'center',gap:9,whiteSpace:'nowrap'})}>
                <WhatsAppIconBadge size={26} logoSize={18}/> {s.ctaButton} <ArrowRight size={18}/>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
