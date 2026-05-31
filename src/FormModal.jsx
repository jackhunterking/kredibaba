import { useState } from "react";
import { X, ChevronLeft, MessageCircle, Check, ArrowRight, Lock } from "lucide-react";
import { C, FB, R, SHADOW, WA, CAL, LICENSE, BROKERAGE, btn, primaryBtn, ghostBtn, TrustRow } from "./theme.jsx";

const STEPS = [
  {
    id:'goal',
    q:'Mortgage konusunda ne yapmak istiyorsunuz?',
    sub:'Başlangıç noktanızı seçin.',
    opts:[
      {v:'buy',       e:'🏠', label:'Ev almak',      sub:'Bütçe ve ön onay'},
      {v:'renew',     e:'🔄', label:'Yenilemek',     sub:'Teklifi incele'},
      {v:'refinance', e:'💰', label:'Refinansman',   sub:'Ödeme planı'},
      {v:'heloc',     e:'🔓', label:'HELOC',         sub:'Ev değerinden kullanım'},
    ],
  },
  {
    id:'city',
    q:'Hangi bölgede işlem düşünüyorsunuz?',
    sub:'Hedef bölge.',
    opts:[
      {v:'toronto',  e:'🏙️', label:'Toronto / GTA'},
      {v:'hamilton', e:'🌊', label:'Hamilton / Burlington'},
      {v:'ottawa',   e:'🏛️', label:'Ottawa'},
      {v:'other',    e:'📍', label:'Ontario (diğer)'},
    ],
  },
  {
    id:'price',
    q:'Yaklaşık mülk değeri nedir?',
    sub:'Tahmini yeterlidir.',
    opts:[
      {v:'u500',    label:'$500,000 altı'},
      {v:'500-750', label:'$500K – $750K'},
      {v:'750-1m',  label:'$750K – $1M'},
      {v:'1m+',     label:'$1M üzeri'},
    ],
  },
  {
    id:'down',
    q:'Peşinatınız yaklaşık nedir?',
    sub:'Yuvarlak seçin.',
    opts:[
      {v:'5',   label:'%5 civarı',    sub:'Minimum'},
      {v:'10',  label:'%10 civarı'},
      {v:'20',  label:'%20 civarı'},
      {v:'20+', label:'%20 üzeri',    sub:'Daha fazla seçenek'},
    ],
  },
  {
    id:'employment',
    q:'Gelir durumunuz hangisine daha yakın?',
    sub:'Gelir türünüz.',
    note:'Belge listesi buna göre değişir.',
    opts:[
      {v:'t4',           e:'💼', label:'Maaşlı',          sub:'T4 / düzenli maaş'},
      {v:'selfemployed', e:'🧾', label:'Serbest meslek',  sub:'Şirket / contractor'},
      {v:'cash',         e:'💵', label:'Karışık gelir',   sub:'Nakit / değişken'},
      {v:'newcomer',     e:'✈️', label:'Yeni geldim',     sub:'Yeni kredi geçmişi'},
    ],
  },
  {
    id:'income',
    q:'Yıllık hane geliriniz yaklaşık nedir?',
    sub:'Yaklaşık aralık.',
    opts:[
      {v:'u50',    label:'$50,000 altı'},
      {v:'50-80',  label:'$50,000 – $80,000'},
      {v:'80-120', label:'$80,000 – $120,000'},
      {v:'120+',   label:'$120,000 üzeri'},
    ],
  },
  {
    id:'credit',
    q:'Kredi durumunuz?',
    sub:'En yakın seçeneği seçin.',
    opts:[
      {v:'great',    e:'🟢', label:'Çok iyi',        sub:'700+'},
      {v:'good',     e:'🟡', label:'İyi',            sub:'650 – 699'},
      {v:'fair',     e:'🟠', label:'Orta',           sub:'600 – 649'},
      {v:'building', e:'🔵', label:'Yeni / gelişiyor',sub:'Yeni kredi geçmişi veya düşük skor'},
    ],
  },
  {id:'contact', q:'Son adım', sub:'Size dönüş yapalım.', type:'contact'},
];

const RESULTS = {
  qualified: {
    color: C.green,
    faint: C.greenFaint,
    badge:'Güçlü başlangıç profili',
    headline:'Güçlü başlangıç.',
    sub:'Standart seçenekler incelenebilir.',
    body:'Kesin onay değildir. Belgelerinizle birlikte oran ve ürün uygunluğu incelenir.',
    cta1:'Danışma randevusu al',
    cta2:'WhatsApp ile yazın',
  },
  alternative: {
    color: C.amber,
    faint: C.amberFaint,
    badge:'Alternatif seçenekler incelenebilir',
    headline:'Alternatif yol olabilir.',
    sub:'Tek banka cevabıyla sınırlı değilsiniz.',
    body:'Gelir, kredi veya belge durumunuza göre farklı seçenekler incelenebilir.',
    cta1:'Seçenekleri inceleyelim',
    cta2:'WhatsApp ile yazın',
  },
  'not-yet': {
    color: C.blue,
    faint: C.blueFaint,
    badge:'Hazırlık planı önerilir',
    headline:'Hazırlık daha doğru olabilir.',
    sub:'Doğru sıra zaman kazandırır.',
    body:'Kredi, gelir belgesi veya peşinat için kısa bir hazırlık planı çıkarılabilir.',
    cta1:'Hazırlık planı al',
    cta2:'WhatsApp ile yazın',
  },
};

function calcResult({employment, credit}) {
  if ((employment==='t4'||employment==='selfemployed') && (credit==='great'||credit==='good')) return 'qualified';
  if (credit==='building' && (employment==='cash'||employment==='newcomer')) return 'not-yet';
  return 'alternative';
}

function ResultScreen({result, contact, onClose}) {
  const r = RESULTS[result];
  const waText = encodeURIComponent(`Merhaba Kredibaba, mortgage konusunda bilgi almak istiyorum. Adım: ${contact.name}`);
  return (
    <div style={{position:'fixed',inset:0,zIndex:1001,background:C.surface,overflow:'auto'}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{maxWidth:560,margin:'0 auto',padding:'28px 24px 80px',animation:'fadeUp .35s ease-out'}}>
        <button onClick={onClose} aria-label="Kapat"
          style={{...ghostBtn({padding:0,width:40,height:40,borderRadius:R.control}),display:'flex',alignItems:'center',justifyContent:'center',marginBottom:28,color:C.muted}}>
          <X size={18}/>
        </button>

        <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,
                     padding:'32px 28px',boxShadow:SHADOW.card}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 14px',
                       background:r.faint,border:`1px solid ${r.color}40`,borderRadius:R.chip,marginBottom:22}}>
            <span style={{width:8,height:8,borderRadius:R.circle,background:r.color}}/>
            <span style={{fontSize:12.5,fontWeight:600,color:r.color,fontFamily:FB}}>{r.badge}</span>
          </div>

          <h1 style={{fontFamily:FB,fontSize:32,color:C.navy,marginBottom:8,lineHeight:1.15,fontWeight:700}}>{r.headline}</h1>
          <p style={{fontFamily:FB,fontSize:16.5,color:r.color,marginBottom:14,fontWeight:600}}>{r.sub}</p>
          <p style={{fontSize:15,color:C.body,lineHeight:1.55,marginBottom:8}}>{r.body}</p>
        </div>

        {contact.name&&(
          <div style={{padding:'13px 16px',background:C.blueFaint,borderRadius:R.control,margin:'16px 0 24px',border:`1px solid ${C.blue}25`}}>
            <p style={{fontSize:13.5,color:C.body,margin:0}}>
              <strong style={{color:C.navy}}>{contact.name}</strong> için hazırlanan ilk değerlendirme
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

        <p style={{fontSize:12.2,color:C.muted,lineHeight:1.5,marginBottom:22,fontFamily:FB}}>
          Kredi onayı veya oran garantisi değildir.
        </p>
        <TrustRow compact/>
      </div>
    </div>
  );
}

export default function FormModal({onClose}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sel, setSel] = useState(null);
  const [result, setResult] = useState(null);
  const [contact, setContact] = useState({name:'',phone:'',email:'',lang:'tr'});
  const [err, setErr] = useState('');

  const cur = STEPS[step];
  const pct = (step / STEPS.length) * 100;

  const choose = (val) => {
    setSel(val);
    setAnswers(a=>({...a,[cur.id]:val}));
    setTimeout(() => { setSel(null); setStep(s=>s+1); }, 220);
  };
  const back = () => { if(step>0){setStep(s=>s-1); setSel(null);} else onClose(); };
  const submit = () => {
    if(!contact.name.trim()||!contact.phone.trim()){setErr('Ad soyad ve telefon zorunludur.'); return;}
    setErr('');
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
        @media(max-width:560px){.kb-modal{align-items:flex-end!important}.kb-sheet{border-radius:${R.panel}px ${R.panel}px 0 0!important;max-height:94vh!important}}
      `}</style>

      <div className="kb-modal" style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="kb-sheet" style={{width:'100%',maxWidth:500,maxHeight:'90vh',background:'#fff',borderRadius:R.panel,
                     overflow:'auto',animation:'slideUp .3s ease-out',boxShadow:SHADOW.elevated,
                     WebkitOverflowScrolling:'touch'}}>

          <div style={{position:'sticky',top:0,background:'#fff',zIndex:2,borderBottom:`1px solid ${C.borderL}`,
                       display:'flex',alignItems:'center',gap:10,padding:'16px 20px'}}>
            <button onClick={back} aria-label="Geri"
              style={{...ghostBtn({padding:0,borderRadius:R.control,width:34,height:34}),display:'flex',alignItems:'center',justifyContent:'center',color:C.muted}}>
              <ChevronLeft size={19}/>
            </button>
            <div style={{flex:1,textAlign:'center'}}>
              <span style={{fontSize:12.5,color:C.muted,fontWeight:600,fontFamily:FB}}>Ücretsiz Hesap · {step+1} / {STEPS.length}</span>
            </div>
            <button onClick={onClose} aria-label="Kapat"
              style={{...ghostBtn({padding:0,width:34,height:34,borderRadius:R.control}),display:'flex',alignItems:'center',justifyContent:'center',color:C.muted}}>
              <X size={16}/>
            </button>
          </div>

          <div style={{height:3,background:C.borderL}}>
            <div style={{height:'100%',width:`${pct}%`,background:C.blue,transition:'width .3s ease'}}/>
          </div>

          <div style={{padding:'24px 22px 12px'}}>
            <h2 style={{fontFamily:FB,fontSize:24,color:C.navy,marginBottom:6,lineHeight:1.22,fontWeight:700}}>{cur.q}</h2>
            <p style={{fontSize:13.5,color:C.muted,margin:0,lineHeight:1.55}}>{cur.sub}</p>
            {cur.note&&(
              <div style={{marginTop:14,padding:'10px 13px',background:C.blueFaint,borderRadius:R.control,
                           border:`1px solid ${C.blue}25`,display:'flex',alignItems:'center',gap:8}}>
                <Check size={15} color={C.blue}/>
                <span style={{fontSize:12.5,color:C.blueD,fontWeight:700}}>{cur.note}</span>
              </div>
            )}
          </div>

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
                      {opt.sub&&<div style={{fontSize:12.5,color:C.muted,marginTop:2,fontWeight:500}}>{opt.sub}</div>}
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
                              borderRadius:R.control,color:C.navy,fontSize:15.5,fontFamily:FB,transition:'all .15s'}}/>
                  </div>
                ))}

                <div>
                  <label style={{fontSize:12.5,color:C.body,display:'block',marginBottom:8,fontFamily:FB,fontWeight:600}}>Tercih ettiğiniz dil</label>
                  <div style={{display:'flex',gap:8}}>
                    {[{v:'tr',l:'🇹🇷 Türkçe'},{v:'en',l:'🇨🇦 English'}].map(lang=>(
                      <button key={lang.v} onClick={()=>setContact(c=>({...c,lang:lang.v}))}
                        style={{...btn({flex:1,padding:11,fontSize:13.5,borderRadius:R.control}),
                          background:contact.lang===lang.v?C.blueFaint:'#fff',
                          border:`1px solid ${contact.lang===lang.v?C.blue:C.border}`,
                          color:contact.lang===lang.v?C.blueD:C.muted,fontWeight:600}}>
                        {lang.l}
                      </button>
                    ))}
                  </div>
                </div>

                {err&&<p style={{fontSize:13,color:C.danger,margin:0,fontWeight:700}}>{err}</p>}

                <button onClick={submit}
                  style={primaryBtn({width:'100%',padding:16,fontSize:16,marginTop:2,display:'flex',alignItems:'center',justifyContent:'center',gap:8})}>
                  İlk Değerlendirmemi Göster <ArrowRight size={17}/>
                </button>
                <p style={{fontSize:12,color:C.muted,textAlign:'center',margin:0,lineHeight:1.6}}>
                  <Lock size={11} style={{verticalAlign:'-1px',marginRight:4}}/>
                  Bilgileriniz {BROKERAGE} süreci kapsamında değerlendirilir · {LICENSE}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
