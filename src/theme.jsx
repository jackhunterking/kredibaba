import { useState } from "react";
import { ShieldCheck, Globe, Award, Star, Linkedin, MessageCircle, ArrowRight, Info } from "lucide-react";
import { useLang } from "./i18n/LanguageContext.jsx";
import jackPhoto from "./assets/people/jack.jpg";
import taraPhoto from "./assets/people/tara.jpg";
import asifPhoto from "./assets/people/asif.jpg";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DESIGN TOKENS — institutional / bank style (light, navy + blue)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const C = {
  bg:        '#FFFFFF',
  surface:   '#F6F8FB',
  surface2:  '#EEF3F9',
  card:      '#FFFFFF',
  navy:      '#0A2540',
  navyD:     '#06192C',
  navyM:     '#123A62',
  blue:      '#1B5FCC',
  blueD:     '#154BA3',
  blueLight: '#9FC4F0',
  blueFaint: '#EAF1FC',
  text:      '#0A2540',
  body:      '#3F4F60',
  muted:     '#69788A',
  border:    '#E2E8F0',
  borderL:   '#EDF1F6',
  green:     '#0A8754',
  greenFaint:'#E7F5EE',
  amber:     '#B7791F',
  amberFaint:'#FBF3E2',
  star:      '#E6A817',
  danger:    '#C0392B',
  wa:        '#1FA855',
};
export const R = {
  control: 8,
  chip: 8,
  icon: 12,
  card: 16,
  panel: 18,
  media: 20,
  circle: '50%',
};
export const S = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
};
export const SHADOW = {
  card: '0 8px 28px rgba(10,37,64,0.06)',
  elevated: '0 24px 50px rgba(10,37,64,0.12)',
};
export const FB = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const type = {
  hero: {
    fontFamily: FB,
    fontSize: 'clamp(38px,6vw,58px)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: 0,
  },
  pageTitle: {
    fontFamily: FB,
    fontSize: 'clamp(32px,5vw,46px)',
    fontWeight: 700,
    lineHeight: 1.18,
    letterSpacing: 0,
  },
  sectionTitle: {
    fontFamily: FB,
    fontSize: 'clamp(28px,4vw,38px)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  cardTitle: {
    fontFamily: FB,
    fontSize: 21,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  body: {
    fontFamily: FB,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  caption: {
    fontFamily: FB,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  label: {
    fontFamily: FB,
    fontSize: 12.5,
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  rate: {
    fontFamily: FB,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: 0,
  },
  legal: {
    fontFamily: FB,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.7,
  },
};

export const WA  = '14161234567';        // ← Replace with real number
export const TEL = '+14161234567';
export const CAL = 'https://calendly.com/kredibaba/danisma';
export const LICENSE = 'FSRA #XXXXX';
export const BROKERAGE = 'RMA Mortgage';
// Localizable rate data now lives in the i18n dictionaries (t.rates.heroRates / t.rates.lowestRate).

// Contextual stock imagery (Unsplash — replace with branded photography when ready)
export const IMG = {
  hero:     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80',
  toronto:  'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=80',
  interior: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80',
  keys:     'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1100&q=80',
  family:   'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=80',
  // Persona lifestyle imagery — situations, not specific people (swap for branded photography later)
  personaFirst:    'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=640&q=80', // young family + first home
  personaOwner:    'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=640&q=80',     // reviewing options at home
  personaInvestor: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=640&q=80',  // property / portfolio
  personaSelf:     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=640&q=80',  // self-employed / working
  personaNewcomer: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=640&q=80',  // community / newcomers
};

// Real photography of the people behind Kredibaba (anchors trust across the site).
// Each entry carries a focal `pos` so circular/cover crops frame the face correctly.
export const PEOPLE = {
  jack: { src: jackPhoto, alt: 'Jack Hunter', pos: 'center 20%', initials: 'JH' },
  tara: { src: taraPhoto, alt: 'Tara Hunter', pos: 'center 14%', initials: 'TH' },
  asif: { src: asifPhoto, alt: 'Asif Karimov', pos: 'center 18%', initials: 'AK' },
};

export const wrap = { maxWidth: 1120, margin: '0 auto', padding: '0 24px' };
export const sectionPad = { ...wrap, paddingTop: S[56], paddingBottom: S[56] };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUTTON HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const btn = (extra={}) => ({
  border:'none', borderRadius:R.control, cursor:'pointer', fontFamily:FB,
  fontWeight:600, fontSize:15, padding:'13px 22px', transition:'all .15s', ...extra,
});
export const primaryBtn = (extra={}) => ({ ...btn(extra), background:C.blue, color:'#fff' });
export const ghostBtn   = (extra={}) => ({ ...btn(extra), background:'#fff', color:C.navy, border:`1px solid ${C.border}` });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED PRIMITIVES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function SectionLabel({ children }) {
  return (
    <div style={{...type.label,color:C.blue,marginBottom:14}}>
      {children}
    </div>
  );
}

export function Avatar({ initials, size = 72, ring = C.blue }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:R.circle, flexShrink:0,
      background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,
      border:`2px solid ${ring}40`, color:'#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:FB, fontWeight:600, fontSize:size*0.34, letterSpacing:0,
    }}>
      {initials}
    </div>
  );
}

export function initialsFrom(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export function PersonCard({ name, role, photo, photoPos = 'center', linkedin, credential, photoSize = 88 }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = photo && !imageFailed;

  return (
    <div style={{
      background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card,
      boxShadow:SHADOW.card, padding:'30px 24px 24px',
      display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
      height:'100%',
    }}>
      {showPhoto ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          style={{
            width:photoSize, height:photoSize, borderRadius:R.circle,
            objectFit:'cover', objectPosition:photoPos, flexShrink:0, marginBottom:18,
            border:`2px solid ${C.blue}40`, background:C.surface,
          }}
        />
      ) : (
        <div style={{marginBottom:18}}>
          <Avatar initials={initialsFrom(name)} size={photoSize}/>
        </div>
      )}

      <h3 style={{...type.cardTitle, color:C.navy, marginBottom:4}}>{name}</h3>
      {role && (
        <p style={{fontSize:13, color:C.blue, fontWeight:700, fontFamily:FB, marginBottom:credential ? 8 : 16}}>
          {role}
        </p>
      )}
      {credential && (
        <p style={{fontSize:13, color:C.muted, lineHeight:1.5, fontFamily:FB, margin:'0 0 16px', maxWidth:240}}>
          {credential}
        </p>
      )}

      <a
        href={linkedin || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — LinkedIn profili`}
        style={{
          marginTop:'auto',
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'9px 16px', borderRadius:R.control,
          border:`1px solid ${C.border}`, background:C.surface,
          color:C.navy, fontFamily:FB, fontWeight:600, fontSize:13.5,
          textDecoration:'none',
        }}
      >
        <Linkedin size={16} color={C.blue}/> LinkedIn
      </a>
    </div>
  );
}

export function TrustRow({compact}) {
  const { t } = useLang();
  const icons = [<ShieldCheck size={15}/>, <Globe size={15}/>, <Award size={15}/>, <Star size={15}/>];
  const items = t.common.trust.map((text, i) => ({ icon: icons[i], text }));
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:compact?'10px 18px':'12px 28px',
                 justifyContent:compact?'flex-start':'center'}}>
      {items.map((t,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:7,color:C.body}}>
          <span style={{color:C.blue,display:'flex'}}>{t.icon}</span>
          <span style={{fontSize:13.5,fontFamily:FB,fontWeight:500}}>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

export function PageHero({ label, title, sub }) {
  return (
    <section style={{background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`,
                     borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[48],textAlign:'center',maxWidth:760}}>
        {label && <SectionLabel>{label}</SectionLabel>}
        <h1 style={{...type.pageTitle,color:C.navy,marginBottom:16}}>{title}</h1>
        {sub && <p style={{...type.body,fontSize:17,color:C.body,maxWidth:600,margin:'0 auto'}}>{sub}</p>}
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HUMAN PRESENCE — real faces + social proof to build trust
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Circular real-photo avatar with focal framing and graceful initials fallback.
export function PhotoAvatar({ src, pos = 'center', alt = '', size = 64, ring = C.blue, initials = '', frame = false }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span style={frame ? { display:'inline-flex', border:'3px solid #fff', borderRadius:R.circle, boxShadow:`0 0 0 1px ${C.border}` } : undefined}>
        <Avatar initials={initials} size={size} ring={ring}/>
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{
        width:size, height:size, borderRadius:R.circle, objectFit:'cover', objectPosition:pos,
        flexShrink:0, display:'block', background:C.surface,
        border:frame ? '3px solid #fff' : `2px solid ${ring}40`,
        boxShadow:frame ? `0 0 0 1px ${C.border}` : 'none',
      }}
    />
  );
}

// Small "this is your advisor" chip, designed to overlay a hero/feature image.
export function AdvisorChip({ name, line }) {
  return (
    <div style={{
      position:'absolute', left:16, bottom:16, right:16, maxWidth:300,
      display:'flex', alignItems:'center', gap:12,
      background:'rgba(255,255,255,0.94)', backdropFilter:'blur(6px)',
      border:`1px solid ${C.border}`, borderRadius:R.card, padding:'10px 14px', boxShadow:SHADOW.card,
    }}>
      <PhotoAvatar src={PEOPLE.jack.src} pos={PEOPLE.jack.pos} alt={name} size={46} initials={PEOPLE.jack.initials} frame/>
      <div style={{minWidth:0}}>
        <div style={{fontFamily:FB, fontSize:13.5, color:C.navy, fontWeight:700, lineHeight:1.2}}>{name}</div>
        <div style={{fontFamily:FB, fontSize:12.5, color:C.body, lineHeight:1.3, marginTop:2}}>{line}</div>
      </div>
    </div>
  );
}

// Recurring "talk to a real person" band — real Jack & Tara portraits + direct actions.
export function AdvisorStrip({ onCTA }) {
  const { t } = useLang();
  const a = t.home.advisor;
  return (
    <section style={{...wrap, paddingTop:S[16], paddingBottom:S[56]}}>
      <div style={{
        background:C.surface, border:`1px solid ${C.border}`, borderRadius:R.panel, boxShadow:SHADOW.card,
        padding:'26px 28px', display:'flex', gap:S[24], alignItems:'center', justifyContent:'space-between', flexWrap:'wrap',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:18, flex:'1 1 340px', minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', flexShrink:0}}>
            <PhotoAvatar src={PEOPLE.jack.src} pos={PEOPLE.jack.pos} alt={PEOPLE.jack.alt} size={72} initials={PEOPLE.jack.initials} frame/>
            <span style={{marginLeft:-16, display:'inline-flex'}}>
              <PhotoAvatar src={PEOPLE.tara.src} pos={PEOPLE.tara.pos} alt={PEOPLE.tara.alt} size={72} initials={PEOPLE.tara.initials} frame/>
            </span>
          </div>
          <div style={{minWidth:0}}>
            <div style={{...type.label, color:C.blue, marginBottom:6}}>{a.label}</div>
            <h3 style={{fontFamily:FB, fontSize:23, color:C.navy, fontWeight:700, lineHeight:1.2, marginBottom:6}}>{a.title}</h3>
            <p style={{fontSize:14.5, color:C.body, lineHeight:1.5, margin:0, maxWidth:460}}>{a.body}</p>
          </div>
        </div>
        <div style={{display:'flex', gap:10, flexWrap:'wrap', flex:'0 0 auto'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'13px 20px', display:'inline-flex', alignItems:'center', gap:8})}>
            {a.btnAccount} <ArrowRight size={16}/>
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={ghostBtn({padding:'13px 18px', display:'inline-flex', alignItems:'center', gap:8})}>
              <MessageCircle size={16} color={C.wa}/> {a.btnTalk}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div style={{
      background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card, boxShadow:SHADOW.card,
      padding:'24px 22px', height:'100%', display:'flex', flexDirection:'column',
    }}>
      <div style={{display:'flex', gap:3, marginBottom:14}}>
        {Array.from({length:item.rating || 5}).map((_, i) => (
          <Star key={i} size={15} color={C.star} fill={C.star}/>
        ))}
      </div>
      <p style={{fontSize:15, color:C.body, lineHeight:1.6, margin:'0 0 18px', flex:1}}>“{item.quote}”</p>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <Avatar initials={initialsFrom(item.name)} size={44}/>
        <div>
          <div style={{fontFamily:FB, fontSize:14.5, color:C.navy, fontWeight:700, lineHeight:1.2}}>{item.name}</div>
          <div style={{fontFamily:FB, fontSize:12.5, color:C.muted, marginTop:2}}>{item.persona}</div>
        </div>
      </div>
    </div>
  );
}

// Social-proof row. Renders a visible placeholder tag until real, consented stories exist (FSRA-safe).
export function Testimonials() {
  const { t } = useLang();
  const ts = t.home.testimonials;
  return (
    <section style={{background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap, paddingTop:S[56], paddingBottom:S[56]}}>
        <div style={{textAlign:'center', maxWidth:640, margin:'0 auto 14px'}}>
          <SectionLabel>{ts.label}</SectionLabel>
          <h2 style={{fontFamily:FB, fontSize:'clamp(28px,4vw,38px)', color:C.navy, fontWeight:700, lineHeight:1.16}}>{ts.title}</h2>
        </div>
        {ts.placeholderTag && (
          <div style={{display:'flex', justifyContent:'center', marginBottom:30}}>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:7,
              background:C.amberFaint, color:C.amber, border:`1px solid ${C.amber}33`,
              borderRadius:R.chip, padding:'6px 12px', fontSize:12.5, fontWeight:600, fontFamily:FB,
            }}>
              <Info size={14}/> {ts.placeholderTag}
            </span>
          </div>
        )}
        <div className="kb-3col" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
          {ts.items.map((item, i) => <TestimonialCard key={i} item={item}/>)}
        </div>
      </div>
    </section>
  );
}

// Persona card with a lifestyle photo header + the persona icon demoted to a small badge.
// Renders as a clickable <button> when `onClick` is given, otherwise a static <div> (with an id anchor).
export function PersonaPhotoCard({ id, image, icon, title, text, onClick, imgAlt = '' }) {
  const interactive = typeof onClick === 'function';
  const Tag = interactive ? 'button' : 'div';
  return (
    <Tag id={id} onClick={onClick} style={{
      background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card, boxShadow:SHADOW.card,
      padding:0, width:'100%', cursor:interactive ? 'pointer' : 'default', textAlign:'left',
      fontFamily:FB, overflow:'hidden', display:'flex', flexDirection:'column', height:'100%',
    }}>
      <div style={{position:'relative', width:'100%', aspectRatio:'16 / 10', background:C.surface2, flexShrink:0}}>
        <img src={image} alt={imgAlt} loading="lazy" style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
        <span style={{
          position:'absolute', left:14, bottom:-20, width:44, height:44, borderRadius:R.icon,
          background:'#fff', border:`1px solid ${C.border}`, boxShadow:SHADOW.card, color:C.blue,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>{icon}</span>
      </div>
      <div style={{padding:'28px 20px 22px'}}>
        <span style={{display:'block', fontFamily:FB, fontSize:20, color:C.navy, fontWeight:600, marginBottom:7, lineHeight:1.18}}>{title}</span>
        <span style={{display:'block', fontSize:13.5, color:C.body, lineHeight:1.5}}>{text}</span>
      </div>
    </Tag>
  );
}
