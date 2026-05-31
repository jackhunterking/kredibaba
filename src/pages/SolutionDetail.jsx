import { useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Building2,
  FileCheck,
  Home as HomeIcon,
  MessageCircle,
  Scale,
  Search,
} from "lucide-react";
import { C, FB, IMG, R, S, SHADOW, primaryBtn, wrap } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import SharedRateCard from "../components/rates/SharedRateCard.jsx";

const IMAGE_BY_KEY = {
  family: IMG.family,
  hero: IMG.hero,
  interior: IMG.interior,
  keys: IMG.keys,
  personaFirst: IMG.personaFirst,
  personaInvestor: IMG.personaInvestor,
  personaNewcomer: IMG.personaNewcomer,
  personaOwner: IMG.personaOwner,
  personaSelf: IMG.personaSelf,
};

const ICON_BY_KEY = {
  approvals: <FileCheck size={22}/>,
  buyingPower: <HomeIcon size={22}/>,
  insights: <Building2 size={22}/>,
  qualify: <Scale size={22}/>,
  quotes: <Search size={22}/>,
  savings: <Banknote size={22}/>,
  support: <MessageCircle size={22}/>,
};

function UnderlinedTitle({ title, underlineText }) {
  const index = title.indexOf(underlineText);
  if (index === -1) return title;

  const before = title.slice(0, index);
  const match = title.slice(index, index + underlineText.length);
  const after = title.slice(index + underlineText.length);

  return (
    <>
      {before}
      <span style={{boxShadow:`inset 0 -0.18em 0 ${C.blueLight}99`}}>
        {match}
      </span>
      {after}
    </>
  );
}

function BenefitCard({ card }) {
  const image = IMAGE_BY_KEY[card.imageKey] || IMG.hero;
  const icon = ICON_BY_KEY[card.iconKey] || ICON_BY_KEY.buyingPower;

  return (
    <div style={{
      background:'#fff',
      border:`1px solid ${C.border}`,
      borderRadius:R.card,
      boxShadow:SHADOW.card,
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      height:'100%',
    }}>
      <div style={{position:'relative', aspectRatio:'16 / 10', background:C.surface2}}>
        <img
          src={image}
          alt={card.title}
          loading="lazy"
          style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}
        />
        <span style={{
          position:'absolute',
          left:18,
          bottom:-28,
          width:56,
          height:56,
          borderRadius:R.circle,
          background:'#fff',
          border:`1px solid ${C.border}`,
          boxShadow:SHADOW.card,
          color:C.blue,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
        }}>
          {icon}
        </span>
      </div>
      <div style={{padding:'40px 24px 26px'}}>
        <h2 style={{fontFamily:FB,fontSize:17,color:C.navy,fontWeight:600,lineHeight:1.24,marginBottom:10}}>
          {card.title}
        </h2>
        <p style={{fontSize:14.5,color:C.body,lineHeight:1.55,margin:0}}>
          {card.text}
        </p>
      </div>
    </div>
  );
}

export default function SolutionDetail({ slug }) {
  const { openForm } = useOutletContext();
  const { t } = useLang();
  const page = t.solutionPages?.[slug];

  if (!page) return null;

  return (
    <>
      <section style={{background:'#fff'}}>
        <div style={{...wrap,paddingTop:S[64] + 8,paddingBottom:S[64],maxWidth:900,textAlign:'center'}}>
          <h1 style={{
            fontFamily:FB,
            fontSize:'clamp(38px,6vw,58px)',
            color:C.navy,
            fontWeight:700,
            lineHeight:1.08,
            letterSpacing:'-0.03em',
            marginBottom:20,
          }}>
            <UnderlinedTitle title={page.hero.title} underlineText={page.hero.underlineText}/>
          </h1>
          <p style={{
            maxWidth:860,
            margin:'0 auto 28px',
            fontSize:'clamp(18px,2vw,22px)',
            color:C.body,
            lineHeight:1.45,
          }}>
            {page.hero.sub}
          </p>
          <button
            onClick={openForm}
            style={primaryBtn({padding:'14px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}
          >
            {page.hero.ctaLabel} <ArrowRight size={18}/>
          </button>
        </div>
      </section>

      <section style={{background:`linear-gradient(180deg,#fff 0%,#fff 16%,${C.blueFaint} 16%,${C.blueFaint} 100%)`}}>
        <div style={{...wrap,paddingTop:S[24],paddingBottom:S[64]}}>
          <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:40}}>
            {page.cards.map((card) => (
              <BenefitCard key={card.title} card={card}/>
            ))}
          </div>

          <div style={{
            maxWidth:1020,
            margin:'0 auto',
          }}>
            <SharedRateCard
              title={t.rates.cardTitle}
              tabs={t.rates.tabs}
              ctaLabel={page.ratePanel.ctaLabel}
              onCta={openForm}
              disclosure={t.rates.disclosure}
            />
          </div>
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[32],paddingBottom:S[64]}}>
        <div style={{
          background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,
          borderRadius:R.panel,
          padding:'34px 30px',
          color:'#fff',
        }}>
          <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:22,alignItems:'center'}}>
            <div>
              <h2 style={{fontFamily:FB,fontSize:'clamp(26px,4vw,34px)',fontWeight:700,lineHeight:1.14,marginBottom:10}}>
                {page.finalCta.title}
              </h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.76)',lineHeight:1.55,margin:0,maxWidth:680}}>
                {page.finalCta.sub}
              </p>
            </div>
            <button
              onClick={openForm}
              style={primaryBtn({padding:'14px 24px',fontSize:15.5,display:'inline-flex',alignItems:'center',gap:8,whiteSpace:'nowrap'})}
            >
              {page.finalCta.ctaLabel} <ArrowRight size={17}/>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
