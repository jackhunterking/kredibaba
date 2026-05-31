import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Banknote, Building2, CreditCard, Hammer, Home as HomeIcon,
  KeyRound, RefreshCw, Search, Unlock,
} from "lucide-react";
import { C, FB, R, S, SHADOW, wrap, primaryBtn, PageHero, SectionLabel } from "../theme.jsx";

const WHO = [
  {
    id:'ilk-ev',
    icon:<HomeIcon size={22}/>,
    title:'İlk ev alıcıları',
    text:'Bütçe · ön onay · teklif',
  },
  {
    id:'ev-sahipleri',
    icon:<RefreshCw size={22}/>,
    title:'Ev sahipleri',
    text:'Yenileme · refinansman',
  },
  {
    id:'yatirimcilar',
    icon:<Building2 size={22}/>,
    title:'Ev sahipleri / yatırımcılar',
    text:'Kira geliri · portföy',
  },
  {
    id:'serbest-meslek',
    icon:<Banknote size={22}/>,
    title:'Şirket sahibi / serbest meslek',
    text:'Gelir belgesi · şirket',
  },
  {
    id:'yeni-gelenler',
    icon:<KeyRound size={22}/>,
    title:'Kanada’ya yeni gelenler',
    text:'Yeni kredi · yeni iş',
  },
];

const WHAT = [
  {
    id:'ev-almak',
    icon:<HomeIcon size={20}/>,
    title:'Ev almak',
    text:'Bütçe, peşinat ve mortgage yolunuzu netleştirin',
  },
  {
    id:'ev-kredimi-yenilemek',
    icon:<RefreshCw size={20}/>,
    title:'Ev kredimi yenilemek',
    text:'Yenileme ve refinansman seçeneklerini sade şekilde görün',
  },
  {
    id:'tadilat-finansmani',
    icon:<Hammer size={20}/>,
    title:'Tadilat finansmanı',
    text:'Ev değerinden yararlanarak tadilat bütçesi planlayın',
  },
  {
    id:'borc-odemelerini-rahatlatmak',
    icon:<CreditCard size={20}/>,
    title:'Borç ödemelerini rahatlatmak',
    text:'Borç birleştirme seçenekleriyle ödemeleri daha yönetilebilir hale getirin',
  },
  {
    id:'ev-degerinden-yararlanmak',
    icon:<Unlock size={20}/>,
    title:'Ev değerinden yararlanmak',
    text:'HELOC / ikinci mortgage seçeneklerini değerlendirin',
  },
  {
    id:'mortgage-seceneklerini-incelemek',
    icon:<Search size={20}/>,
    title:'Mortgage seçeneklerini incelemek',
    text:'Size uygun oran ve ürünleri sade şekilde inceleyin',
  },
];

export default function Solutions() {
  const { openForm } = useOutletContext();
  return (
    <>
      <PageHero
        label="Çözümler"
        title="Durumunuzu seçin. Sonraki adımı görün."
        sub="Az metin, net yol: kime yardımcı oluyoruz ve hangi konuda başlıyoruz?"
      />

      <section id="kime-yardim" style={{...wrap,paddingTop:S[56],paddingBottom:S[40]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 36px'}}>
          <SectionLabel>Kime yardımcı oluyoruz?</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.2}}>
            Size en yakın kartı seçin.
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {WHO.map((item,i)=>(
            <div id={item.id} key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'26px 24px',boxShadow:SHADOW.card}}>
              <div style={{width:48,height:48,borderRadius:R.icon,background:C.blueFaint,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                {item.icon}
              </div>
              <h3 style={{fontFamily:FB,fontSize:21,color:C.navy,fontWeight:600,marginBottom:8}}>{item.title}</h3>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:500,lineHeight:1.45}}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ne-yardim" style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 36px'}}>
          <SectionLabel>Ne konuda yardımcı oluyoruz?</SectionLabel>
          <h2 style={{fontFamily:FB,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:700,lineHeight:1.2}}>
            Yapılacak işi seçin.
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {WHAT.map((item,i)=>(
            <div id={item.id} key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 24px',display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{width:42,height:42,borderRadius:R.icon,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {item.icon}
              </div>
              <div>
                <h3 style={{fontSize:17,color:C.navy,fontWeight:600,fontFamily:FB,marginBottom:7}}>{item.title}</h3>
                <p style={{fontSize:13.5,color:C.muted,fontWeight:500,lineHeight:1.45}}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,borderRadius:R.panel,
                     padding:'36px 34px',color:'#fff',marginTop:42}}>
          <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:26,alignItems:'center'}}>
            <div>
              <h2 style={{fontFamily:FB,fontSize:'clamp(24px,4vw,32px)',fontWeight:700,marginBottom:12}}>
                Hangi yoldan başlayalım?
              </h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.76)',lineHeight:1.55,maxWidth:560}}>Kısa formu doldurun; sıradaki adımı gösterelim.</p>
            </div>
            <button onClick={openForm} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8,whiteSpace:'nowrap'})}>
              Ücretsiz Hesap Aç <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
