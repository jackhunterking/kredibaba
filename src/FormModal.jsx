import { useState } from "react";
import { X, ChevronLeft, MessageCircle, Check, ArrowRight, Lock } from "lucide-react";
import { C, FD, FB, WA, CAL, LICENSE, btn, primaryBtn, ghostBtn, TrustRow } from "./theme.jsx";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const STEPS = [
  {
    id:'goal', q:'Hangi konuda yardıma ihtiyacınız var?', sub:'How can we help?',
    opts:[
      {v:'buy',       e:'🏠', label:'Ev satın almak',        sub:'Buy a home'},
      {v:'renew',     e:'🔄', label:'Mortgage yenileme',     sub:'Renew mortgage'},
      {v:'refinance', e:'💰', label:'Refinansman',           sub:'Refinance'},
      {v:'heloc',     e:'🔓', label:'Öz sermaye (HELOC)',    sub:'Access equity'},
    ],
  },
  {
    id:'city', q:'Hangi bölgeyi düşünüyorsunuz?', sub:'Target area in Ontario',
    opts:[
      {v:'toronto',  e:'🏙️', label:'Toronto / GTA'},
      {v:'hamilton', e:'🌊', label:'Hamilton / Burlington'},
      {v:'ottawa',   e:'🏛️', label:'Ottawa'},
      {v:'other',    e:'📍', label:'Ontario (Diğer)', sub:'Other Ontario city'},
    ],
  },
  {
    id:'price', q:'Tahmini mülk değeri nedir?', sub:'Approximate property value',
    opts:[
      {v:'u500',    label:'$500,000 altı'},
      {v:'500-750', label:'$500K – $750K'},
      {v:'750-1m',  label:'$750K – $1M'},
      {v:'1m+',     label:'$1M üzeri'},
    ],
  },
  {
    id:'down', q:'Peşinat oranınız nedir?', sub:'Down payment available',
    opts:[
      {v:'5',   label:'%5 — Minimum',   sub:'Insured / CMHC mortgage'},
      {v:'10',  label:'%10'},
      {v:'20',  label:'%20'},
      {v:'20+', label:'%20 üzeri',      sub:'Conventional — more flexibility'},
    ],
  },
  {
    id:'employment', q:'Çalışma durumunuz nedir?', sub:'Employment type',
    note:'Her gelir türü için bir programımız var',
    opts:[
      {v:'t4',          e:'💼', label:'Maaşlı çalışan',          sub:'T4 salaried employee'},
      {v:'selfemployed',e:'🧾', label:'Serbest meslek',           sub:'Self-employed / incorporated'},
      {v:'cash',        e:'💵', label:'Nakit / karışık gelir',    sub:'Cash or mixed income'},
      {v:'newcomer',    e:'✈️', label:"Kanada'ya yeni geldim",    sub:'New to Canada (< 2 years)'},
    ],
  },
  {
    id:'income', q:'Yıllık hane geliriniz nedir?', sub:'Annual household income',
    opts:[
      {v:'u50',    label:'$50,000 altı'},
      {v:'50-80',  label:'$50,000 – $80,000'},
      {v:'80-120', label:'$80,000 – $120,000'},
      {v:'120+',   label:'$120,000 üzeri'},
    ],
  },
  {
    id:'credit', q:'Kredi notunuz yaklaşık nedir?', sub:'Approximate credit score',
    opts:[
      {v:'great',   e:'🟢', label:'Çok iyi',         sub:'700+'},
      {v:'good',    e:'🟡', label:'İyi',             sub:'650 – 699'},
      {v:'fair',    e:'🟠', label:'Orta',            sub:'600 – 649'},
      {v:'building',e:'🔵', label:'Henüz oluşuyor',  sub:'Under 600 / New credit'},
    ],
  },
  {id:'contact', q:'Son bir adım kaldı', sub:'Ücretsiz danışma — yükümlülük yok', type:'contact'},
];

const RESULTS = {
  qualified: {
    color: C.green, faint: C.greenFaint,
    badge:'A Lender · En düşük oran kademesi',
    headline:'Güçlü bir profiliniz var.',
    sub:'Büyük ihtimalle ön onay alabilirsiniz.',
    body:"Profiliniz standart A lender kriterleriyle uyumlu. Uzmanımız en güncel oranları karşılaştırıp ön onay sürecinizi başlatacak — ortalama 3–5 iş günü.",
    cta1:'Randevu Al', cta2:'WhatsApp ile yazın',
  },
  alternative: {
    color: C.amber, faint: C.amberFaint,
    badge:'B Lender · Alternatif çözüm',
    headline:'Size uygun bir yol var.',
    sub:'Banka reddetse de seçenekleriniz var.',
    body:"Profiliniz B lender veya alternatif belgeli programlara uygun. Başlangıçta oran biraz daha yüksek olabilir; 12–24 ay içinde A lender'a geçiş planı hazırlıyoruz.",
    cta1:'Ücretsiz danışma', cta2:'WhatsApp ile yazın',
  },
  'not-yet': {
    color: C.blue, faint: C.blueFaint,
    badge:'Hazırlık planı · 6–12 ay',
    headline:'Birlikte hazırlanalım.',
    sub:'Henüz hazır değilsiniz — ama yakında olacaksınız.',
    body:"Size özel 6–12 aylık mortgage hazırlık planı oluşturuyoruz: kredi notu, borç stratejisi ve peşinat — her adımda Türkçe destek. Hazır olduğunuzda ilk arayan biz oluruz.",
    cta1:'Plan için görüşelim', cta2:'WhatsApp ile yazın',
  },
};

function calcResult({employment, credit}) {
  if ((employment==='t4'||employment==='selfemployed') && (credit==='great'||credit==='good')) return 'qualified';
  if (credit==='building' && (employment==='cash'||employment==='newcomer')) return 'not-yet';
  return 'alternative';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESULT SCREEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ResultScreen({result, contact, onClose}) {
  const r = RESULTS[result];
  const waText = encodeURIComponent(`Merhaba Kredibaba, bilgi almak istiyorum. Adım: ${contact.name}`);
  return (
    <div style={{position:'fixed',inset:0,zIndex:1001,background:C.surface,overflow:'auto'}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{maxWidth:540,margin:'0 auto',padding:'28px 24px 80px',animation:'fadeUp .35s ease-out'}}>
        <button onClick={onClose} aria-label="Kapat"
          style={{...ghostBtn({padding:0,width:40,height:40,borderRadius:'50%'}),display:'flex',alignItems:'center',justifyContent:'center',marginBottom:28,color:C.muted}}>
          <X size={18}/>
        </button>

        <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,
                     padding:'32px 28px',boxShadow:'0 4px 24px rgba(10,37,64,0.06)'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 14px',
                       background:r.faint,border:`1px solid ${r.color}40`,borderRadius:999,marginBottom:22}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:r.color}}/>
            <span style={{fontSize:12.5,fontWeight:600,color:r.color,fontFamily:FB}}>{r.badge}</span>
          </div>

          <h1 style={{fontFamily:FD,fontSize:32,color:C.navy,marginBottom:8,lineHeight:1.15,fontWeight:500}}>{r.headline}</h1>
          <p style={{fontFamily:FB,fontSize:17,color:r.color,marginBottom:18,fontWeight:600}}>{r.sub}</p>
          <p style={{fontSize:15.5,color:C.body,lineHeight:1.7,marginBottom:8}}>{r.body}</p>
        </div>

        {contact.name&&(
          <div style={{padding:'13px 16px',background:C.blueFaint,borderRadius:10,margin:'16px 0 24px',border:`1px solid ${C.blue}25`}}>
            <p style={{fontSize:13.5,color:C.body,margin:0}}>
              <strong style={{color:C.navy}}>{contact.name}</strong> için hazırlanan değerlendirme
            </p>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:24}}>
          <a href={CAL} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={primaryBtn({width:'100%',padding:'16px',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8})}>
              {r.cta1} <ArrowRight size={17}/>
            </button>
          </a>
          <a href={`https://wa.me/${WA}?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{...ghostBtn({width:'100%',padding:'16px',fontSize:16}),display:'flex',alignItems:'center',justifyContent:'center',gap:8,color:C.wa,borderColor:`${C.wa}55`}}>
              <MessageCircle size={17}/> {r.cta2}
            </button>
          </a>
        </div>

        <TrustRow compact/>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function FormModal({onClose}) {
  const [step,   setStep]    = useState(0);
  const [answers,setAnswers] = useState({});
  const [sel,    setSel]     = useState(null);
  const [result, setResult]  = useState(null);
  const [contact,setContact] = useState({name:'',phone:'',email:'',lang:'tr'});
  const [err,    setErr]     = useState('');

  const cur = STEPS[step];
  const pct = (step / STEPS.length) * 100;

  const choose = (val) => {
    setSel(val);
    setAnswers(a=>({...a,[cur.id]:val}));
    setTimeout(() => { setSel(null); setStep(s=>s+1); }, 240);
  };
  const back = () => { if(step>0){setStep(s=>s-1); setSel(null);} else onClose(); };
  const submit = () => {
    if(!contact.name.trim()||!contact.phone.trim()){setErr('Ad ve telefon zorunludur.'); return;}
    setErr('');
    // TODO: POST to /api/leads with answers + contact
    setResult(calcResult(answers));
  };

  if(result) return <ResultScreen result={result} contact={contact} onClose={onClose}/>;

  return (
    <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(6,25,44,0.55)',backdropFilter:'blur(3px)',
                 display:'flex',alignItems:'center',justifyContent:'center'}}
         onClick={e=>e.target===e.currentTarget&&onClose()}>
      <style>{`
        @keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
        .opt-btn{transition:all .14s}
        .opt-btn:hover{border-color:${C.blue}!important;background:${C.blueFaint}!important}
        .opt-btn:active{transform:scale(0.99)}
        .kb-input:focus{border-color:${C.blue}!important;outline:none;box-shadow:0 0 0 3px ${C.blueFaint};}
        .kb-input::placeholder{color:${C.muted};}
        @media(max-width:560px){.kb-modal{align-items:flex-end!important}.kb-sheet{border-radius:18px 18px 0 0!important;max-height:94vh!important}}
      `}</style>

      <div className="kb-modal" style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="kb-sheet" style={{width:'100%',maxWidth:480,maxHeight:'90vh',background:'#fff',borderRadius:18,
                   overflow:'auto',animation:'slideUp .3s ease-out',boxShadow:'0 24px 60px rgba(6,25,44,0.35)',
                   WebkitOverflowScrolling:'touch'}}>

        {/* Top bar */}
        <div style={{position:'sticky',top:0,background:'#fff',zIndex:2,borderBottom:`1px solid ${C.borderL}`,
                     display:'flex',alignItems:'center',gap:10,padding:'16px 20px'}}>
          <button onClick={back} aria-label="Geri"
            style={{...ghostBtn({padding:0,borderRadius:'50%',width:34,height:34}),display:'flex',alignItems:'center',justifyContent:'center',color:C.muted}}>
            <ChevronLeft size={19}/>
          </button>
          <div style={{flex:1,textAlign:'center'}}>
            <span style={{fontSize:12.5,color:C.muted,fontWeight:600,fontFamily:FB}}>Adım {step+1} / {STEPS.length}</span>
          </div>
          <button onClick={onClose} aria-label="Kapat"
            style={{...ghostBtn({padding:0,width:34,height:34,borderRadius:'50%'}),display:'flex',alignItems:'center',justifyContent:'center',color:C.muted}}>
            <X size={16}/>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{height:3,background:C.borderL}}>
          <div style={{height:'100%',width:`${pct}%`,background:C.blue,transition:'width .3s ease'}}/>
        </div>

        {/* Question */}
        <div style={{padding:'24px 22px 12px'}}>
          <h2 style={{fontFamily:FD,fontSize:23,color:C.navy,marginBottom:5,lineHeight:1.22,fontWeight:500}}>{cur.q}</h2>
          <p style={{fontSize:13.5,color:C.muted,margin:0}}>{cur.sub}</p>
          {cur.note&&(
            <div style={{marginTop:14,padding:'10px 13px',background:C.blueFaint,borderRadius:8,
                         border:`1px solid ${C.blue}25`,display:'flex',alignItems:'center',gap:8}}>
              <Check size={15} color={C.blue}/>
              <span style={{fontSize:12.5,color:C.blueD,fontWeight:500}}>{cur.note}</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div style={{padding:'4px 22px 30px'}}>
          {cur.type!=='contact' ? (
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {cur.opts.map(opt=>(
                <button key={opt.v} className="opt-btn" onClick={()=>choose(opt.v)}
                  style={{...btn({width:'100%',padding:'15px 16px',textAlign:'left',fontSize:15}),
                    background: sel===opt.v ? C.blueFaint : '#fff',
                    border: `1px solid ${sel===opt.v ? C.blue : C.border}`,
                    display:'flex', alignItems:'center', gap:13}}>
                  {opt.e&&<span style={{fontSize:21,flexShrink:0}}>{opt.e}</span>}
                  <div style={{flex:1}}>
                    <div style={{color:C.navy,fontWeight:600}}>{opt.label}</div>
                    {opt.sub&&<div style={{fontSize:12.5,color:C.muted,marginTop:2,fontWeight:400}}>{opt.sub}</div>}
                  </div>
                  {sel===opt.v&&<Check size={17} color={C.blue}/>}
                </button>
              ))}
            </div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:15}}>
              {[
                {key:'name',  label:'Ad Soyad',                         placeholder:'Adınız ve soyadınız', type:'text'},
                {key:'phone', label:'Telefon (WhatsApp tercih edilir)', placeholder:'+1 (416) 000 0000',   type:'tel'},
                {key:'email', label:'E-posta (isteğe bağlı)',           placeholder:'ornek@email.com',     type:'email'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{fontSize:12.5,color:C.body,display:'block',marginBottom:6,fontFamily:FB,fontWeight:600}}>{f.label}</label>
                  <input className="kb-input" type={f.type} placeholder={f.placeholder}
                    value={contact[f.key]}
                    onChange={e=>setContact(c=>({...c,[f.key]:e.target.value}))}
                    style={{width:'100%',padding:'13px 14px',background:'#fff',border:`1px solid ${C.border}`,
                            borderRadius:9,color:C.navy,fontSize:15.5,fontFamily:FB,transition:'all .15s'}}/>
                </div>
              ))}

              <div>
                <label style={{fontSize:12.5,color:C.body,display:'block',marginBottom:8,fontFamily:FB,fontWeight:600}}>Tercih ettiğiniz dil</label>
                <div style={{display:'flex',gap:8}}>
                  {[{v:'tr',l:'🇹🇷 Türkçe'},{v:'en',l:'🇨🇦 English'}].map(lang=>(
                    <button key={lang.v} onClick={()=>setContact(c=>({...c,lang:lang.v}))}
                      style={{...btn({flex:1,padding:11,fontSize:13.5,borderRadius:9}),
                        background:contact.lang===lang.v?C.blueFaint:'#fff',
                        border:`1px solid ${contact.lang===lang.v?C.blue:C.border}`,
                        color:contact.lang===lang.v?C.blueD:C.muted,fontWeight:600}}>
                      {lang.l}
                    </button>
                  ))}
                </div>
              </div>

              {err&&<p style={{fontSize:13,color:'#C0392B',margin:0,fontWeight:500}}>{err}</p>}

              <button onClick={submit}
                style={primaryBtn({width:'100%',padding:16,fontSize:16,marginTop:2,display:'flex',alignItems:'center',justifyContent:'center',gap:8})}>
                Değerlendirmemi Göster <ArrowRight size={17}/>
              </button>
              <p style={{fontSize:12,color:C.muted,textAlign:'center',margin:0,lineHeight:1.6}}>
                <Lock size={11} style={{verticalAlign:'-1px',marginRight:4}}/>
                Bilgileriniz güvende · {LICENSE} · Komisyonsuz danışma
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
