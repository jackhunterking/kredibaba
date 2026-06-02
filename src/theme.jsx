import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Award, Star, Linkedin, ArrowRight, X, ChevronDown, Check, Minus } from "lucide-react";
import { useLang } from "./i18n/LanguageContext.jsx";
import jackPhoto from "./assets/people/jack.jpg";
import taraPhoto from "./assets/people/tara.jpg";
import asifPhoto from "./assets/people/asif.jpg";
import equifaxMark from "./assets/equifax-logo.svg";

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
  wa:        '#25D366',
  waDark:    '#128C7E',
  waDeep:    '#075E54',
  waFaint:   '#E7F8EF',
  waText:    '#111B21',
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

// WhatsApp click-to-chat requires country code digits only.
export const WA = '16473913311';
export const TEL = '+1 647-391-3311';
export const TEL_LINK = '+16473913311';
export const CAL = 'https://calendly.com/kredibaba/danisma';
export const LICENSE = 'FSCO Licence # 10464';
export const BROKERAGE = 'RMA Mortgage';

export function buildWhatsAppUrl({ lang = 'tr', source = 'site' } = {}) {
  const page = source || 'site';
  const message = lang === 'en'
    ? `Hello Kredibaba, I would like help with a mortgage. Page: ${page}.`
    : `Merhaba Kredibaba, mortgage konusunda yardım almak istiyorum. Sayfa: ${page}.`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppLogo({ size = 20, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 175.216 175.552"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
      style={{display:'block',flexShrink:0}}
    >
      <path
        fill={C.wa}
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
      />
    </svg>
  );
}
// Localizable rate data now lives in the i18n dictionaries (t.rates.tabs / t.rates.lowestRate).

// Contextual stock imagery (Unsplash — replace with branded photography when ready)
export const IMG = {
  hero:     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80',
  toronto:  'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=80',
  interior: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80',
  keys:     'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1100&q=80',
  family:   'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=80',
  // Persona lifestyle imagery — situations, not specific people (swap for branded photography later)
  personaFirst:    'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=640&q=80', // young family + first home
  personaOwner:    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=640&q=80',     // homeowner couple at their home
  personaInvestor: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80',  // rental apartment buildings / portfolio
  personaSelf:     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=640&q=80',  // self-employed / working
  personaNewcomer: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=640&q=80',  // newcomer traveller arriving in Canada
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
export const whatsAppBtn = (extra={}) => ({
  ...btn(extra),
  background:C.wa,
  color:C.waText,
  border:`1px solid ${C.waDark}55`,
  boxShadow:'0 10px 22px rgba(37,211,102,0.22)',
});

export function WhatsAppIconBadge({ size = 24, logoSize = 18 }) {
  return (
    <span style={{
      width:size,
      height:size,
      borderRadius:R.circle,
      background:'#fff',
      display:'inline-flex',
      alignItems:'center',
      justifyContent:'center',
      flexShrink:0,
      boxShadow:'0 1px 0 rgba(7,94,84,0.12)',
    }}>
      <WhatsAppLogo size={logoSize}/>
    </span>
  );
}

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

  useEffect(() => {
    setImageFailed(false);
  }, [photo]);

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

  useEffect(() => {
    setFailed(false);
  }, [src]);

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
  const team = [PEOPLE.jack, PEOPLE.tara, PEOPLE.asif];
  return (
    <div style={{
      position:'absolute', left:16, bottom:16, right:16, maxWidth:360,
      display:'flex', alignItems:'center', gap:14,
      background:'rgba(255,255,255,0.94)', backdropFilter:'blur(6px)',
      border:`1px solid ${C.border}`, borderRadius:R.card, padding:'12px 16px', boxShadow:SHADOW.card,
    }}>
      <div style={{display:'flex', alignItems:'center', flexShrink:0}}>
        {team.map((p, i) => (
          <span key={p.alt} style={{marginLeft:i === 0 ? 0 : -14, display:'inline-flex'}}>
            <PhotoAvatar src={p.src} pos={p.pos} alt={p.alt} size={42} initials={p.initials} frame/>
          </span>
        ))}
      </div>
      <div style={{minWidth:0}}>
        <div style={{fontFamily:FB, fontSize:13.5, color:C.navy, fontWeight:700, lineHeight:1.2}}>{name}</div>
        <div style={{fontFamily:FB, fontSize:12.5, color:C.body, lineHeight:1.35, marginTop:2}}>{line}</div>
      </div>
    </div>
  );
}

// Recurring "talk to a real person" band — real Jack & Tara portraits + direct actions.
export function AdvisorStrip({ ctaHref }) {
  const { t } = useLang();
  const a = t.home.advisor;
  const href = ctaHref || buildWhatsAppUrl();
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
          <a href={href} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'12px 18px', display:'inline-flex', alignItems:'center', gap:9})}>
              <WhatsAppIconBadge size={24} logoSize={17}/> {a.btnAccount} <ArrowRight size={16}/>
            </span>
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

// Social-proof row with a lean presentation that keeps focus on the cards.
export function Testimonials() {
  const { t } = useLang();
  const ts = t.home.testimonials;
  return (
    <section style={{background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap, paddingTop:S[56], paddingBottom:S[56]}}>
        <div className="kb-3col" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
          {ts.items.map((item, i) => <TestimonialCard key={i} item={item}/>)}
        </div>
      </div>
    </section>
  );
}

// Persona card with a lifestyle photo header + the persona icon demoted to a small badge.
// Renders as a <Link>, <button>, or static <div> depending on whether navigation/click behavior is provided.
export function PersonaPhotoCard({ id, image, icon, title, text, onClick, to, imgAlt = '' }) {
  const interactive = typeof onClick === 'function' || Boolean(to);
  const baseStyle = {
    background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card, boxShadow:SHADOW.card,
    padding:0, width:'100%', cursor:interactive ? 'pointer' : 'default', textAlign:'left',
    fontFamily:FB, overflow:'hidden', display:'flex', flexDirection:'column', height:'100%',
    textDecoration:'none',
  };

  const content = (
    <>
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
    </>
  );

  if (to) {
    return (
      <Link id={id} to={to} aria-label={title} style={baseStyle}>
        {content}
      </Link>
    );
  }

  if (typeof onClick === 'function') {
    return (
      <button id={id} onClick={onClick} style={baseStyle}>
        {content}
      </button>
    );
  }

  return (
    <div id={id} style={baseStyle}>
      {content}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SOFT CREDIT CHECK — Equifax-backed trust badge + educational modal
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EQ_RED = '#AF0B2D'; // Equifax "Shiraz" brand red

// Official Equifax wordmark (white) on the brand-red plate.
export function EquifaxLogo({ height = 15 }) {
  const pad = Math.round(height * 0.62);
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      background:EQ_RED, borderRadius:6, padding:`${Math.round(height*0.5)}px ${pad}px`,
      flexShrink:0, lineHeight:0,
    }}>
      <img src={equifaxMark} alt="Equifax" style={{height, width:'auto', display:'block'}}/>
    </span>
  );
}

// Green "no impact" shield mark used as the primary trust visual.
function ShieldMark({ size = 44, tone = 'green' }) {
  const fg = tone === 'green' ? C.green : C.amber;
  const bg = tone === 'green' ? C.greenFaint : C.amberFaint;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      width:size, height:size, borderRadius:R.icon, background:bg, color:fg,
      flexShrink:0, border:`1px solid ${fg}22`,
    }}>
      <ShieldCheck size={Math.round(size*0.52)}/>
    </span>
  );
}

// Three big-number reassurance stats — high signal, low text density.
function SoftCheckStats() {
  const { t } = useLang();
  return (
    <div className="kb-3col" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
      {t.softCheck.stats.map((s, i) => (
        <div key={i} style={{
          background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card,
          padding:'18px 18px', display:'flex', flexDirection:'column', gap:6,
        }}>
          <div style={{fontFamily:FB, fontSize:34, fontWeight:800, color:C.green, lineHeight:1}}>{s.value}</div>
          <div style={{fontSize:13, color:C.body, lineHeight:1.4, fontWeight:500}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// Side-by-side soft vs hard cards — scannable, icon-led, color-coded.
function SoftCheckCompare() {
  const { t } = useLang();
  const c = t.softCheck.compare;
  const Card = ({ data, tone }) => {
    const fg = tone === 'green' ? C.green : C.amber;
    const bg = tone === 'green' ? C.greenFaint : C.amberFaint;
    return (
      <div style={{
        background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card,
        overflow:'hidden', display:'flex', flexDirection:'column',
      }}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:10,
          padding:'13px 16px', background:bg, borderBottom:`1px solid ${fg}22`,
        }}>
          <span style={{display:'flex', alignItems:'center', gap:9}}>
            <ShieldMark size={30} tone={tone}/>
            <span style={{fontFamily:FB, fontSize:15.5, fontWeight:700, color:C.navy}}>{data.name}</span>
          </span>
          <span style={{
            fontFamily:FB, fontSize:11, fontWeight:700, color:fg, background:'#fff',
            border:`1px solid ${fg}33`, borderRadius:999, padding:'4px 10px', whiteSpace:'nowrap',
          }}>{data.tag}</span>
        </div>
        <div style={{padding:'14px 16px', display:'grid', gap:10}}>
          {data.points.map((p, i) => (
            <div key={i} style={{display:'flex', gap:9, alignItems:'flex-start'}}>
              <span style={{color:fg, flexShrink:0, marginTop:1, display:'flex'}}>
                {tone === 'green' ? <Check size={15}/> : <Minus size={15}/>}
              </span>
              <span style={{fontSize:13.5, color:C.body, lineHeight:1.45}}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="kb-2col" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
      <Card data={c.soft} tone="green"/>
      <Card data={c.hard} tone="amber"/>
    </div>
  );
}

// Progressive-disclosure FAQ — only questions show until expanded.
function SoftCheckFaq({ defaultOpen = 0 }) {
  const { t } = useLang();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{display:'grid', gap:8}}>
      {t.softCheck.faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.card, overflow:'hidden',
          }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
                padding:'14px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left',
                fontFamily:FB, fontSize:14.5, fontWeight:700, color:C.navy, lineHeight:1.35,
              }}
            >
              {item.q}
              <ChevronDown size={18} color={C.muted} style={{
                flexShrink:0, transition:'transform .2s ease', transform:isOpen?'rotate(180deg)':'none',
              }}/>
            </button>
            {isOpen && (
              <p style={{fontSize:13.5, color:C.body, lineHeight:1.6, margin:0, padding:'0 16px 15px'}}>
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Full educational block (stats + comparison + FAQ) — reused on Learn page.
export function SoftCheckExplainer() {
  const { t } = useLang();
  return (
    <div style={{display:'grid', gap:22}}>
      <SoftCheckStats/>
      <div>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
          <h3 style={{fontFamily:FB, fontSize:17, fontWeight:700, color:C.navy, margin:0}}>{t.softCheck.modal.compareTitle}</h3>
          <EquifaxLogo height={13}/>
        </div>
        <SoftCheckCompare/>
      </div>
      <div>
        <h3 style={{fontFamily:FB, fontSize:17, fontWeight:700, color:C.navy, margin:'0 0 12px'}}>{t.softCheck.modal.faqTitle}</h3>
        <SoftCheckFaq/>
      </div>
    </div>
  );
}

export function SoftCheckModal({ onClose }) {
  const { t } = useLang();
  const sc = t.softCheck;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'rgba(10,37,64,0.55)', backdropFilter:'blur(3px)',
        display:'flex', alignItems:'flex-end', justifyContent:'center',
      }}
    >
      <div style={{
        background:'#fff', width:'100%', maxWidth:640,
        borderRadius:'20px 20px 0 0', maxHeight:'92dvh', overflowY:'auto',
        boxShadow:'0 -8px 40px rgba(10,37,64,0.18)',
      }}>
        {/* Sticky header */}
        <div style={{
          position:'sticky', top:0, zIndex:1, background:'#fff',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
          padding:'18px 22px 14px', borderBottom:`1px solid ${C.border}`,
        }}>
          <div style={{display:'flex', alignItems:'center', gap:11}}>
            <EquifaxLogo height={15}/>
            <h2 style={{fontFamily:FB, fontSize:18, fontWeight:700, color:C.navy, lineHeight:1.2, margin:0}}>
              {sc.modal.title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background:C.surface, border:`1px solid ${C.border}`, cursor:'pointer', color:C.body,
            display:'flex', alignItems:'center', justifyContent:'center',
            width:32, height:32, borderRadius:R.control, flexShrink:0,
          }}>
            <X size={18}/>
          </button>
        </div>

        <div style={{padding:'18px 22px 26px', display:'grid', gap:20}}>
          {/* Reassurance callout */}
          <div style={{
            display:'flex', gap:13, alignItems:'center',
            background:C.greenFaint, border:`1px solid ${C.green}22`,
            borderRadius:R.card, padding:'14px 16px',
          }}>
            <ShieldMark size={42} tone="green"/>
            <p style={{fontSize:14, color:C.navy, lineHeight:1.5, margin:0, fontWeight:500}}>{sc.modal.intro}</p>
          </div>

          <SoftCheckStats/>

          <div>
            <h3 style={{fontFamily:FB, fontSize:15.5, fontWeight:700, color:C.navy, margin:'0 0 11px'}}>{sc.modal.compareTitle}</h3>
            <SoftCheckCompare/>
          </div>

          <div>
            <h3 style={{fontFamily:FB, fontSize:15.5, fontWeight:700, color:C.navy, margin:'0 0 11px'}}>{sc.modal.faqTitle}</h3>
            <SoftCheckFaq/>
          </div>

          <button
            onClick={onClose}
            style={{
              width:'100%', padding:'14px', borderRadius:R.control,
              background:C.navy, color:'#fff', border:'none', cursor:'pointer',
              fontFamily:FB, fontSize:15, fontWeight:700,
            }}
          >
            {sc.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
}

// variant: "inline" (compact pill) | "card" (full-width trust banner)
export function SoftCheckBadge({ variant = 'card' }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const sc = t.softCheck;

  if (variant === 'inline') {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            display:'inline-flex', alignItems:'center', gap:10, width:'100%',
            background:'#fff', border:`1px solid ${C.border}`, borderRadius:R.control,
            padding:'9px 12px', boxShadow:SHADOW.card, cursor:'pointer', textAlign:'left',
          }}
        >
          <EquifaxLogo height={13}/>
          <span style={{fontSize:13, color:C.navy, fontFamily:FB, fontWeight:600, lineHeight:1.3, flex:1, minWidth:0}}>
            {sc.badge.sub}
          </span>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:4, color:C.blue,
            fontFamily:FB, fontSize:12.5, fontWeight:700, flexShrink:0, whiteSpace:'nowrap',
          }}>
            {sc.badge.learnMore} <ArrowRight size={13}/>
          </span>
        </button>
        {open && <SoftCheckModal onClose={() => setOpen(false)}/>}
      </>
    );
  }

  // card variant — horizontal banner, content fills the width (low whitespace)
  return (
    <>
      <div className="kb-softcheck-banner" style={{
        display:'flex', alignItems:'center', gap:16, flexWrap:'wrap',
        background:`linear-gradient(180deg,#fff,${C.surface})`,
        border:`1px solid ${C.border}`, borderRadius:R.card,
        padding:'14px 18px', boxShadow:SHADOW.card,
      }}>
        <ShieldMark size={46} tone="green"/>
        <div style={{flex:'1 1 280px', minWidth:0, display:'flex', flexDirection:'column', gap:3}}>
          <div style={{display:'flex', alignItems:'center', gap:9, flexWrap:'wrap'}}>
            <span style={{fontFamily:FB, fontSize:15.5, fontWeight:700, color:C.navy, lineHeight:1.2}}>{sc.badge.headline}</span>
            <span style={{
              fontFamily:FB, fontSize:11, fontWeight:700, color:C.green,
              background:C.greenFaint, border:`1px solid ${C.green}22`, borderRadius:999, padding:'3px 9px',
            }}>{sc.badge.chip}</span>
          </div>
          <span style={{fontSize:13, color:C.body, lineHeight:1.45}}>{sc.badge.sub}</span>
        </div>
        <EquifaxLogo height={15}/>
        <button
          onClick={() => setOpen(true)}
          style={{
            display:'inline-flex', alignItems:'center', gap:7, flexShrink:0,
            background:C.navy, color:'#fff', border:'none', borderRadius:R.control,
            padding:'10px 16px', cursor:'pointer', fontFamily:FB, fontSize:13.5, fontWeight:700,
          }}
        >
          {sc.badge.learnMore} <ArrowRight size={15}/>
        </button>
      </div>
      {open && <SoftCheckModal onClose={() => setOpen(false)}/>}
    </>
  );
}
