import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Calculator, Check, CreditCard, FileCheck,
  Hammer, Home as HomeIcon, Info, Landmark, Percent, RefreshCw,
  ShieldCheck, TrendingDown, Unlock, Wallet, X,
} from "lucide-react";
import {
  BROKERAGE, C, FB, R, S, SectionLabel, SHADOW,
  TrustRow, ghostBtn, IMG, primaryBtn, wrap,
  AdvisorChip, AdvisorStrip, Testimonials, PersonaPhotoCard, PhotoAvatar, PEOPLE,
} from "../theme.jsx";
import { useLang, interp } from "../i18n/LanguageContext.jsx";

function HeroRateMini({ item }) {
  const pending = item.pending;
  return (
    <div style={{
      padding:'18px 14px',
      textAlign:'center',
      minWidth:0,
    }}>
      <span className="kb-hero-rate-term" style={{display:'block',fontFamily:FB,color:C.muted}}>
        {item.term}
      </span>
      <strong
        className={`kb-hero-rate-value${pending ? ' is-pending' : ''}`}
        style={{display:'block',fontFamily:FB,color:pending ? C.muted : C.navy}}
      >
        {item.rate}
      </strong>
    </div>
  );
}

function DisclosureModal({ onClose }) {
  const { t } = useLang();
  const d = t.home.disclosure;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={d.aria}
      onClick={onClose}
      style={{
        position:'fixed',
        inset:0,
        zIndex:120,
        background:'rgba(6,25,44,0.52)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:S[24],
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width:'min(620px,100%)',
          background:'#fff',
          border:`1px solid ${C.border}`,
          borderRadius:R.panel,
          boxShadow:SHADOW.elevated,
          padding:'28px 28px 26px',
        }}
      >
        <div style={{display:'flex',alignItems:'start',justifyContent:'space-between',gap:20,marginBottom:18}}>
          <div>
            <SectionLabel>{d.label}</SectionLabel>
            <h2 style={{fontFamily:FB,fontSize:30,color:C.navy,fontWeight:600,lineHeight:1.12}}>
              {d.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={d.closeAria}
            style={{
              width:40,
              height:40,
              border:`1px solid ${C.border}`,
              borderRadius:R.control,
              background:C.surface,
              color:C.navy,
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexShrink:0,
            }}
          >
            <X size={18}/>
          </button>
        </div>
        <div style={{display:'grid',gap:12}}>
          {d.bullets.map((item) => (
            <p key={item} style={{
              display:'flex',
              alignItems:'flex-start',
              gap:10,
              background:C.surface,
              border:`1px solid ${C.border}`,
              borderRadius:R.control,
              padding:'13px 14px',
              color:C.body,
              fontSize:14,
              lineHeight:1.5,
              margin:0,
              fontFamily:FB,
            }}>
              <Check size={16} color={C.blue} style={{flexShrink:0,marginTop:2}}/>
              <span>{interp(item, { BROKERAGE })}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ onCTA }) {
  const { t } = useLang();
  const h = t.home.hero;
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <section style={{
      background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`,
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{...wrap,paddingTop:S[48],paddingBottom:S[48]}}>
        <div style={{textAlign:'center',maxWidth:780,margin:`0 auto ${S[32]}px`}}>
          <h1 className="kb-hero-title" style={{fontFamily:FB,color:C.navy}}>
            {h.title}
          </h1>
        </div>

        <div className="kb-hero-grid" style={{display:'grid',gridTemplateColumns:'0.98fr 1.02fr',gap:S[24],alignItems:'stretch'}}>
          <div className="kb-hero-rate-card" style={{
            background:'#fff',
            border:`1px solid ${C.border}`,
            borderRadius:R.panel,
            boxShadow:SHADOW.elevated,
            padding:'30px 28px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            minHeight:380,
          }}>
            <h2 className="kb-hero-card-title" style={{fontFamily:FB,color:C.navy}}>
              {h.cardTitle}
            </h2>

            <div className="kb-hero-rate-grid" style={{
              display:'grid',
              gridTemplateColumns:'repeat(2,minmax(0,1fr))',
              gap:0,
              borderTop:`1px solid ${C.border}`,
              borderBottom:`1px solid ${C.border}`,
              marginBottom:S[24],
            }}>
              {t.rates.heroRates.map((item) => (
                <div key={item.label} className="kb-hero-rate-cell">
                  <HeroRateMini item={item}/>
                </div>
              ))}
            </div>

            <div style={{display:'grid',justifyItems:'center',gap:S[16]}}>
              <button
                onClick={onCTA}
                style={primaryBtn({padding:'14px 26px',fontSize:15.5,width:'min(100%, 260px)',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8})}
              >
                {h.btnRates} <ArrowRight size={17}/>
              </button>
              <button
                onClick={() => setShowDisclosure(true)}
                style={{
                  border:'none',
                  background:'transparent',
                  color:C.blue,
                  cursor:'pointer',
                  fontFamily:FB,
                  fontSize:13.5,
                  fontWeight:500,
                  textDecoration:'underline',
                  textUnderlineOffset:3,
                  display:'inline-flex',
                  alignItems:'center',
                  gap:7,
                  padding:0,
                }}
              >
                {h.btnDisclosure} <Info size={14}/>
              </button>
            </div>
          </div>

          <div className="kb-hero-image" style={{position:'relative',borderRadius:R.media,overflow:'hidden',minHeight:380,boxShadow:SHADOW.elevated,background:C.navy}}>
            <img
              src={IMG.hero}
              alt={h.imgAlt}
              loading="eager"
              style={{width:'100%',height:'100%',minHeight:380,objectFit:'cover',display:'block'}}
            />
            <div style={{
              position:'absolute',
              inset:0,
              background:'linear-gradient(180deg,rgba(6,25,44,0.02) 0%,rgba(6,25,44,0.28) 100%)',
            }}/>
            <AdvisorChip name={h.advisorName} line={h.advisorLine}/>
          </div>
        </div>
      </div>
      {showDisclosure && <DisclosureModal onClose={() => setShowDisclosure(false)}/>}
    </section>
  );
}

function JourneyCard({ icon, title, sub, to, cta }) {
  return (
    <Link to={to} style={{textDecoration:'none'}}>
      <div style={{
        background:'#fff',
        border:`1px solid ${C.border}`,
        borderRadius:R.card,
        padding:'24px 22px',
        boxShadow:SHADOW.card,
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        gap:20,
      }}>
        <div>
          <span style={{
            width:48,
            height:48,
            borderRadius:R.icon,
            background:C.blueFaint,
            color:C.blue,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:18,
          }}>
            {icon}
          </span>
          <h3 style={{fontFamily:FB,fontSize:24,color:C.navy,fontWeight:600,lineHeight:1.15,marginBottom:8}}>
            {title}
          </h3>
          <p style={{fontSize:14,color:C.body,lineHeight:1.5,margin:0,fontFamily:FB}}>
            {sub}
          </p>
        </div>
        <span style={{display:'inline-flex',alignItems:'center',gap:7,color:C.blue,fontSize:13.5,fontWeight:600,fontFamily:FB}}>
          {cta} <ArrowRight size={15}/>
        </span>
      </div>
    </Link>
  );
}

function JourneySection() {
  const { t } = useLang();
  const j = t.home.journeys;
  const icons = [<HomeIcon size={22}/>, <RefreshCw size={22}/>, <Hammer size={22}/>, <CreditCard size={22}/>];
  const tos = ['/cozumler#ev-almak', '/cozumler#ev-kredimi-yenilemek', '/cozumler#tadilat-finansmani', '/cozumler#borc-odemelerini-rahatlatmak'];
  const journeys = j.items.map((it, i) => ({ icon: icons[i], title: it.title, sub: it.sub, to: tos[i] }));

  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
      <div style={{textAlign:'center',maxWidth:720,margin:'0 auto 32px'}}>
        <SectionLabel>{j.label}</SectionLabel>
        <h2 style={{fontFamily:FB,fontSize:'clamp(30px,4.5vw,42px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
          {j.title}
        </h2>
        <p style={{fontSize:15.5,color:C.body,lineHeight:1.55,marginTop:12}}>
          {j.sub}
        </p>
      </div>
      <div className="kb-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.title} {...journey} cta={t.home.journeyCardCta}/>
        ))}
      </div>
    </section>
  );
}

function WhoWeHelp({ onCTA }) {
  const { t } = useLang();
  const w = t.home.who;
  const icons = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <Landmark size={20}/>, <Wallet size={20}/>, <ShieldCheck size={20}/>];
  const images = [IMG.personaFirst, IMG.personaOwner, IMG.personaInvestor, IMG.personaSelf, IMG.personaNewcomer];
  const items = w.items.map((it, i) => ({ icon: icons[i], image: images[i], title: it.title, text: it.text }));

  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:24,marginBottom:28,flexWrap:'wrap'}}>
          <div style={{maxWidth:620}}>
            <SectionLabel>{w.label}</SectionLabel>
            <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
              {w.title}
            </h2>
          </div>
          <button onClick={onCTA} style={ghostBtn({padding:'13px 18px',display:'inline-flex',alignItems:'center',gap:8})}>
            {w.button} <ArrowRight size={16}/>
          </button>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {items.map((item) => (
            <PersonaPhotoCard
              key={item.title}
              image={item.image}
              imgAlt={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
              onClick={onCTA}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickTools() {
  const { t } = useLang();
  const q = t.home.quickTools;
  const icons = [<FileCheck size={21}/>, <Calculator size={21}/>, <Percent size={21}/>, <Landmark size={21}/>];
  const tos = ['/araclar#on-onay', '/araclar#mortgage-hesaplayici', '/araclar#uygunluk-hesaplayici', '/araclar#kapanis-masrafi'];
  const tools = q.items.map((it, i) => ({ icon: icons[i], title: it.title, sub: it.sub, to: tos[i] }));

  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
      <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'0.78fr 1.22fr',gap:28,alignItems:'center'}}>
        <div>
          <SectionLabel>{q.label}</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16,marginBottom:12}}>
            {q.title}
          </h2>
          <p style={{fontSize:15.5,color:C.body,lineHeight:1.55,marginBottom:20}}>
            {q.sub}
          </p>
          <Link to="/araclar" style={{textDecoration:'none'}}>
            <button style={primaryBtn({padding:'13px 22px',display:'inline-flex',alignItems:'center',gap:8})}>
              {q.button} <ArrowRight size={16}/>
            </button>
          </Link>
        </div>
        <div className="kb-4col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {tools.map((tool) => (
            <Link key={tool.title} to={tool.to} style={{textDecoration:'none'}}>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'20px',height:'100%'}}>
                <span style={{
                  width:44,
                  height:44,
                  borderRadius:R.icon,
                  background:'#fff',
                  border:`1px solid ${C.border}`,
                  color:C.blue,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  marginBottom:16,
                }}>
                  {tool.icon}
                </span>
                <h3 style={{fontFamily:FB,fontSize:21,color:C.navy,fontWeight:600,marginBottom:5}}>
                  {tool.title}
                </h3>
                <p style={{fontSize:13.5,color:C.muted,fontWeight:600,lineHeight:1.35}}>
                  {tool.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearnPreview() {
  const { t } = useLang();
  const lp = t.home.learnPreview;
  const icons = [<BookOpen size={20}/>, <RefreshCw size={20}/>, <Unlock size={20}/>];
  const learn = lp.items.map((it, i) => ({ icon: icons[i], title: it.title, text: it.text, to: '/ogren' }));

  return (
    <section style={{background:C.surface}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 30px'}}>
          <SectionLabel>{lp.label}</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
            {lp.title}
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {learn.map((item) => (
            <Link key={item.title} to={item.to} style={{textDecoration:'none'}}>
              <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'22px 20px',height:'100%'}}>
                <span style={{
                  width:44,
                  height:44,
                  borderRadius:R.icon,
                  background:C.blueFaint,
                  color:C.blue,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  marginBottom:16,
                }}>
                  {item.icon}
                </span>
                <h3 style={{fontFamily:FB,fontSize:22,color:C.navy,fontWeight:600,marginBottom:7}}>
                  {item.title}
                </h3>
                <p style={{fontSize:13.5,color:C.body,lineHeight:1.45,margin:0}}>
                  {item.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onCTA }) {
  const { t } = useLang();
  const f = t.home.finalCta;
  return (
    <section style={{background:C.navy}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56],textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
          <PhotoAvatar src={PEOPLE.jack.src} pos={PEOPLE.jack.pos} alt={PEOPLE.jack.alt} size={64} initials={PEOPLE.jack.initials} frame/>
          <span style={{marginLeft:-16,display:'inline-flex'}}>
            <PhotoAvatar src={PEOPLE.tara.src} pos={PEOPLE.tara.pos} alt={PEOPLE.tara.alt} size={64} initials={PEOPLE.tara.initials} frame/>
          </span>
        </div>
        <h2 style={{fontFamily:FB,fontSize:'clamp(30px,4vw,42px)',color:'#fff',fontWeight:700,lineHeight:1.12,marginBottom:14}}>
          {f.title}
        </h2>
        <p style={{fontSize:14.5,color:'rgba(255,255,255,0.72)',lineHeight:1.55,maxWidth:720,margin:'0 auto 24px'}}>
          {f.sub}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            {f.btnAccount} <ArrowRight size={18}/>
          </button>
          <Link to="/oranlar" style={{textDecoration:'none'}}>
            <button style={{
              ...ghostBtn({padding:'15px 24px',fontSize:16}),
              background:'rgba(255,255,255,0.1)',
              color:'#fff',
              border:'1px solid rgba(255,255,255,0.25)',
              display:'inline-flex',
              alignItems:'center',
              gap:8,
            }}>
              {f.btnRates} <TrendingDown size={17}/>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { openForm } = useOutletContext();
  return (
    <>
      <Hero onCTA={openForm}/>
      <div style={{...wrap,paddingTop:S[24],paddingBottom:S[24]}}>
        <TrustRow compact/>
      </div>
      <JourneySection/>
      <WhoWeHelp onCTA={openForm}/>
      <Testimonials/>
      <QuickTools/>
      <LearnPreview/>
      <AdvisorStrip onCTA={openForm}/>
      <FinalCTA onCTA={openForm}/>
    </>
  );
}
