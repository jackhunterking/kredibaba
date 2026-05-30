import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, BookOpen, Check, HelpCircle, Info, RefreshCw } from "lucide-react";
import { C, FD, FB, R, S, wrap, primaryBtn, PageHero, SectionLabel } from "../theme.jsx";

const GLOSSARY = [
  {term:'Mortgage', plain:'Ev kredisi'},
  {term:'Broker', plain:'Seçenek karşılaştıran aracı'},
  {term:'Lender', plain:'Parayı veren kurum'},
  {term:'Ön onay', plain:'Sürece başlamadan önce yaklaşık alım gücünü görmek'},
  {term:'Refinansman', plain:'Mevcut mortgage’ı yeniden düzenlemek'},
  {term:'Yenileme', plain:'Süresi biten mortgage için yeni teklif almak'},
  {term:'Borç birleştirme', plain:'Farklı borç ödemelerini daha yönetilebilir hale getirmek'},
  {term:'Amortisman', plain:'Toplam ödeme süresi'},
  {term:'Vade', plain:'Oran süresi'},
  {term:'Sabit faiz', plain:'Değişmeyen oran'},
  {term:'Değişken faiz', plain:'Piyasaya göre değişebilir'},
  {term:'Commitment', plain:'Yazılı lender koşulları'},
];

const GUIDES = [
  {icon:<BookOpen size={21}/>, title:'Ev alma', text:'Bütçe → ön onay → teklif'},
  {icon:<RefreshCw size={21}/>, title:'Yenileme / ödeme düzenleme', text:'Teklif → karşılaştır → karar'},
  {icon:<Info size={21}/>, title:'Borç ödemelerini rahatlatma', text:'Ödeme yükü → seçenek → plan'},
];

const FAQ = [
  {q:'Kredibaba banka mı?', a:'Hayır. Mortgage seçeneklerini karşılaştırmaya yardımcı olur.'},
  {q:'Ön onay kesin mi?', a:'Hayır. Kesin onay yazılı lender koşullarıyla olur.'},
  {q:'En düşük oran herkese mi?', a:'Hayır. Gelir, kredi ve peşinat belirleyicidir.'},
  {q:'Ücret var mı?', a:'Varsa commitment öncesi yazılı açıklanır.'},
];

export default function Learn() {
  const { openForm } = useOutletContext();
  return (
    <>
      <PageHero
        label="Öğren"
        title="Mortgage’ı sadeleştirelim."
        sub="Kısa tanımlar. Net rehberler. Türkçe cevaplar."
      />

      <section style={{...wrap,paddingTop:S[56],paddingBottom:S[32]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:22,marginBottom:24,flexWrap:'wrap'}}>
          <div>
            <SectionLabel>Sözlük</SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
              Temel kelimeler.
            </h2>
          </div>
          <Link to="/araclar" style={{textDecoration:'none'}}>
            <button style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.control,padding:'12px 18px',fontFamily:FB,fontWeight:800,color:C.navy,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8}}>
              Hesapla <ArrowRight size={16}/>
            </button>
          </Link>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {GLOSSARY.map((item,i)=>(
            <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'18px 18px'}}>
              <h3 style={{fontSize:16,color:C.navy,fontWeight:900,fontFamily:FB,marginBottom:5}}>{item.term}</h3>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:700}}>{item.plain}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[40],paddingBottom:S[32]}}>
        <div style={{textAlign:'center',maxWidth:560,margin:'0 auto 28px'}}>
          <SectionLabel>Rehberler</SectionLabel>
          <h2 style={{fontFamily:FD,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
            Yol haritanız.
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {GUIDES.map((guide,i)=>(
            <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 22px'}}>
              <div style={{width:46,height:46,borderRadius:R.icon,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>
                {guide.icon}
              </div>
              <h3 style={{fontFamily:FD,fontSize:23,color:C.navy,fontWeight:600,marginBottom:6}}>{guide.title}</h3>
              <p style={{fontSize:14,color:C.muted,fontWeight:800}}>{guide.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'0.72fr 1.28fr',gap:28,alignItems:'start'}}>
          <div>
            <SectionLabel>SSS</SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:500,lineHeight:1.16,marginBottom:18}}>
              Kısa cevaplar.
            </h2>
            <button onClick={openForm} style={primaryBtn({padding:'14px 24px',display:'inline-flex',alignItems:'center',gap:8})}>
              Ücretsiz Hesap Aç <ArrowRight size={16}/>
            </button>
          </div>
          <div style={{display:'grid',gap:12}}>
            {FAQ.map((faq,i)=>(
              <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'16px 18px'}}>
                <h3 style={{display:'flex',alignItems:'center',gap:9,fontSize:15.5,color:C.navy,fontWeight:900,fontFamily:FB,marginBottom:5}}>
                  <HelpCircle size={16} color={C.blue}/> {faq.q}
                </h3>
                <p style={{fontSize:13.5,color:C.body,lineHeight:1.5}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.blueFaint,borderTop:`1px solid ${C.border}`}}>
        <div style={{...wrap,paddingTop:S[24],paddingBottom:S[24]}}>
          <p style={{fontSize:12.5,color:C.body,lineHeight:1.5,fontFamily:FB,margin:0}}>
            <Check size={14} color={C.blue} style={{verticalAlign:'-3px',marginRight:7}}/>
            Genel bilgidir; kişisel değerlendirme yerine geçmez.
          </p>
        </div>
      </section>
    </>
  );
}
