import { useState } from "react";
import { X, ChevronLeft, MessageCircle, Check, ArrowRight, Lock } from "lucide-react";
import { C, FB, R, SHADOW, WA, CAL, LICENSE, BROKERAGE, btn, primaryBtn, ghostBtn, TrustRow, buildWhatsAppUrl } from "./theme.jsx";
import { useLang, interp } from "./i18n/LanguageContext.jsx";

const RESULT_STYLE = {
  qualified:   { color: C.green, faint: C.greenFaint },
  alternative: { color: C.amber, faint: C.amberFaint },
  'not-yet':   { color: C.blue,  faint: C.blueFaint },
};

function calcResult({employment, credit}) {
  if ((employment==='t4'||employment==='selfemployed') && (credit==='great'||credit==='good')) return 'qualified';
  if (credit==='building' && (employment==='cash'||employment==='newcomer')) return 'not-yet';
  return 'alternative';
}

function ResultScreen({result, contact, onClose}) {
  const { t, lang } = useLang();
  const r = { ...t.form.results[result], ...RESULT_STYLE[result] };
  const waUrl = buildWhatsAppUrl({ lang });
  return (
    <div style={{position:'fixed',inset:0,zIndex:1001,background:C.surface,overflow:'auto'}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{maxWidth:560,margin:'0 auto',padding:'28px 24px 80px',animation:'fadeUp .35s ease-out'}}>
        <button onClick={onClose} aria-label={t.form.close}
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
              {t.form.resultAssessment(contact.name)}
            </p>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:24}}>
          <a href={CAL} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={primaryBtn({width:'100%',padding:'16px',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8})}>
              {r.cta1} <ArrowRight size={17}/>
            </button>
          </a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{...ghostBtn({width:'100%',padding:'16px',fontSize:16}),display:'flex',alignItems:'center',justifyContent:'center',gap:8,color:C.wa,borderColor:`${C.wa}55`}}>
              <MessageCircle size={17}/> {r.cta2}
            </button>
          </a>
        </div>

        <p style={{fontSize:12.2,color:C.muted,lineHeight:1.5,marginBottom:22,fontFamily:FB}}>
          {t.form.resultDisclaimer}
        </p>
        <TrustRow compact/>
      </div>
    </div>
  );
}

export default function FormModal({onClose}) {
  const { t, lang, setLang } = useLang();
  const STEPS = t.form.steps;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sel, setSel] = useState(null);
  const [result, setResult] = useState(null);
  const [contact, setContact] = useState({name:'',phone:'',email:''});
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
    if(!contact.name.trim()||!contact.phone.trim()){setErr(t.form.err); return;}
    setErr('');
    setResult(calcResult(answers));
  };

  if(result) return <ResultScreen result={result} contact={contact} onClose={onClose}/>;

  const fields = [
    {key:'name',  label:t.form.nameLabel,  placeholder:t.form.namePlaceholder,  type:'text'},
    {key:'phone', label:t.form.phoneLabel, placeholder:t.form.phonePlaceholder, type:'tel'},
    {key:'email', label:t.form.emailLabel, placeholder:t.form.emailPlaceholder, type:'email'},
  ];

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
            <button onClick={back} aria-label={t.form.back}
              style={{...ghostBtn({padding:0,borderRadius:R.control,width:34,height:34}),display:'flex',alignItems:'center',justifyContent:'center',color:C.muted}}>
              <ChevronLeft size={19}/>
            </button>
            <div style={{flex:1,textAlign:'center'}}>
              <span style={{fontSize:12.5,color:C.muted,fontWeight:600,fontFamily:FB}}>{t.form.headerTitle} · {step+1} / {STEPS.length}</span>
            </div>
            <button onClick={onClose} aria-label={t.form.close}
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
                {fields.map(f=>(
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
                  <label style={{fontSize:12.5,color:C.body,display:'block',marginBottom:8,fontFamily:FB,fontWeight:600}}>{t.form.langLabel}</label>
                  <div style={{display:'flex',gap:8}}>
                    {t.form.langOptions.map(opt=>(
                      <button key={opt.v} onClick={()=>setLang(opt.v)}
                        style={{...btn({flex:1,padding:11,fontSize:13.5,borderRadius:R.control}),
                          background:lang===opt.v?C.blueFaint:'#fff',
                          border:`1px solid ${lang===opt.v?C.blue:C.border}`,
                          color:lang===opt.v?C.blueD:C.muted,fontWeight:600}}>
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </div>

                {err&&<p style={{fontSize:13,color:C.danger,margin:0,fontWeight:700}}>{err}</p>}

                <button onClick={submit}
                  style={primaryBtn({width:'100%',padding:16,fontSize:16,marginTop:2,display:'flex',alignItems:'center',justifyContent:'center',gap:8})}>
                  {t.form.submit} <ArrowRight size={17}/>
                </button>
                <p style={{fontSize:12,color:C.muted,textAlign:'center',margin:0,lineHeight:1.6}}>
                  <Lock size={11} style={{verticalAlign:'-1px',marginRight:4}}/>
                  {interp(t.form.privacy, { BROKERAGE, LICENSE })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
