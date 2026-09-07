import React, { useState, useEffect, ReactNode } from "react";

// --- 1. КОМПОНЕНТ ШАПКИ (HEADER) ---
const Header = ({ lang, onLangClick, onInfoClick }: { lang: Lang, onLangClick: () => void, onInfoClick: () => void }) => (
  <header style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: WHITE,
    borderBottom: `1px solid ${BORDER}`
  }}>
    <button onClick={onLangClick} style={{
      background: "#F9F9F9", border: `1px solid ${BORDER}`, color: "#4A4A4A", padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit", fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontWeight: 500, transition: "background 0.2s"
    }}>
      <span style={{fontSize: 16}}>{T[lang].flag}</span><span>{T[lang].langName}</span>
    </button>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <BrushEmblem size={45} />
    </div>

    <button onClick={onInfoClick} style={{
      background: "transparent", border: "none", fontSize: 22, cursor: "pointer", color: NAVY, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36
    }}>
      ℹ️
    </button>
  </header>
);

// --- 2. МОДАЛЬНОЕ ОКНО КОНТАКТОВ (CONTACTS MODAL) ---
const ContactsModal = ({ onClose }: { onClose: () => void }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", padding: 20, backdropFilter: "blur(5px)"
  }}>
    <div style={{
      background: CREAM, width: "100%", maxWidth: 340, borderRadius: 16, padding: "32px 24px", position: "relative", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 12, right: 12, background: "#F0F0F0", border: "none", borderRadius: "50%", fontSize: 20, cursor: "pointer", color: "#4A4A4A", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center"
      }}>✕</button>
      
      <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
        <BrushEmblem size={80}/>
      </div>
      
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:NAVY,marginBottom:4}}>{CONFIG.nombre}</div>
      <div style={{fontSize:11,fontWeight:400,letterSpacing:2,textTransform:"uppercase",color:TEAL,marginBottom:20}}>{CONFIG.tagline}</div>

      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{fontSize:14,color:"#4A4A4A",display:"flex",alignItems:"center",gap:6, fontWeight: 500}}>
          <span>📍</span><span>{CONFIG.direccion}</span>
        </div>
        
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10, width: "100%"}}>
          <a href={`https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=Hola`} target="_blank" rel="noopener noreferrer"
            style={{color:WHITE, background:"#25D366", textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontWeight:500, padding: "12px 16px", borderRadius: 8, width: "100%", boxShadow: "0 2px 6px rgba(37,211,102,0.3)"}}>
            <IconWhatsApp size={18}/><span>WhatsApp: {CONFIG.whatsappLabel}</span>
          </a>
          {CONFIG.telefonos.map((tel) => (
            <a key={tel.numero} href={`tel:${tel.numero}`} style={{color:NAVY,textDecoration:"none",display:"flex",alignItems:"center",gap:8, padding: "10px 16px", border: `1px solid ${BORDER}`, borderRadius: 8, width: "100%", justifyContent: "center", fontWeight: 500}}>
              <IconPhoneCall size={16}/><span>{tel.label}</span>
            </a>
          ))}
        </div>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:8}}>
          <SocialButton href={CONFIG.redes.instagram} bg="#E1306C"><IconInstagram size={18}/></SocialButton>
          <SocialButton href={CONFIG.redes.facebook} bg="#1877F2"><IconFacebook size={18}/></SocialButton>
          <SocialButton href={CONFIG.redes.tripadvisor} bg="#34E0A1"><IconTripadvisor size={18}/></SocialButton>
          <SocialButton href={CONFIG.redes.tiktok} bg="#000000"><IconTikTok size={18}/></SocialButton>
        </div>
      </div>
    </div>
  </div>
);

// --- 3. ИНТЕГРАЦИЯ В APP ---
export default function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [langSelected, setLangSelected] = useState(false);
  const [langAnim, setLangAnim] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);
  useEffect(() => { if (pedidoEnviado) setTimeout(() => setShowCheck(true), 100); else setShowCheck(false); }, [pedidoEnviado]);

  function chooseLang(l: Lang) { setLang(l); setLangAnim(true); setTimeout(() => { setLangSelected(true); window.scrollTo(0,0); }, 500); }

  const t = T[lang];
  const totalItems = carrito.reduce((s,i) => s+i.cantidad, 0);
  const totalPrecio = carrito.reduce((s,i) => s+i.precio*i.cantidad, 0);

  function getNombre(item: MenuItem): string { if (lang==="es") return item.nombre; return item.t?.[lang]?.[0] ?? item.nombre; }
  function getDesc(item: MenuItem): string { if (lang==="es") return item.descripcion; return item.t?.[lang]?.[1] ?? item.descripcion; }
  function getCat(cat: string): string { return cat==="all" ? t.todo : (CAT_T[cat]?.[lang] ?? cat); }
  function getCartNombre(item: CartItem): string { if (lang==="es") return item.nombre; return item.t?.[lang]?.[0] ?? item.nombre; }

  function agregarItem(item: MenuItem) {
    setCarrito(prev => {
      const e = prev.find(c => c.nombre===item.nombre);
      if (e) return prev.map(c => c.nombre===item.nombre ? {...c, cantidad:c.cantidad+1} : c);
      return [...prev, {nombre:item.nombre, emoji:item.emoji, precio:item.precio, cantidad:1, t:item.t}];
    });
  }
  function quitarItem(nombre: string) {
    setCarrito(prev => {
      const e = prev.find(c => c.nombre===nombre);
      if (e && e.cantidad > 1) return prev.map(c => c.nombre===nombre ? {...c, cantidad:c.cantidad-1} : c);
      return prev.filter(c => c.nombre!==nombre);
    });
  }
  function cantidadEnCarrito(nombre: string): number { return carrito.find(c => c.nombre===nombre)?.cantidad || 0; }
  function nuevosPedido() { setCarrito([]); setPedidoEnviado(false); setShowCarrito(false); }

  const categories = ["all", ...Array.from(new Set(MENU.map(i => i.categoria)))];
  const filtered = activeCategory==="all" ? MENU : MENU.filter(i => i.categoria===activeCategory);
  const grouped = filtered.reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  if (!langSelected) {
    const LANGS: [Lang, string, string][] = [["es","🇪🇸","Bienvenido"],["en","🇬🇧","Welcome"],["pt","🇧🇷","Bem-vindo"],["it","🇮🇹","Benvenuto"],["fr","🇫🇷","Bienvenue"],["ru","🇷🇺","Добро пожаловать"]];
    return (
      <div style={{position:"fixed",inset:0,background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
        <style>{`${FONTS} @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:36,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          <div style={{fontSize:9,letterSpacing:6,color:TEAL,textTransform:"uppercase",marginBottom:16}}>{CONFIG.ciudad}</div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><BrushEmblem size={132}/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
            <div style={{width:50,height:1,background:`linear-gradient(to right,transparent,${SAND})`}}/>
            <span style={{color:SAND,fontSize:12}}>·</span>
            <div style={{width:50,height:1,background:`linear-gradient(to left,transparent,${SAND})`}}/>
          </div>
          <div style={{fontSize:9,letterSpacing:4,color:"#4A4A4A",textTransform:"uppercase"}}>Elegí tu idioma · Choose your language</div>
        </div>
        <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:8,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          {LANGS.map(([code,flag,sub],i) => (
            <button key={code} onClick={() => chooseLang(code)}
              style={{width:"100%",padding:"13px 20px",background:WHITE,border:`1px solid ${BORDER}`,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:14,animation:`fadeInUp 0.5s ease ${i*0.07}s both`,boxShadow:`0 1px 8px ${BORDER}`}}>
              <span style={{fontSize:26,lineHeight:1,flexShrink:0}}>{flag}</span>
              <div style={{textAlign:"left",flex:1}}>
                <div style={{fontSize:14,fontWeight:400,color:NAVY,letterSpacing:0.5}}>{T[code].langName}</div>
                <div style={{fontSize:11,color:MUTED,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>{sub}</div>
              </div>
              <span style={{color:TEAL,fontSize:16,flexShrink:0}}>›</span>
            </button>
          ))}
        </div>
        <div style={{position:"relative",zIndex:1,marginTop:24,fontSize:9,color:MUTED,letterSpacing:4,textTransform:"uppercase",opacity:langAnim?0:1,transition:"opacity 0.4s"}}>MENÚ DIGITAL</div>
      </div>
    );
  }

  if (showCarrito) {
    return (
      <div style={{background:CREAM,minHeight:"100vh",width:"100%",fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,display:"flex",flexDirection:"column"}}>
        <style>{FONTS}</style>
        <div style={{height:4,background:`linear-gradient(to right,${TEAL},${TEAL2},${TEAL})`,opacity:0.7,flexShrink:0}}/>
        <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <button onClick={() => setShowCarrito(false)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:9,letterSpacing:2,textTransform:"uppercase"}}>{t.volver}</button>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:NAVY}}>{t.tuPedido}</div>
          <div style={{width:80}}/>
        </div>
        {pedidoEnviado ? (
          <div style={{padding:"40px 20px",textAlign:"center",flex:1}}>
            {showCheck && <OrderCheck/>}
            
            <div style={{background:"#F1F8F1",padding:"20px",margin:"20px 0",border:`1px solid #A5D6A7`,borderRadius: 8}}>
              <div style={{fontSize:20,fontWeight:500,color:"#2E7D32",marginBottom:6}}>📱 {t.mostrarMozo}</div>
              <div style={{fontSize:13,color:"#1B5E20"}}>{t.instruccion}</div>
            </div>

            <div style={{background:WHITE,padding:"16px",marginBottom:24,border:`1px solid ${BORDER}`,textAlign:"left", borderRadius: 8}}>
              <div style={{fontSize:10,letterSpacing:2,color:"#4A4A4A",textTransform:"uppercase",marginBottom:14, fontWeight:500}}>📋 Оформленный заказ</div>
              {carrito.map((item,i) => (
                <div key={i} style={{display:"flex",alignItems:"baseline",gap:8,padding:"8px 0"}}>
                  <span style={{fontSize:14,color:NAVY,fontWeight:500}}>{item.nombre} <span style={{color:"#888"}}>×{item.cantidad}</span></span>
                  <div style={{flex:1,borderBottom:`2px dotted #CCC`,position:"relative",top:-4}}/>
                  <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,letterSpacing:0.5,color:NAVY,flexShrink:0}}>{formatPeso(item.precio*item.cantidad)}</span>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:12,paddingTop:10,borderTop:`1px solid ${TEAL}30`}}>
                <span style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",flex:1}}>TOTAL</span>
                <div style={{flex:1,borderBottom:`1px dotted ${BORDER}`,marginBottom:4}}/>
                <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:26,letterSpacing:0.5,color:TEAL2}}>{formatPeso(totalPrecio)}</span>
              </div>
            </div>
            
            <button onClick={nuevosPedido} style={{width:"100%",padding:"14px",background:"#F5F5F5",color:NAVY,border:`2px solid ${NAVY}`,borderRadius:8,fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.nuevoPedido}</button>
          </div>
        ) : (
          <div style={{padding:"20px",flex:1}}>
            <div style={{fontSize:9,letterSpacing:2,color:MUTED,textTransform:"uppercase",marginBottom:20}}>{t.revisaPedido}</div>
            {carrito.length === 0 ? (
              <div style={{textAlign:"center",padding:"60px 20px",color:MUTED}}>
                <div style={{fontSize:40}}>🍽️</div>
                <div style={{marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontStyle:"italic",color:NAVY}}>{t.carritoVacio}</div>
                <button onClick={() => setShowCarrito(false)} style={{marginTop:20,padding:"10px 28px",background:TEAL2,color:WHITE,border:"none",fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.verMenu}</button>
              </div>
            ) : (
              <>
                {carrito.map((item,idx) => (
                  <div key={idx} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${BORDER}`}}>
                    <span style={{fontSize:20}}>{item.emoji}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:NAVY}}>{getCartNombre(item)}</div>
                      <div style={{fontSize:11,color:MUTED,marginTop:1}}>{formatPeso(item.precio)} {t.cu}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={() => quitarItem(item.nombre)} style={{width:26,height:26,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:13,color:NAVY,minWidth:16,textAlign:"center"}}>{item.cantidad}</span>
                      <button onClick={() => agregarItem(item as unknown as MenuItem)} style={{width:26,height:26,border:`1px solid ${TEAL}`,background:TEAL,color:WHITE,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,letterSpacing:0.5,color:TEAL2,minWidth:70,textAlign:"right"}}>{formatPeso(item.precio*item.cantidad)}</div>
                  </div>
                ))}
                <div style={{display:"flex",alignItems:"baseline",gap:8,padding:"16px 0",borderTop:`1px solid ${TEAL}30`,marginTop:8}}>
                  <span style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",flex:1}}>TOTAL</span>
                  <div style={{flex:2,borderBottom:`1px dotted ${BORDER}`,marginBottom:4}}/>
                  <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:30,letterSpacing:0.5,color:TEAL2}}>{formatPeso(totalPrecio)}</span>
                </div>
                
                <button onClick={() => setPedidoEnviado(true)} style={{width:"100%",padding:"16px",background:"#2E7D32",color:WHITE,border:"none",borderRadius:8,fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:16}}>📋 {t.confirmar}</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,minHeight:"100vh",maxWidth:480,margin:"0 auto",overflowX:"hidden",width:"100%"}}>
      <style>{`${FONTS}*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none;}html,body,#root{overflow-x:hidden;width:100%;}`}</style>
      
      {showInfoModal && <ContactsModal onClose={() => setShowInfoModal(false)} />}

      <div style={{ position: "sticky", top: 0, zIndex: 50, background: WHITE, boxShadow: `0 2px 10px rgba(0,0,0,0.06)` }}>
        
        <Header 
          lang={lang} 
          onLangClick={() => setLangSelected(false)} 
          onInfoClick={() => setShowInfoModal(true)} 
        />

        <nav style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",padding:"12px 16px"}}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const label = cat === "all" ? t.todo : getCat(cat);
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink:0, fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:500, letterSpacing:1, textTransform:"uppercase", 
                  color: active ? WHITE : "#4A4A4A", padding:"8px 18px", borderRadius:20, 
                  background: active ? "#54c3ff" : WHITE, border:`1px solid ${active ? "#54c3ff" : BORDER}`, 
                  cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s"
                }}>
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{paddingBottom:100}}>
        {Object.entries(grouped).map(([cat, catItems], gi) => {
          return (
            <div key={cat} style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(12px)",transition:`all 0.5s ease ${gi*0.08}s`}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:12,padding:"28px 20px 12px",borderBottom:`1px solid ${BORDER}`}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,fontStyle:"italic",color:NAVY,lineHeight:1,flex:1}}>{getCat(cat)}</div>
              </div>
              
              <div style={{padding:"0 20px"}}>
                {catItems.map((item, idx) => {
                  const cant = cantidadEnCarrito(item.nombre);
                  const isLast = idx === catItems.length - 1;
                  return (
                    <div key={idx} style={{padding:"20px 0",borderBottom:isLast?"none":`1px solid ${BORDER}`}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                        {item.imagen && (
                          <img src={item.imagen} alt={getNombre(item)} 
                            style={{width:90,height:90,borderRadius:12,objectFit:"cover",flexShrink:0,border:`1px solid ${BORDER}`}}/>
                        )}
                        <div style={{flex:1,minWidth:0}}>
                          {item.promo && <div style={{fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:SAND,border:`1px solid rgba(199,154,86,0.5)`,borderRadius:4,display:"inline-block",padding:"3px 8px",marginBottom:6}}>{t.oferta}</div>}
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:item.promo?400:300,fontStyle:item.promo?"italic":"normal",color:NAVY,lineHeight:1.15,marginBottom:6}}>{getNombre(item)}</div>
                          {getDesc(item) ? <div style={{fontSize:14,fontWeight:400,color:"#4A4A4A",lineHeight:1.5,letterSpacing:0.2}}>{getDesc(item)}</div> : null}
                        </div>
                      </div>
                      
                      <div style={{display:"flex",alignItems:"baseline",gap:10,marginTop:12,paddingLeft:item.imagen?104:0}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,color:item.promo?SAND:NAVY,whiteSpace:"nowrap",letterSpacing:0.5}}>{formatPeso(item.precio)}</div>
                        <div style={{flex:1,minWidth:12,borderBottom:`1px dotted rgba(0,0,0,0.15)`,marginBottom:6}}/>
                        
                        {item.disponible && (cant === 0 ? (
                          <button onClick={() => agregarItem(item)} style={{width:34,height:34,border:`1px solid ${NAVY}`,background:"transparent",color:NAVY,fontSize:20,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>+</button>
                        ) : (
                          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                            <button onClick={() => quitarItem(item.nombre)} style={{width:32,height:32,border:`1px solid ${BORDER}`,background:"transparent",color:NAVY,fontSize:18,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                            <span style={{fontSize:16,fontWeight:500,color:NAVY,minWidth:20,textAlign:"center"}}>{cant}</span>
                            <button onClick={() => agregarItem(item)} style={{width:32,height:32,border:`1px solid ${NAVY}`,background:NAVY,color:WHITE,fontSize:18,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{margin:"8px 20px 0",paddingTop:20,borderTop:`1px solid ${BORDER}`}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,fontStyle:"italic",color:NAVY,marginBottom:8}}>
            📍 {t.comoLlegar}
          </div>
          <div style={{fontSize:12,color:MUTED,letterSpacing:0.3,marginBottom:6}}>{CONFIG.direccion}</div>
          <a href={CONFIG.mapUrl} target="_blank" rel="noopener noreferrer"
            style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:TEAL2,textDecoration:"none"}}>
            {t.abrirMaps}
          </a>
        </div>

        <footer style={{margin:"28px 20px 0",paddingTop:24,borderTop:`1px solid ${BORDER}`,textAlign:"center",cursor:"default"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14,opacity:0.75}}><BrushEmblem size={64} color={MUTED as string}/></div>
          <div style={{display:"flex",justifyContent:"center",gap:20,marginBottom:12}}>
            {CONFIG.pagoEfectivo && <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED}}>💵 {t.efectivo}</span>}
            {CONFIG.pagoMercadoPago && <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED,display:"flex",alignItems:"center",gap:6}}><IconMercadoPago size={16}/> Mercado Pago</span>}
            {CONFIG.pagoTarjeta && <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED}}>💳 {t.tarjeta}</span>}
          </div>
          <div style={{fontSize:9,color:MUTED,opacity:0.7,letterSpacing:1,marginBottom:14}}>{t.precios}</div>
          <div style={{marginTop:10,fontSize:8,letterSpacing:3,textTransform:"uppercase",color:TEAL,opacity:0.5}}>Menú Digital</div>
          <div style={{marginBottom:8}}/>
        </footer>
      </div>
      
      {totalItems > 0 && (
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:100,width:"calc(100% - 32px)",maxWidth:448}}>
          <style>{`
            @keyframes desnivelCartPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
            .desnivel-cart-btn{animation:desnivelCartPulse 1.8s ease-in-out infinite;}
          `}</style>
          <button onClick={() => setShowCarrito(true)} className="desnivel-cart-btn"
            style={{width:"100%",padding:"18px 22px",borderRadius:999,background:TEAL2,color:WHITE,border:`2px solid ${WHITE}`,fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer",fontFamily:"'Jost',sans-serif",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,boxShadow:`0 10px 30px rgba(192,57,43,0.55), 0 0 0 3px rgba(192,57,43,0.18)`}}>
            <span style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.22)"}}>
                🛒
                <span style={{position:"absolute",top:-6,right:-6,minWidth:20,height:20,padding:"0 4px",borderRadius:10,background:WHITE,color:TEAL2,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.3)"}}>{totalItems}</span>
              </span>
              <span style={{textTransform:"uppercase"}}>{totalItems===1?t.item:t.items}</span>
            </span>
            <span style={{opacity:0.85,fontSize:11,textTransform:"uppercase",letterSpacing:1.5}}>{t.verPedido}</span>
            <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,letterSpacing:0.5}}>{formatPeso(totalPrecio)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
