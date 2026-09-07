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
    {/* Левый край: Переключение языка */}
    <button onClick={onLangClick} style={{
      background: "#F9F9F9", border: `1px solid ${BORDER}`, color: "#4A4A4A", padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit", fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontWeight: 500, transition: "background 0.2s"
    }}>
      <span style={{fontSize: 16}}>{T[lang].flag}</span><span>{T[lang].langName}</span>
    </button>

    {/* Центр: Компактный логотип */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BrushEmblem size={45} />
    </div>

    {/* Правый край: Кнопка Инфо */}
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
      {/* Кнопка закрытия */}
      <button onClick={onClose} style={{
        position: "absolute", top: 12, right: 12, background: "#F0F0F0", border: "none", borderRadius: "50%", fontSize: 20, cursor: "pointer", color: "#4A4A4A", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center"
      }}>✕</button>
      
      <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
        <BrushEmblem size={80}/>
      </div>
      
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:NAVY,marginBottom:4}}>{CONFIG.nombre}</div>
      <div style={{fontSize:11,fontWeight:400,letterSpacing:2,textTransform:"uppercase",color:TEAL,marginBottom:20}}>{CONFIG.tagline}</div>

      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        {/* Адрес */}
        <div style={{fontSize:14,color:"#4A4A4A",display:"flex",alignItems:"center",gap:6, fontWeight: 500}}>
          <span>📍</span><span>{CONFIG.direccion}</span>
        </div>
        
        {/* Телефоны */}
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

        {/* Соцсети */}
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
  
  // Новое состояние для модалки
  const [showInfoModal, setShowInfoModal] = useState(false);

  // ... (остальные функции логики без изменений: chooseLang, agregatItem, и т.д.) ...

  // Экран приветствия
  if (!langSelected) {
    // Усилен цвет шрифта призыва к действию (#4A4A4A вместо MUTED)
    // ... ваш код стартового экрана ...
  }

  // Экран корзины
  if (showCarrito) {
    return (
      <div style={{background:CREAM,minHeight:"100vh",width:"100%",fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,display:"flex",flexDirection:"column"}}>
        {/* ... */}
        {pedidoEnviado ? (
          <div style={{padding:"40px 20px",textAlign:"center",flex:1}}>
            {showCheck && <OrderCheck/>}
            {/* ИЗМЕНЕНИЕ: Зеленый блок успешного заказа (зона официанта) */}
            <div style={{background:"#F1F8F1",padding:"20px",margin:"20px 0",border:`1px solid #A5D6A7`,borderRadius: 8}}>
              <div style={{fontSize:20,fontWeight:500,color:"#2E7D32",marginBottom:6}}>📱 {t.mostrarMozo}</div>
              <div style={{fontSize:13,color:"#1B5E20"}}>{t.instruccion}</div>
            </div>
            <div style={{background:WHITE,padding:"16px",marginBottom:24,border:`1px solid ${BORDER}`,textAlign:"left", borderRadius: 8}}>
              <div style={{fontSize:10,letterSpacing:2,color:"#4A4A4A",textTransform:"uppercase",marginBottom:14, fontWeight:500}}>📋 Оформленный заказ</div>
              {carrito.map((item,i) => (
                {/* ИЗМЕНЕНИЕ: Аккуратный точечный пунктир в чеке */}
                <div key={i} style={{display:"flex",alignItems:"baseline",gap:8,padding:"8px 0"}}>
                  <span style={{fontSize:14,color:NAVY,fontWeight:500}}>{item.nombre} <span style={{color:"#888"}}>×{item.cantidad}</span></span>
                  <div style={{flex:1,borderBottom:`2px dotted #CCC`,position:"relative",top:-4}}/>
                  <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,letterSpacing:0.5,color:NAVY,flexShrink:0}}>{formatPeso(item.precio*item.cantidad)}</span>
                </div>
              ))}
            </div>
            {/* ИЗМЕНЕНИЕ: Заметная кнопка "Новый заказ" */}
            <button onClick={nuevosPedido} style={{width:"100%",padding:"14px",background:"#F5F5F5",color:NAVY,border:`2px solid ${NAVY}`,borderRadius:8,fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.nuevoPedido}</button>
          </div>
        ) : (
          <div style={{padding:"20px",flex:1}}>
            {/* ... список позиций ... */}
            {/* ИЗМЕНЕНИЕ: Кнопка подтверждения зеленого/нейтрального цвета */}
            <button onClick={() => setPedidoEnviado(true)} style={{width:"100%",padding:"16px",background:"#2E7D32",color:WHITE,border:"none",borderRadius:8,fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:16}}>📋 {t.confirmar}</button>
          </div>
        )}
      </div>
    );
  }

  // --- ОСНОВНОЙ ЭКРАН МЕНЮ ---
  return (
    <div style={{background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,minHeight:"100vh",maxWidth:480,margin:"0 auto",overflowX:"hidden",width:"100%"}}>
      <style>{`${FONTS}*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none;}html,body,#root{overflow-x:hidden;width:100%;}`}</style>
      
      {/* Вызов модального окна */}
      {showInfoModal && <ContactsModal onClose={() => setShowInfoModal(false)} />}

      {/* ИЗМЕНЕНИЕ: Единый блок sticky для шапки и навигации */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: WHITE, boxShadow: `0 2px 10px rgba(0,0,0,0.06)` }}>
        
        {/* Новая компактная шапка */}
        <Header 
          lang={lang} 
          onLangClick={() => setLangSelected(false)} 
          onInfoClick={() => setShowInfoModal(true)} 
        />

        {/* Липкая панель категорий */}
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
                {/* ИЗМЕНЕНИЕ: Убрано дублирование заголовка капсом */}
              </div>
              
              <div style={{padding:"0 20px"}}>
                {catItems.map((item, idx) => {
                  const cant = cantidadEnCarrito(item.nombre);
                  const isLast = idx === catItems.length - 1;
                  return (
                    <div key={idx} style={{padding:"20px 0",borderBottom:isLast?"none":`1px solid ${BORDER}`}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                        {/* ИЗМЕНЕНИЕ: Увеличен размер фотографий до 90x90 */}
                        {item.imagen && (
                          <img src={item.imagen} alt={getNombre(item)} 
                            style={{width:90,height:90,borderRadius:12,objectFit:"cover",flexShrink:0,border:`1px solid ${BORDER}`}}/>
                        )}
                        <div style={{flex:1,minWidth:0}}>
                          {item.promo && <div style={{fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:SAND,border:`1px solid rgba(199,154,86,0.5)`,borderRadius:4,display:"inline-block",padding:"3px 8px",marginBottom:6}}>{t.oferta}</div>}
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:item.promo?400:300,fontStyle:item.promo?"italic":"normal",color:NAVY,lineHeight:1.15,marginBottom:6}}>{getNombre(item)}</div>
                          {/* ИЗМЕНЕНИЕ: Более контрастный и читаемый цвет описания блюд (#4A4A4A) */}
                          {getDesc(item) ? <div style={{fontSize:14,fontWeight:400,color:"#4A4A4A",lineHeight:1.5,letterSpacing:0.2}}>{getDesc(item)}</div> : null}
                        </div>
                      </div>
                      
                      {/* Блок цены и кнопок добавления */}
                      <div style={{display:"flex",alignItems:"baseline",gap:10,marginTop:12,paddingLeft:item.imagen?104:0}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,color:item.promo?SAND:NAVY,whiteSpace:"nowrap",letterSpacing:0.5}}>{formatPeso(item.precio)}</div>
                        <div style={{flex:1,minWidth:12,borderBottom:`1px dotted rgba(0,0,0,0.15)`,marginBottom:6}}/>
                        
                        {/* Логика кнопок добавления */}
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
        {/* Footer остаётся прежним */}
      </div>
      
      {/* Кнопка Корзины остаётся прежней */}
    </div>
  );
}
