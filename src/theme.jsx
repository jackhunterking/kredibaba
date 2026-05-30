import { ShieldCheck, Globe, Award, Star } from "lucide-react";

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
export const FD = "'Fraunces', Georgia, serif";
export const FB = "'Inter', system-ui, sans-serif";

export const WA  = '14161234567';        // ← Replace with real number
export const TEL = '+14161234567';
export const CAL = 'https://calendly.com/kredibaba/danisma';
export const LICENSE = 'FSRA #XXXXX';
export const BROKERAGE = 'RMA Mortgage';
export const LOWEST_RATE = {
  rate: '3.89%',
  term: '5 yıl sabit',
  product: 'Sigortalı mortgage',
  updated: '30 Mayıs 2026',
  note: 'Yalnızca güçlü kredi, uygun gelir ve lender koşullarını sağlayan dosyalar için örnek gösterge orandır.',
};
export const HERO_RATES = [
  {
    label: 'Sabit oran',
    term: LOWEST_RATE.term,
    rate: LOWEST_RATE.rate,
    product: LOWEST_RATE.product,
    updated: LOWEST_RATE.updated,
    note: LOWEST_RATE.note,
    qualification: 'Güçlü kredi, doğrulanabilir gelir, uygun mülk ve lender koşulları gerekir.',
  },
  {
    label: 'Değişken oran',
    term: '5 yıl değişken',
    rate: 'Güncelleniyor',
    product: 'Değişken mortgage',
    updated: LOWEST_RATE.updated,
    note: 'Onaylı değişken oran verisi geldiğinde yayınlanır; örnek oran uydurulmaz.',
    qualification: 'Prime oranı, lender indirimi ve dosya koşulları kişiye göre değişebilir.',
  },
];

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
    <div style={{fontSize:12.5,fontWeight:600,letterSpacing:'1.4px',textTransform:'uppercase',
                 color:C.blue,fontFamily:FB,marginBottom:14}}>
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
      fontFamily:FD, fontWeight:600, fontSize:size*0.34, letterSpacing:'0.5px',
    }}>
      {initials}
    </div>
  );
}

export function TrustRow({compact}) {
  const items=[
    {icon:<ShieldCheck size={15}/>, text:'FSRA Lisanslı Mortgage Aracılığı'},
    {icon:<Globe size={15}/>,       text:'Türkçe & İngilizce Destek'},
    {icon:<Award size={15}/>,       text:'Birden Fazla Lender Karşılaştırması'},
    {icon:<Star size={15}/>,        text:'Şeffaf Oran ve Süreç Takibi'},
  ];
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
        <h1 style={{fontFamily:FD,fontSize:'clamp(32px,5vw,46px)',fontWeight:500,color:C.navy,
                    lineHeight:1.12,letterSpacing:'-0.5px',marginBottom:16}}>{title}</h1>
        {sub && <p style={{fontSize:17.5,color:C.body,lineHeight:1.6,maxWidth:600,margin:'0 auto'}}>{sub}</p>}
      </div>
    </section>
  );
}
