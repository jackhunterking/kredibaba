import { useOutletContext, Link } from "react-router-dom";
import {
  ArrowRight, BookOpen,
  Home as HomeIcon, Landmark, PiggyBank, RefreshCw,
  ShieldCheck, TrendingDown, Unlock, Wallet,
} from "lucide-react";
import {
  C, FB, R, S, SectionLabel, SHADOW,
  ghostBtn, IMG, whatsAppBtn, WhatsAppIconBadge, wrap,
  AdvisorChip, AdvisorStrip, Testimonials, PersonaPhotoCard, PhotoAvatar, PEOPLE,
  SoftCheckBadge,
} from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import HeroRateSummary from "../components/rates/HeroRateSummary.jsx";

function Hero({ ctaHref }) {
  const { t } = useLang();
  const h = t.home.hero;

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
          <div className="kb-hero-rate-card kb-hero-rate-card--summary" style={{
            background:'#fff',
            border:`1px solid ${C.border}`,
            borderRadius:R.panel,
            boxShadow:SHADOW.elevated,
            padding:'0',
            display:'flex',
            flexDirection:'column',
            minHeight:380,
          }}>
            <HeroRateSummary
              title={t.rates.cardTitle}
              tabs={t.rates.tabs}
              ctaLabel={h.btnRates}
              ctaHref={ctaHref}
              disclosure={t.rates.disclosure}
            />
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

        <div style={{marginTop:S[16]}}>
          <SoftCheckBadge variant="card"/>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ icon, title, sub, to }) {
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
      </div>
    </Link>
  );
}

function JourneySection() {
  const { t } = useLang();
  const j = t.home.journeys;
  const icons = [<HomeIcon size={22}/>, <RefreshCw size={22}/>, <PiggyBank size={22}/>];
  const tos = ['/cozumler#yeni-mortgage', '/cozumler#yenile-tasi', '/cozumler#refinansman'];
  const journeys = j.items.map((it, i) => ({ icon: icons[i], title: it.title, sub: it.sub, to: tos[i] }));

  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
      <div style={{textAlign:'center',maxWidth:720,margin:'0 auto 32px'}}>
        {j.label ? <SectionLabel>{j.label}</SectionLabel> : null}
        <h2 style={{fontFamily:FB,fontSize:'clamp(30px,4.5vw,42px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
          {j.title}
        </h2>
        {j.sub ? (
          <p style={{fontSize:15.5,color:C.body,lineHeight:1.55,marginTop:12}}>
            {j.sub}
          </p>
        ) : null}
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.title} {...journey}/>
        ))}
      </div>
    </section>
  );
}

function WhoWeHelp({ ctaHref }) {
  const { t } = useLang();
  const w = t.home.who;
  const heading = w.label || w.title;
  const icons = [<HomeIcon size={20}/>, <RefreshCw size={20}/>, <Landmark size={20}/>, <Wallet size={20}/>, <ShieldCheck size={20}/>];
  const images = [IMG.personaFirst, IMG.personaOwner, IMG.personaInvestor, IMG.personaSelf, IMG.personaNewcomer];
  const personaLinks = t.mega.cozumler.groups[0].items.map((item) => item.href);
  const items = w.items.map((it, i) => ({ icon: icons[i], image: images[i], title: it.title, text: it.text, to: personaLinks[i] }));

  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:24,marginBottom:28,flexWrap:'wrap'}}>
          <div style={{maxWidth:620}}>
            <h2 style={{fontFamily:FB,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>
              {heading}
            </h2>
          </div>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'12px 18px',display:'inline-flex',alignItems:'center',gap:9})}>
              <WhatsAppIconBadge size={24} logoSize={17}/> {w.button} <ArrowRight size={16}/>
            </span>
          </a>
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
              to={item.to}
            />
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

function FinalCTA({ ctaHref }) {
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
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'14px 24px',fontSize:16,display:'inline-flex',alignItems:'center',gap:9})}>
              <WhatsAppIconBadge size={26} logoSize={18}/> {f.btnAccount} <ArrowRight size={18}/>
            </span>
          </a>
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
  const { getWhatsAppHref } = useOutletContext();
  const homeCtaHref = getWhatsAppHref("home");
  return (
    <>
      <Hero ctaHref={getWhatsAppHref("home-hero-rates")}/>
      <JourneySection/>
      <WhoWeHelp ctaHref={getWhatsAppHref("home-who-we-help")}/>
      <Testimonials/>
      <LearnPreview/>
      <AdvisorStrip ctaHref={getWhatsAppHref("home-advisor")}/>
      <FinalCTA ctaHref={homeCtaHref}/>
    </>
  );
}
