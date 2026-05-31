import { ShieldCheck, Globe, Award, Star, Linkedin } from "lucide-react";
import { useLang } from "./i18n/LanguageContext.jsx";

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

export function PersonCard({ name, role, photo, linkedin, credential, photoSize = 88 }) {
  return (
    <div style={{
      background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card,
      boxShadow:SHADOW.card, padding:'30px 24px 24px',
      display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
      height:'100%',
    }}>
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          style={{
            width:photoSize, height:photoSize, borderRadius:R.circle,
            objectFit:'cover', flexShrink:0, marginBottom:18,
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
