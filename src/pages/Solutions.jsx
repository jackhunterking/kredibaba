import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Home as HomeIcon, Banknote, KeyRound, RefreshCw, Building2, Unlock, Check,
} from "lucide-react";
import { C, FD, FB, wrap, primaryBtn, SectionLabel, PageHero } from "../theme.jsx";

const SEGMENTS = [
  {
    icon:<HomeIcon size={22}/>, t:'İlk ev alıcıları', sub:'First-time buyers',
    d:'İlk evinizi alırken FHSA, RRSP Home Buyers\' Plan ve ilk alıcı teşviklerinden tam olarak yararlanmanızı sağlarız. Ön onaydan kapanışa kadar her adımı Türkçe yönetiriz.',
    points:['FHSA & RRSP HBP planlaması','İlk alıcı vergi teşvikleri','%5 peşinatla CMHC sigortalı mortgage'],
  },
  {
    icon:<Banknote size={22}/>, t:'Serbest meslek & nakit gelir', sub:'Self-employed / cash income',
    d:'T4\'ünüz yoksa endişelenmeyin. Serbest meslek sahipleri, şirket sahipleri ve nakit gelirli müşteriler için B lender ve alternatif belgeli programlarla çözüm üretiriz.',
    points:['Alt belgeli (stated income) programlar','B lender ve özel lender erişimi','A lender\'a geçiş yol haritası'],
  },
  {
    icon:<KeyRound size={22}/>, t:"Kanada'ya yeni gelenler", sub:'Newcomers to Canada',
    d:'Çalışma vizesi, PR veya yeni vatandaş — kredi geçmişiniz Kanada\'da yeni olsa bile newcomer programlarıyla ev sahibi olmanıza yardımcı oluruz.',
    points:['Newcomer mortgage programları','Sınırlı kredi geçmişiyle başvuru','Çalışma vizesi & PR kabulü'],
  },
  {
    icon:<RefreshCw size={22}/>, t:'Yenileme & refinansman', sub:'Renewal & refinance',
    d:'Mevcut mortgage süreniz mi doluyor? Yenileme döneminde otomatik kabul etmeyin. Oranınızı karşılaştırır, gerekirse refinansmanla aylık ödemenizi düşürürüz.',
    points:['Yenileme öncesi oran karşılaştırma','Borç birleştirme (debt consolidation)','Daha düşük aylık ödeme stratejisi'],
  },
  {
    icon:<Unlock size={22}/>, t:'HELOC & öz sermaye', sub:'Home equity / HELOC',
    d:'Evinizdeki birikmiş öz sermayeyi tadilat, yatırım veya acil ihtiyaçlar için kullanın. HELOC ve öz sermaye kredisi seçeneklerini birlikte değerlendirelim.',
    points:['HELOC kredi limiti kurulumu','Öz sermaye bazlı finansman','Esnek geri ödeme seçenekleri'],
  },
  {
    icon:<Building2 size={22}/>, t:'Yatırım amaçlı mortgage', sub:'Investment properties',
    d:'Çoklu mülk, kira geliri ve yatırımcılar için özel stratejiler. Portföyünüzü büyütürken doğru lender ve yapıyla maksimum verimlilik sağlarız.',
    points:['Kira geliri bazlı değerlendirme','Çoklu mülk portföy stratejisi','Yatırımcıya özel lender erişimi'],
  },
];

export default function Solutions() {
  const { openForm } = useOutletContext();
  return (
    <>
      <PageHero
        label="Çözümler"
        title="Hangi durumda olursanız olun, bir yolu var"
        sub="Her gelir ve kredi profili için bir programımız var. Aşağıdan size en yakın durumu bulun — gerisini biz hallederiz."
      />

      <section style={{...wrap,paddingTop:56,paddingBottom:64}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          {SEGMENTS.map((s,i)=>(
            <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,padding:'30px 28px',
                                 boxShadow:'0 4px 20px rgba(10,37,64,0.04)'}}>
              <div style={{width:50,height:50,borderRadius:12,background:C.blueFaint,color:C.blue,
                           display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>{s.icon}</div>
              <h3 style={{fontFamily:FD,fontSize:22,color:C.navy,fontWeight:600,marginBottom:3}}>{s.t}</h3>
              <p style={{fontSize:12.5,color:C.muted,fontFamily:FB,marginBottom:14,letterSpacing:.3}}>{s.sub}</p>
              <p style={{fontSize:14.5,color:C.body,lineHeight:1.65,marginBottom:18}}>{s.d}</p>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                {s.points.map((p,j)=>(
                  <span key={j} style={{display:'flex',alignItems:'flex-start',gap:9,fontSize:14,color:C.navy,fontFamily:FB}}>
                    <Check size={16} color={C.green} style={{flexShrink:0,marginTop:2}}/> {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',marginTop:44}}>
          <button onClick={openForm} style={primaryBtn({padding:'15px 30px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            Durumuma uygun seçenekleri gör <ArrowRight size={18}/>
          </button>
          <p style={{fontSize:13,color:C.muted,marginTop:14,fontFamily:FB}}>
            2 dakikalık ücretsiz değerlendirme · Yükümlülük yok
          </p>
        </div>
      </section>
    </>
  );
}
