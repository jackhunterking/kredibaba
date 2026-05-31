import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Info, LayoutDashboard } from "lucide-react";
import { C, FB, R, SHADOW, primaryBtn } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../app/AuthContext.jsx";
import LanguageToggle from "../components/LanguageToggle.jsx";
import kredibabaMark from "../assets/kredibaba-mark.svg";

// Canadian lender marks — brand-coloured tiles, single row (mirrors the reference strip).
const LENDERS = [
  { abbr: "TD",     bg: "#008A00" },
  { abbr: "RBC",    bg: "#0061A8" },
  { abbr: "Scotia", bg: "#EC111A" },
  { abbr: "BMO",    bg: "#0079C1" },
  { abbr: "CIBC",   bg: "#B3122B" },
  { abbr: "EQ",     bg: "#5C2D91" },
  { abbr: "First",  bg: "#1B365D" },
  { abbr: "CWB",    bg: "#00833E" },
];

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function LenderTile({ abbr, bg }) {
  const fs = abbr.length <= 2 ? 15 : abbr.length === 3 ? 13 : 10.5;
  return (
    <div style={{
      width:47,height:47,flexShrink:0,borderRadius:11,background:bg,
      display:'flex',alignItems:'center',justifyContent:'center',
      color:'#fff',fontWeight:800,fontSize:fs,letterSpacing:'.01em',
      fontFamily:FB,boxShadow:'0 1px 2px rgba(10,37,64,.12)',
    }}>
      {abbr}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{display:'block'}}>
      <span style={{display:'block',fontSize:13,fontWeight:600,color:C.navy,marginBottom:6,fontFamily:FB}}>
        {label} <span style={{color:C.danger}}>*</span>
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  width:'100%',
  boxSizing:'border-box',
  padding:'12px 14px',
  fontSize:15,
  fontFamily:FB,
  color:C.navy,
  background:'#fff',
  border:`1px solid ${C.border}`,
  borderRadius:R.control,
  outline:'none',
};

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:'11px 12px',fontSize:15,fontWeight:700,fontFamily:FB,cursor:'pointer',
        border:'none',borderRadius:8,transition:'all .15s',
        background:active ? C.blue : 'transparent',
        color:active ? '#fff' : C.muted,
        boxShadow:active ? '0 1px 3px rgba(27,95,204,.35)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

export default function Auth({ mode = "sign-up" }) {
  const { t } = useLang();
  const a = t.auth;
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle, startDemo, isConfigured } = useAuth();
  const isSignUp = mode === "sign-up";
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) { setErr(a.notConfigured); return; }
    setBusy(true); setErr(""); setInfo("");
    try {
      if (isSignUp) {
        const { data, error } = await signUp(form);
        if (error) throw error;
        if (!data.session) { setInfo(a.confirmEmail); setBusy(false); return; }
      } else {
        const { error } = await signIn(form);
        if (error) throw error;
      }
      navigate("/app");
    } catch (e2) {
      setErr(e2?.message || a.genericError);
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    if (!isConfigured) { setErr(a.notConfigured); return; }
    setErr(""); setInfo("");
    const { error } = await signInWithGoogle();
    if (error) setErr(error.message);
    // On success Supabase redirects to Google, so no navigate() here.
  };

  const handlePreview = () => {
    startDemo();
    navigate("/app");
  };

  const termsBits = a.terms.split(/\{terms\}|\{privacy\}/);

  return (
    <div style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',
      background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`,fontFamily:FB,
    }}>
      {/* Slim top bar */}
      <div style={{
        display:'flex',alignItems:'center',justifyContent:'flex-end',
        padding:'18px 28px',
      }}>
        <LanguageToggle />
      </div>

      {/* Centered content */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px 24px 48px'}}>
        <div className="kb-auth-grid" style={{
          width:'100%',maxWidth:1040,
          display:'grid',gridTemplateColumns:'minmax(0,400px) minmax(0,1fr)',
          gap:48,alignItems:'center',
        }}>
          {/* ── Left: form card ── */}
          <div style={{
            background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.panel,
            boxShadow:SHADOW.card,padding:'30px',
          }}>
            {/* Tabs */}
            <div style={{
              display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,
              background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:5,marginBottom:22,
            }}>
              <TabButton active={isSignUp} onClick={() => navigate("/auth/sign-up")}>{a.tabSignUp}</TabButton>
              <TabButton active={!isSignUp} onClick={() => navigate("/auth/sign-in")}>{a.tabSignIn}</TabButton>
            </div>

            {/* Google */}
            <button type="button" onClick={handleGoogle} style={{
              width:'100%',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
              padding:'12px 16px',fontSize:14.5,fontWeight:600,fontFamily:FB,color:C.navy,
              background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.control,cursor:'pointer',
            }}>
              <GoogleIcon/> {a.google}
            </button>

            <button type="button" onClick={handlePreview} style={{
              width:'100%',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
              padding:'12px 16px',fontSize:14.5,fontWeight:700,fontFamily:FB,color:C.blue,
              background:C.blueFaint,border:`1px solid ${C.blueLight}`,borderRadius:R.control,cursor:'pointer',
              marginTop:10,
            }}>
              <LayoutDashboard size={18}/> {a.previewDashboard}
            </button>

            {/* Divider */}
            <div style={{display:'flex',alignItems:'center',gap:12,margin:'18px 0'}}>
              <span style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontSize:12.5,color:C.muted,fontWeight:600}}>{a.or}</span>
              <span style={{flex:1,height:1,background:C.border}}/>
            </div>

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:15}}>
              {isSignUp && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <Field label={a.firstName}>
                    <input style={inputStyle} placeholder={a.firstNamePlaceholder} autoComplete="given-name"
                      value={form.firstName} onChange={setField('firstName')}/>
                  </Field>
                  <Field label={a.lastName}>
                    <input style={inputStyle} placeholder={a.lastNamePlaceholder} autoComplete="family-name"
                      value={form.lastName} onChange={setField('lastName')}/>
                  </Field>
                </div>
              )}

              <Field label={a.email}>
                <input style={inputStyle} type="email" placeholder={a.emailPlaceholder} autoComplete="email"
                  value={form.email} onChange={setField('email')}/>
              </Field>

              <div>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:600,color:C.navy}}>{a.password} <span style={{color:C.danger}}>*</span></span>
                  <span title={a.passwordHint} style={{display:'inline-flex',color:C.muted,cursor:'help'}}><Info size={14}/></span>
                </div>
                <div style={{position:'relative'}}>
                  <input
                    style={{...inputStyle,paddingRight:52}}
                    type={showPw ? "text" : "password"}
                    placeholder={a.passwordPlaceholder}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    value={form.password}
                    onChange={setField('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? a.hidePassword : a.showPassword}
                    style={{
                      position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',
                      display:'inline-flex',alignItems:'center',justifyContent:'center',
                      width:36,height:36,borderRadius:8,border:'none',
                      background:C.blue,color:'#fff',cursor:'pointer',
                    }}
                  >
                    {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {!isSignUp && (
                  <div style={{textAlign:'right',marginTop:8}}>
                    <Link to="/auth/sign-in" style={{fontSize:12.5,color:C.blue,fontWeight:600,textDecoration:'none'}}>{a.forgot}</Link>
                  </div>
                )}
              </div>

              {err && (
                <p style={{fontSize:13,color:C.danger,fontWeight:600,margin:0,lineHeight:1.5}}>{err}</p>
              )}
              {info && (
                <p style={{fontSize:13,color:C.green,fontWeight:600,margin:0,lineHeight:1.5,
                           padding:'10px 12px',background:C.greenFaint,borderRadius:R.control}}>{info}</p>
              )}

              <button type="submit" disabled={busy}
                style={primaryBtn({width:'100%',padding:'13px 16px',fontSize:15,marginTop:4,opacity:busy?0.7:1,cursor:busy?'default':'pointer'})}>
                {busy ? '…' : (isSignUp ? a.submitSignUp : a.submitSignIn)}
              </button>
            </form>

            {isSignUp && (
              <p style={{fontSize:12.5,lineHeight:1.6,color:C.muted,textAlign:'center',margin:'18px 0 0'}}>
                {termsBits[0]}
                <Link to="/kullanim-sartlari" style={{color:C.blue,fontWeight:600,textDecoration:'none'}}>{a.termsLink}</Link>
                {termsBits[1]}
                <Link to="/gizlilik" style={{color:C.blue,fontWeight:600,textDecoration:'none'}}>{a.privacyLink}</Link>
                {termsBits[2]}
              </p>
            )}
          </div>

          {/* ── Right: brand panel ── */}
          <div className="kb-auth-brand">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <img src={kredibabaMark} alt="" aria-hidden="true" style={{width:42,height:42}}/>
              <span style={{display:'inline-flex',alignItems:'baseline',gap:1}}>
                <span style={{fontFamily:FB,fontSize:32,fontWeight:700,color:C.navy}}>Kredi</span>
                <span style={{fontFamily:FB,fontSize:32,fontWeight:700,color:C.blue}}>baba</span>
              </span>
            </div>
            <div style={{
              display:'inline-block',fontSize:21,fontWeight:700,color:C.navy,
              boxShadow:`inset 0 -11px 0 ${C.blueFaint}`,marginBottom:30,
            }}>
              {a.tagline}
            </div>

            {/* Lenders card */}
            <div style={{
              background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,
              boxShadow:SHADOW.card,padding:'24px',marginBottom:18,
            }}>
              <div style={{textAlign:'center',fontSize:16.5,fontWeight:700,color:C.blue,lineHeight:1.35,marginBottom:20}}>
                {a.ratesTitle}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:8}}>
                {LENDERS.map((l) => <LenderTile key={l.abbr} {...l}/>)}
              </div>
            </div>

            {/* Soft credit card */}
            <div style={{
              background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,
              boxShadow:SHADOW.card,padding:'22px 24px',display:'flex',alignItems:'center',gap:18,
            }}>
              <div style={{
                flexShrink:0,width:62,height:62,borderRadius:R.circle,
                background:'#9B1B30',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                color:'#fff',lineHeight:1,
              }}>
                <span style={{fontSize:8,fontWeight:800,letterSpacing:'.06em'}}>EQUIFAX</span>
              </div>
              <div>
                <div style={{fontSize:15.5,fontWeight:700,color:C.navy,marginBottom:5}}>{a.softTitle}</div>
                <div style={{fontSize:13.5,lineHeight:1.6,color:C.body}}>{a.softBody}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .kb-auth-grid { grid-template-columns: 1fr !important; gap: 34px !important; max-width: 440px !important; }
          .kb-auth-brand { order: -1; }
        }
      `}</style>
    </div>
  );
}
