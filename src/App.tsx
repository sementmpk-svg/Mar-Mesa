import { useState, useEffect } from "react";

const CONFIG = {
  nombre:          "Mar & Mesa",
  ciudad:          "Buenos Aires",
  subtitulo:       "Mariscos · Pescados · Cocina de mar",
  pagoEfectivo:    true,
  pagoMercadoPago: true,
  pagoTarjeta:     true,
  sheetsUrl:       "PEGAR_URL_DE_GOOGLE_APPS_SCRIPT_AQUI",
  storageKey:      "marmesa_surveys_v1",
};

const NAVY   = "#1A2E3B";
const TEAL   = "#4A8FA8";
const TEAL2  = "#2D6E87";
const SAND   = "#C5A96B";
const CREAM  = "#F7F4EE";
const WHITE  = "#FFFFFF";
const MUTED  = "rgba(26,46,59,0.42)";
const BORDER = "rgba(26,46,59,0.10)";
const FONTS  = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');`;

// ── Shared sketch props ──
const SK  = { fill:"none", stroke:TEAL, strokeWidth:1.0, strokeLinecap:"round", strokeLinejoin:"round" };
const SKT = { fill:"none", stroke:TEAL, strokeWidth:0.55, strokeLinecap:"round", strokeLinejoin:"round" };
const SKF = { fill:"rgba(74,143,168,0.07)", stroke:TEAL, strokeWidth:0.85, strokeLinecap:"round", strokeLinejoin:"round" };

// ─── Creature SVG components ───────────────────────────

const SketchCrab = ({ x=0, y=0, scale=1, opacity=0.25, flip=false }) => (
  <g transform={`translate(${x},${y}) scale(${flip?-scale:scale},${scale})`} opacity={opacity}>
    <ellipse cx="0" cy="0" rx="34" ry="24" {...SKF}/>
    <path d="M-34,0 Q-52,-8 -62,-18 Q-70,-26 -64,-34 Q-56,-42 -46,-34 Q-36,-26 -32,-14 Q-28,-4 -28,6" {...SKF}/>
    <path d="M-64,-34 Q-68,-40 -62,-44 Q-54,-46 -50,-38" {...SKF}/>
    <path d="M34,0 Q52,-8 62,-18 Q70,-26 64,-34 Q56,-42 46,-34 Q36,-26 32,-14 Q28,-4 28,6" {...SKF}/>
    <path d="M64,-34 Q68,-40 62,-44 Q54,-46 50,-38" {...SKF}/>
    <circle cx="-12" cy="-8" r="4" {...SKF}/><circle cx="-12" cy="-8" r="1.5" fill={TEAL} stroke="none"/>
    <circle cx="12" cy="-8" r="4" {...SKF}/><circle cx="12" cy="-8" r="1.5" fill={TEAL} stroke="none"/>
    <path d="M-8,2 Q0,7 8,2" {...SKT}/>
    <path d="M-28,16 Q-36,26 -40,38" {...SK}/><path d="M-20,20 Q-24,34 -26,46" {...SK}/><path d="M-10,22 Q-10,36 -12,48" {...SK}/>
    <path d="M28,16 Q36,26 40,38" {...SK}/><path d="M20,20 Q24,34 26,46" {...SK}/><path d="M10,22 Q10,36 12,48" {...SK}/>
    <path d="M-10,-14 Q-16,-26 -22,-34" {...SKT}/><path d="M10,-14 Q16,-26 22,-34" {...SKT}/>
    <path d="M-18,-4 L-18,16" {...SKT}/><path d="M0,-10 L0,16" {...SKT}/><path d="M18,-4 L18,16" {...SKT}/>
  </g>
);

const SketchShrimp = ({ x=0, y=0, scale=1, opacity=0.25, flip=false }) => (
  <g transform={`translate(${x},${y}) scale(${flip?-scale:scale},${scale})`} opacity={opacity}>
    <path d="M0,0 Q18,-6 28,4 Q36,14 32,28 Q26,42 14,50 Q2,56 -10,52 Q-22,46 -26,34 Q-30,20 -24,8 Q-16,-2 0,0Z" {...SKF}/>
    <path d="M-28,18 Q-44,14 -48,4 Q-46,-8 -36,-6 Q-26,-2 -24,10" {...SKF}/>
    <path d="M-36,-6 Q-38,-12 -32,-14 Q-24,-14 -24,0" {...SKF}/>
    <path d="M-30,34 Q-36,46 -30,58 Q-24,64 -18,58" {...SKF}/>
    <path d="M-22,36 Q-26,48 -22,58 Q-18,64 -14,60" {...SKF}/>
    <path d="M-14,38 Q-16,50 -14,58 Q-12,64 -8,62" {...SKF}/>
    <circle cx="22" cy="2" r="5" {...SKF}/><circle cx="22" cy="2" r="2" fill={TEAL} stroke="none"/>
    <path d="M28,-2 Q42,-12 54,-22" {...SKT}/><path d="M26,0 Q38,-14 46,-26" {...SKT}/>
    <path d="M-26,20 Q-36,24 -42,32" {...SKT}/><path d="M-26,26 Q-36,32 -40,42" {...SKT}/><path d="M-26,32 Q-34,38 -36,48" {...SKT}/>
  </g>
);

const SketchFish = ({ x=0, y=0, scale=1, opacity=0.25, flip=false }) => (
  <g transform={`translate(${x},${y}) scale(${flip?-scale:scale},${scale})`} opacity={opacity}>
    <path d="M-40,0 Q-24,-8 -8,0 Q-24,8 -40,0Z" {...SKF}/>
    <path d="M-40,0 L-56,-10 L-52,0 L-56,10 Z" {...SKF}/>
    <path d="M-18,-12 Q-8,-20 2,-12" {...SKF}/>
    <path d="M-18,12 Q-8,20 2,12" {...SKF}/>
    <circle cx="-12" cy="-2" r="4" {...SKF}/><circle cx="-12" cy="-2" r="1.8" fill={TEAL} stroke="none"/>
    <path d="M-28,-6 Q-22,-9 -16,-7" {...SKT}/><path d="M-28,-2 Q-22,-5 -16,-3" {...SKT}/>
    <path d="M-28,2 Q-22,-1 -16,1" {...SKT}/><path d="M-28,6 Q-22,3 -16,5" {...SKT}/>
    <path d="M-40,-5 Q-33,-8 -26,-7" {...SKT}/><path d="M-40,5 Q-33,8 -26,7" {...SKT}/>
  </g>
);

const SketchOctopus = ({ x=0, y=0, scale=1, opacity=0.25 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
    <ellipse cx="0" cy="-10" rx="24" ry="20" {...SKF}/>
    <circle cx="-9" cy="-14" r="3.5" {...SKF}/><circle cx="-9" cy="-14" r="1.4" fill={TEAL} stroke="none"/>
    <circle cx="9" cy="-14" r="3.5" {...SKF}/><circle cx="9" cy="-14" r="1.4" fill={TEAL} stroke="none"/>
    <path d="M-4,-4 Q0,0 4,-4" {...SKT}/>
    <path d="M-22,8 Q-30,24 -26,40 Q-22,52 -26,62" {...SK}/>
    <path d="M-14,10 Q-18,28 -14,44 Q-10,56 -14,66" {...SK}/>
    <path d="M-6,12 Q-8,30 -6,46 Q-4,58 -8,68" {...SK}/>
    <path d="M4,12 Q6,30 4,46 Q2,58 6,68" {...SK}/>
    <path d="M12,10 Q16,28 12,44 Q8,56 12,66" {...SK}/>
    <path d="M20,8 Q26,24 22,40 Q18,52 22,62" {...SK}/>
    <path d="M-18,-22 Q-14,-32 -8,-28" {...SKT}/><path d="M18,-22 Q14,-32 8,-28" {...SKT}/>
  </g>
);

const SketchScallop = ({ x=0, y=0, scale=1, opacity=0.25 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
    <path d="M-28,6 Q-28,-14 0,-20 Q28,-14 28,6 Q28,26 0,32 Q-28,26 -28,6Z" {...SKF}/>
    <path d="M0,-20 L0,32" {...SKT}/><path d="M-18,-16 L-18,30" {...SKT}/><path d="M18,-16 L18,30" {...SKT}/>
    <path d="M-26,-4 Q0,-12 26,-4" {...SKT}/><path d="M-28,6 Q0,-2 28,6" {...SKT}/>
    <path d="M-26,16 Q0,8 26,16" {...SKT}/><path d="M-24,24 Q0,16 24,24" {...SKT}/>
    <ellipse cx="0" cy="-20" rx="6" ry="3" {...SKF}/>
  </g>
);

const SketchMussel = ({ x=0, y=0, scale=1, opacity=0.25 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
    <path d="M0,-30 Q22,-28 30,-10 Q34,10 22,26 Q10,40 -8,38 Q-26,34 -30,16 Q-34,-4 -22,-20 Q-12,-32 0,-30Z" {...SKF}/>
    <path d="M0,-30 L-2,36" {...SKT}/>
    <path d="M-28,-4 Q0,-14 30,-4" {...SKT}/><path d="M-32,10 Q0,-2 32,10" {...SKT}/><path d="M-26,24 Q0,14 24,24" {...SKT}/>
    <ellipse cx="0" cy="-30" rx="7" ry="3.5" {...SKF}/>
  </g>
);

const SketchLobster = ({ x=0, y=0, scale=1, opacity=0.25, flip=false }) => (
  <g transform={`translate(${x},${y}) scale(${flip?-scale:scale},${scale})`} opacity={opacity}>
    <path d="M0,0 Q22,-4 30,10 Q36,24 28,38 Q18,52 2,56 Q-14,58 -24,46 Q-34,32 -28,16 Q-20,0 0,0Z" {...SKF}/>
    <path d="M-30,18 Q-46,12 -48,2 Q-46,-10 -34,-8 Q-24,-2 -22,12" {...SKF}/>
    <path d="M-34,-8 Q-36,-14 -30,-16 Q-22,-16 -22,0" {...SKF}/>
    <path d="M-28,40 Q-32,54 -26,64" {...SKF}/><path d="M-18,44 Q-20,58 -16,66" {...SKF}/>
    <path d="M-8,46 Q-8,60 -6,66" {...SKF}/><path d="M4,44 Q6,58 6,64" {...SKF}/><path d="M14,40 Q18,52 16,60" {...SKF}/>
    <circle cx="24" cy="-2" r="5.5" {...SKF}/><circle cx="24" cy="-2" r="2.2" fill={TEAL} stroke="none"/>
    <path d="M30,-6 Q44,-18 56,-30" {...SKT}/><path d="M28,-4 Q40,-20 50,-32" {...SKT}/>
    <path d="M-30,22 Q-40,28 -46,36" {...SKT}/><path d="M-28,30 Q-38,36 -42,46" {...SKT}/><path d="M-28,36 Q-36,42 -38,52" {...SKT}/>
    <path d="M-8,54 Q-4,38 6,22" {...SKT}/><path d="M-16,52 Q-12,36 -2,20" {...SKT}/>
  </g>
);

const SketchStarfish = ({ x=0, y=0, scale=1, opacity=0.25 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
    <path d="M0,-30 L5,-8 L26,-18 L10,-2 L30,8 L8,8 L14,30 L0,14 L-14,30 L-8,8 L-30,8 L-10,-2 L-26,-18 L-5,-8 Z" {...SKF}/>
    <path d="M0,-30 L0,14" {...SKT}/><path d="M26,-18 L-14,30" {...SKT}/><path d="M-26,-18 L14,30" {...SKT}/>
    <circle cx="0" cy="0" r="6" {...SKF}/>
  </g>
);

// ── 8 creatures cycling through menu ──
const CREATURES = [
  (p) => <SketchCrab {...p}/>,
  (p) => <SketchShrimp {...p}/>,
  (p) => <SketchFish {...p}/>,
  (p) => <SketchOctopus {...p}/>,
  (p) => <SketchScallop {...p}/>,
  (p) => <SketchMussel {...p}/>,
  (p) => <SketchLobster {...p}/>,
  (p) => <SketchStarfish {...p}/>,
];

// ── Divider with creature between dishes ──
const CreatureDivider = ({ index }) => {
  const Creature = CREATURES[index % CREATURES.length];
  const flip = index % 3 === 1;
  const side = index % 2 === 0 ? "left" : "right";
  const W = 340;
  const cx = side === "left" ? 54 : W - 54;
  return (
    <div style={{ position:"relative", height:54, overflow:"hidden" }}>
      <svg viewBox={`0 0 ${W} 54`} style={{ width:"100%", height:"100%", display:"block" }}>
        <path d={`M0,27 Q${W*0.25},18 ${W*0.5},27 Q${W*0.75},36 ${W},27`}
          fill="none" stroke={TEAL} strokeWidth="0.65" opacity="0.22"/>
        <circle cx={W*0.5} cy={27} r="2.2" fill={SAND} opacity="0.5"/>
        <circle cx={W*0.25} cy={27} r="1.2" fill={TEAL} opacity="0.28"/>
        <circle cx={W*0.75} cy={27} r="1.2" fill={TEAL} opacity="0.28"/>
        <Creature x={cx} y={27} scale={0.5} opacity={0.3} flip={flip}/>
      </svg>
    </div>
  );
};

// ── Full-page sketch background ──
const SeafoodSketchBg = ({ opacity=0.18 }) => (
  <svg viewBox="0 0 480 820" preserveAspectRatio="xMidYMid slice"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
    <g opacity={opacity}>
      <rect x="0" y="0" width="38" height="38" fill="rgba(74,143,168,0.15)" stroke="none"/>
      <rect x="442" y="0" width="38" height="38" fill="rgba(74,143,168,0.15)" stroke="none"/>
      <rect x="0" y="782" width="38" height="38" fill="rgba(74,143,168,0.15)" stroke="none"/>
      <rect x="442" y="782" width="38" height="38" fill="rgba(74,143,168,0.15)" stroke="none"/>
      <rect x="38" y="38" width="404" height="744" fill="none" stroke={TEAL} strokeWidth="0.7" opacity="0.5"/>
      <SketchCrab x={82} y={88} scale={1.1} opacity={1}/>
      <SketchShrimp x={392} y={740} scale={1.25} opacity={1} flip/>
      <SketchScallop x={418} y={60} scale={0.8} opacity={1}/>
      <SketchFish x={108} y={718} scale={0.85} opacity={1}/>
      <SketchStarfish x={424} y={400} scale={0.68} opacity={1}/>
      <SketchMussel x={50} y={430} scale={0.75} opacity={1}/>
      <circle cx="432" cy="355" r="4" fill="none" stroke={TEAL} strokeWidth="0.55" opacity="0.5"/>
      <circle cx="442" cy="338" r="2.5" fill="none" stroke={TEAL} strokeWidth="0.55" opacity="0.4"/>
      <circle cx="60" cy="288" r="3" fill="none" stroke={TEAL} strokeWidth="0.55" opacity="0.45"/>
      <line x1="60" y1="38" x2="200" y2="38" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3,7" opacity="0.4"/>
      <line x1="280" y1="38" x2="442" y2="38" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3,7" opacity="0.4"/>
      <line x1="60" y1="782" x2="200" y2="782" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3,7" opacity="0.4"/>
      <line x1="280" y1="782" x2="442" y2="782" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3,7" opacity="0.4"/>
    </g>
  </svg>
);

const HeroWaves = () => (
  <svg viewBox="0 0 480 220" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
    <path d="M-20,32 Q60,14 140,32 Q220,50 300,28 Q380,6 500,28" fill="none" stroke={TEAL} strokeWidth="0.7" opacity="0.22"/>
    <path d="M-20,48 Q80,32 160,48 Q240,64 320,44 Q400,24 520,46" fill="none" stroke={TEAL} strokeWidth="0.5" opacity="0.13"/>
    <path d="M-20,158 Q60,138 140,158 Q220,178 300,156 Q380,134 500,156" fill="none" stroke={TEAL} strokeWidth="0.7" opacity="0.22"/>
    <circle cx="60" cy="90" r="1.5" fill="none" stroke={TEAL} strokeWidth="0.6" opacity="0.15"/>
    <circle cx="420" cy="110" r="1.5" fill="none" stroke={TEAL} strokeWidth="0.6" opacity="0.15"/>
  </svg>
);

const WaveDivider = () => (
  <div style={{padding:"20px 20px 0",opacity:0.4}}>
    <svg viewBox="0 0 480 20" style={{width:"100%"}}>
      <path d="M0,10 Q30,2 60,10 Q90,18 120,10 Q150,2 180,10 Q210,18 240,10 Q270,2 300,10 Q330,18 360,10 Q390,2 420,10 Q450,18 480,10" fill="none" stroke={TEAL} strokeWidth="1.2"/>
      <circle cx="240" cy="10" r="2.5" fill={SAND}/>
      <circle cx="120" cy="10" r="1.5" fill={TEAL} opacity={0.5}/>
      <circle cx="360" cy="10" r="1.5" fill={TEAL} opacity={0.5}/>
    </svg>
  </div>
);

// ===================== TRADUCCIONES =====================
const T = {
  es: { flag:"🇪🇸", langName:"Español",   todo:"Todo", oferta:"Chef recomienda", efectivo:"Efectivo", tarjeta:"Tarjeta", precios:"Precios en pesos argentinos · IVA incluido", verPedido:"🛒 Carrito", tuPedido:"Tu pedido", revisaPedido:"Revisá tu pedido", mostrarMozo:"¡Listo! Mostrá esta pantalla al mozo", instruccion:"El mozo tomará nota de tu pedido", carritoVacio:"Tu carrito está vacío", verMenu:"Ver menú", confirmar:"Confirmar y llamar al mozo", volver:"← Volver", cu:"c/u", item:"item", items:"items", nuevoPedido:"Nuevo pedido", encuesta:"¿Cómo fue tu experiencia?", enviarEncuesta:"Enviar opinión", saltarEncuesta:"Saltar", graciasEncuesta:"¡Gracias! 🙏" },
  en: { flag:"🇬🇧", langName:"English",   todo:"All",  oferta:"Chef recommends", efectivo:"Cash", tarjeta:"Card", precios:"Prices in Argentine pesos · VAT included", verPedido:"🛒 Cart", tuPedido:"Your order", revisaPedido:"Review your order", mostrarMozo:"Done! Show this screen to the waiter", instruccion:"The waiter will take note of your order", carritoVacio:"Your cart is empty", verMenu:"See menu", confirmar:"Confirm & call waiter", volver:"← Back", cu:"each", item:"item", items:"items", nuevoPedido:"New order", encuesta:"How was your experience?", enviarEncuesta:"Send feedback", saltarEncuesta:"Skip", graciasEncuesta:"Thanks! 🙏" },
  pt: { flag:"🇧🇷", langName:"Português", todo:"Tudo", oferta:"Chef recomenda", efectivo:"Dinheiro", tarjeta:"Cartão", precios:"Preços em pesos argentinos · IVA incluído", verPedido:"🛒 Carrinho", tuPedido:"Seu pedido", revisaPedido:"Revise seu pedido", mostrarMozo:"Pronto! Mostre esta tela ao garçom", instruccion:"O garçom anotará seu pedido", carritoVacio:"Seu carrinho está vazio", verMenu:"Ver cardápio", confirmar:"Confirmar e chamar o garçom", volver:"← Voltar", cu:"un.", item:"item", items:"itens", nuevoPedido:"Novo pedido", encuesta:"Como foi sua experiência?", enviarEncuesta:"Enviar opinião", saltarEncuesta:"Pular", graciasEncuesta:"Obrigado! 🙏" },
  it: { flag:"🇮🇹", langName:"Italiano",  todo:"Tutto", oferta:"Lo chef consiglia", efectivo:"Contanti", tarjeta:"Carta", precios:"Prezzi in pesos argentini · IVA inclusa", verPedido:"🛒 Carrello", tuPedido:"Il tuo ordine", revisaPedido:"Rivedi il tuo ordine", mostrarMozo:"Fatto! Mostra questo schermo al cameriere", instruccion:"Il cameriere prenderà nota del tuo ordine", carritoVacio:"Il carrello è vuoto", verMenu:"Vedi menù", confirmar:"Conferma e chiama il cameriere", volver:"← Torna", cu:"cad.", item:"articolo", items:"articoli", nuevoPedido:"Nuovo ordine", encuesta:"Com'è stata la tua esperienza?", enviarEncuesta:"Invia opinione", saltarEncuesta:"Salta", graciasEncuesta:"Grazie! 🙏" },
  fr: { flag:"🇫🇷", langName:"Français",  todo:"Tout", oferta:"Le chef recommande", efectivo:"Espèces", tarjeta:"Carte", precios:"Prix en pesos argentins · TVA incluse", verPedido:"🛒 Panier", tuPedido:"Votre commande", revisaPedido:"Vérifiez votre commande", mostrarMozo:"Prêt ! Montrez cet écran au serveur", instruccion:"Le serveur notera votre commande", carritoVacio:"Votre panier est vide", verMenu:"Voir le menu", confirmar:"Confirmer et appeler le serveur", volver:"← Retour", cu:"p/u", item:"article", items:"articles", nuevoPedido:"Nouvelle commande", encuesta:"Comment était votre expérience ?", enviarEncuesta:"Envoyer l'avis", saltarEncuesta:"Passer", graciasEncuesta:"Merci ! 🙏" },
  ru: { flag:"🇷🇺", langName:"Русский",   todo:"Всё",  oferta:"Рекомендует шеф", efectivo:"Наличные", tarjeta:"Карта", precios:"Цены в аргентинских песо · НДС включён", verPedido:"🛒 Корзина", tuPedido:"Ваш заказ", revisaPedido:"Проверьте ваш заказ", mostrarMozo:"Готово! Покажите экран официанту", instruccion:"Официант запишет ваш заказ", carritoVacio:"Корзина пуста", verMenu:"Смотреть меню", confirmar:"Подтвердить и позвать официанта", volver:"← Назад", cu:"шт.", item:"позиция", items:"позиции", nuevoPedido:"Новый заказ", encuesta:"Как вам наше меню?", enviarEncuesta:"Отправить отзыв", saltarEncuesta:"Пропустить", graciasEncuesta:"Спасибо! 🙏" },
};

const NUMERALS = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

const MENU = [
  { categoria:"Entradas", nombre:"Ceviche clásico",      descripcion:"Langostinos frescos, limón, cilantro, cebolla roja y ají",            precio:2800, disponible:true, emoji:"🍋", promo:true,  t:{ en:["Classic ceviche","Fresh shrimp, lemon, cilantro, red onion and chili"], pt:["Ceviche clássico","Camarões frescos, limão, coentro, cebola roxa"], it:["Ceviche classico","Gamberi freschi, limone, coriandolo, cipolla rossa"], fr:["Ceviche classique","Crevettes fraîches, citron, coriandre, oignon rouge"], ru:["Классический севиче","Свежие креветки, лимон, кинза, красный лук"] } },
  { categoria:"Entradas", nombre:"Pulpo a la parrilla",   descripcion:"Chimichurri de hierbas frescas y papas al olivo",                     precio:3200, disponible:true, emoji:"🐙", promo:false, t:{ en:["Grilled octopus","Fresh herb chimichurri and olive oil potatoes"], pt:["Polvo grelhado","Chimichurri de ervas frescas e batatas ao azeite"], it:["Polpo alla griglia","Chimichurri alle erbe fresche e patate all'olio"], fr:["Poulpe grillé","Chimichurri aux herbes fraîches et pommes de terre"], ru:["Осьминог на гриле","Чимичурри с травами и картофель с оливками"] } },
  { categoria:"Pescados", nombre:"Merluza al limón",      descripcion:"Filete, manteca de limón, alcaparras y arroz blanco",                 precio:3800, disponible:true, emoji:"🐟", promo:false, t:{ en:["Lemon hake","Fillet, lemon butter, capers and white rice"], pt:["Merluza ao limão","Filé, manteiga de limão, alcaparras e arroz"], it:["Merluzzo al limone","Filetto, burro al limone, capperi e riso"], fr:["Merlu au citron","Filet, beurre citronné, câpres et riz blanc"], ru:["Хек с лимоном","Филе, лимонное масло, каперсы и белый рис"] } },
  { categoria:"Pescados", nombre:"Salmón a la plancha",   descripcion:"Rúcula, palta y aderezo de mostaza antigua",                          precio:4500, disponible:true, emoji:"🍣", promo:true,  t:{ en:["Pan-seared salmon","Arugula, avocado and whole grain mustard dressing"], pt:["Salmão grelhado","Rúcula, abacate e molho de mostarda à antiga"], it:["Salmone alla piastra","Rucola, avocado e vinaigrette alla senape"], fr:["Saumon poêlé","Roquette, avocat et vinaigrette à la moutarde"], ru:["Жареный лосось","Руккола, авокадо и соус из зернистой горчицы"] } },
  { categoria:"Mariscos", nombre:"Cazuela de mariscos",   descripcion:"Mejillones, almejas, langostinos en caldo de azafrán",                precio:5200, disponible:true, emoji:"🦞", promo:false, t:{ en:["Seafood casserole","Mussels, clams, shrimp in saffron broth"], pt:["Caldeirada de frutos do mar","Mexilhões, amêijoas, camarões em açafrão"], it:["Zuppa di mare","Cozze, vongole, gamberi in brodo allo zafferano"], fr:["Cassolette de fruits de mer","Moules, palourdes, crevettes au safran"], ru:["Рагу из морепродуктов","Мидии, моллюски, креветки в шафрановом бульоне"] } },
  { categoria:"Mariscos", nombre:"Paella de mariscos",    descripcion:"Arroz bomba, langostinos, mejillones y calamares",                    precio:4800, disponible:true, emoji:"🥘", promo:true,  t:{ en:["Seafood paella","Bomba rice, shrimp, mussels and squid"], pt:["Paella de frutos do mar","Arroz bomba, camarões, mexilhões e lulas"], it:["Paella di mare","Riso bomba, gamberi, cozze e calamari"], fr:["Paella aux fruits de mer","Riz bomba, crevettes, moules et calamars"], ru:["Паэлья с морепродуктами","Рис бомба, креветки, мидии и кальмары"] } },
  { categoria:"Bebidas",  nombre:"Vino blanco Torrontés", descripcion:"Copa, notas de jazmín y durazno",                                     precio:1200, disponible:true, emoji:"🥂", promo:false, t:{ en:["Torrontés white wine","Glass, jasmine and peach notes"], pt:["Vinho branco Torrontés","Taça, notas de jasmim e pêssego"], it:["Vino bianco Torrontés","Calice, note di gelsomino e pesca"], fr:["Vin blanc Torrontés","Verre, notes de jasmin et pêche"], ru:["Белое вино Торронтес","Бокал, нотки жасмина и персика"] } },
  { categoria:"Bebidas",  nombre:"Agua con gas marina",   descripcion:"Mineral, limón y hierbabuena",                                        precio:600,  disponible:true, emoji:"💧", promo:false, t:{ en:["Marine sparkling water","Mineral, lemon and mint"], pt:["Água com gás marinha","Mineral, limão e hortelã"], it:["Acqua frizzante marina","Minerale, limone e menta"], fr:["Eau pétillante marine","Minérale, citron et menthe"], ru:["Морская газированная вода","Минеральная, лимон и мята"] } },
  { categoria:"Postres",  nombre:"Panna cotta de coco",   descripcion:"Coulis de mango y ralladura de lima",                                 precio:1800, disponible:true, emoji:"🥥", promo:false, t:{ en:["Coconut panna cotta","Mango coulis and lime zest"], pt:["Panna cotta de coco","Coulis de manga e raspas de lima"], it:["Panna cotta al cocco","Coulis di mango e scorza di lime"], fr:["Panna cotta coco","Coulis de mangue et zeste de citron vert"], ru:["Панна-котта с кокосом","Манговый кули и цедра лайма"] } },
  { categoria:"Postres",  nombre:"Tarta de limón",        descripcion:"Masa sablé, crema de limón y merengue italiano",                      precio:1600, disponible:true, emoji:"🍋", promo:true,  t:{ en:["Lemon tart","Shortcrust pastry, lemon cream and Italian meringue"], pt:["Torta de limão","Massa sablé, creme de limão e merengue italiano"], it:["Crostata al limone","Pasta sablé, crema al limone e meringa italiana"], fr:["Tarte au citron","Pâte sablée, crème au citron et meringue italienne"], ru:["Лимонный тарт","Песочное тесто, лимонный крем и меренга"] } },
];

const CAT_T = {
  "Entradas":{en:"Starters",  pt:"Entradas",     it:"Antipasti",      fr:"Entrées",       ru:"Закуски"},
  "Pescados":{en:"Fish",      pt:"Peixes",        it:"Pesci",          fr:"Poissons",      ru:"Рыба"},
  "Mariscos":{en:"Seafood",   pt:"Frutos do mar", it:"Frutti di mare", fr:"Fruits de mer", ru:"Морепродукты"},
  "Bebidas": {en:"Drinks",    pt:"Bebidas",       it:"Bevande",        fr:"Boissons",      ru:"Напитки"},
  "Postres": {en:"Desserts",  pt:"Sobremesas",    it:"Dolci",          fr:"Desserts",      ru:"Десерты"},
};

function formatPeso(n){return "$"+n.toLocaleString("es-AR");}

const STORAGE_KEY = CONFIG.storageKey;
function loadSurveys(){try{const d=localStorage.getItem(STORAGE_KEY);return d?JSON.parse(d):[];}catch{return[];}}
function saveSurvey(s){
  try{const a=loadSurveys();a.push(s);localStorage.setItem(STORAGE_KEY,JSON.stringify(a));}catch{}
  try{fetch(CONFIG.sheetsUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});}catch{}
}

function Fireworks(){
  const p=Array.from({length:12},(_,i)=>i);
  return(<div style={{position:"relative",height:80,overflow:"visible",marginBottom:8}}>
    <style>{`${p.map(i=>{const a=(i/12)*360,r=a*(Math.PI/180),x=Math.cos(r)*60,y=Math.sin(r)*60;return`@keyframes b${i}{0%{transform:translate(0,0) scale(0);opacity:1}100%{transform:translate(${x}px,${y}px) scale(1.2);opacity:0}}.fw${i}{animation:b${i} 1.2s ease-out ${(i*0.08).toFixed(2)}s infinite;}`;}).join("")}`}</style>
    {p.map(i=>{const c=[TEAL,SAND,NAVY,"#27ae60","#e74c3c",TEAL2][i%6];const s=i%3===0?10:i%3===1?8:6;return<div key={i} className={`fw${i}`} style={{position:"absolute",left:"calc(50% - 5px)",top:"calc(50% - 5px)",width:s,height:s,borderRadius:"50%",background:c}}/>;})}</div>);
}

const ENC_T={titulo:{es:"¿Cómo fue tu experiencia?",en:"How was your experience?",pt:"Como foi sua experiência?",it:"Com'è stata la tua esperienza?",fr:"Comment était votre expérience ?",ru:"Как вам наше меню?"},sub:{es:"Tu opinión nos ayuda a mejorar",en:"Your feedback helps us improve",pt:"Sua opinião nos ajuda a melhorar",it:"La tua opinione ci aiuta a migliorare",fr:"Votre avis nous aide à améliorer",ru:"Ваше мнение помогает нам стать лучше"},q1:{es:"¿Cómo calificás el menú?",en:"How do you rate the menu?",pt:"Como você avalia o cardápio?",it:"Come valuti il menù?",fr:"Comment évaluez-vous le menu ?",ru:"Как вы оцениваете меню?"},q2:{es:"¿El menú en tu idioma fue útil?",en:"Was the menu in your language helpful?",pt:"O cardápio no seu idioma foi útil?",it:"Il menù nella tua lingua è stato utile?",fr:"Le menu dans votre langue était-il utile ?",ru:"Меню на вашем языке было полезным?"},q2a:{es:"🌍 Sí, mucho",en:"🌍 Yes, very much",pt:"🌍 Sim, muito",it:"🌍 Sì, molto",fr:"🌍 Oui, beaucoup",ru:"🌍 Да, очень"},q2b:{es:"🤔 Más o menos",en:"🤔 Somewhat",pt:"🤔 Mais ou menos",it:"🤔 Abbastanza",fr:"🤔 Un peu",ru:"🤔 Частично"},q2c:{es:"❌ No tanto",en:"❌ Not really",pt:"❌ Não muito",it:"❌ Non molto",fr:"❌ Pas vraiment",ru:"❌ Не очень"},q3:{es:"¿Qué tan fácil fue navegar?",en:"How easy was it to navigate?",pt:"Foi fácil navegar?",it:"È stato facile navigare?",fr:"Était-il facile de naviguer ?",ru:"Удобно ли было пользоваться?"},q3a:{es:"😊 Muy fácil",en:"😊 Very easy",pt:"😊 Muito fácil",it:"😊 Molto facile",fr:"😊 Très facile",ru:"😊 Очень удобно"},q3b:{es:"🙂 Normal",en:"🙂 Normal",pt:"🙂 Normal",it:"🙂 Normale",fr:"🙂 Normal",ru:"🙂 Нормально"},q3c:{es:"😕 Me confundí",en:"😕 Got confused",pt:"😕 Me confundi",it:"😕 Mi sono confuso",fr:"😕 Je me suis perdu",ru:"😕 Запутался"},q4:{es:"¿Usarías este menú de nuevo?",en:"Would you use this menu again?",pt:"Usaria este cardápio de novo?",it:"Useresti di nuovo questo menù?",fr:"Utiliseriez-vous ce menu à nouveau ?",ru:"Воспользовались бы снова?"},q4a:{es:"👍 Sí, claro",en:"👍 Yes, definitely",pt:"👍 Sim, claro",it:"👍 Sì, certo",fr:"👍 Oui, bien sûr",ru:"👍 Да, конечно"},q4b:{es:"📄 Prefiero papel",en:"📄 Prefer paper",pt:"📄 Prefiro papel",it:"📄 Preferisco carta",fr:"📄 Je préfère papier",ru:"📄 Предпочитаю бумажное"},q4c:{es:"🤷 Me da igual",en:"🤷 Doesn't matter",pt:"🤷 Tanto faz",it:"🤷 Non importa",fr:"🤷 Peu importe",ru:"🤷 Всё равно"},q5:{es:"Comentario (opcional)",en:"Comment (optional)",pt:"Comentário (opcional)",it:"Commento (opzionale)",fr:"Commentaire (optionnel)",ru:"Комментарий (необязательно)"},enviar:{es:"Enviar opinión",en:"Send feedback",pt:"Enviar opinião",it:"Invia opinione",fr:"Envoyer l'avis",ru:"Отправить отзыв"},saltar:{es:"Saltar",en:"Skip",pt:"Pular",it:"Salta",fr:"Passer",ru:"Пропустить"},gracias:{es:"¡Gracias! 🙏",en:"Thanks! 🙏",pt:"Obrigado! 🙏",it:"Grazie! 🙏",fr:"Merci ! 🙏",ru:"Спасибо! 🙏"}};
function et(k,l){return ENC_T[k][l]??ENC_T[k].es;}

function Encuesta({lang,onSubmit,onSkip}){
  const [estrellas,setEstrellas]=useState(0);const[hoverStar,setHoverStar]=useState(0);
  const[idiomaUtil,setIdiomaUtil]=useState("");const[comodidad,setComodidad]=useState("");
  const[volveria,setVolveria]=useState("");const[comentario,setComentario]=useState("");
  const[enviado,setEnviado]=useState(false);
  function handleSubmit(){const s={estrellas,idioma_util:idiomaUtil,comodidad,volveria,comentario,lang,fecha:new Date().toLocaleString("es-AR")};saveSurvey(s);setEnviado(true);setTimeout(()=>onSubmit(s),1500);}
  const btnS=(active,col)=>({flex:1,padding:"12px 6px",border:`1px solid ${active?col:BORDER}`,background:active?col:"transparent",color:active?WHITE:MUTED,fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all 0.2s",borderRadius:4});
  if(enviado)return(<div style={{textAlign:"center",padding:"60px 20px",background:CREAM,minHeight:"100vh",fontFamily:"'Jost',sans-serif"}}><style>{FONTS}</style><div style={{fontSize:48,marginBottom:12}}>🐚</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontStyle:"italic",color:TEAL2}}>{et("gracias",lang)}</div></div>);
  return(
    <div style={{background:CREAM,minHeight:"100vh",fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,paddingBottom:60}}>
      <style>{FONTS}</style>
      <div style={{height:4,background:`linear-gradient(to right,${TEAL},${TEAL2},${TEAL})`,opacity:0.7}}/>
      <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"28px 24px 22px",textAlign:"center"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontStyle:"italic",color:NAVY,marginBottom:4}}>{et("titulo",lang)}</div>
        <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase"}}>{et("sub",lang)}</div>
      </div>
      <div style={{padding:"24px 20px",display:"flex",flexDirection:"column",gap:14,maxWidth:480,margin:"0 auto"}}>
        <div style={{background:WHITE,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{et("q1",lang)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>{[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setEstrellas(n)} onMouseEnter={()=>setHoverStar(n)} onMouseLeave={()=>setHoverStar(0)} style={{background:"none",border:"none",cursor:"pointer",fontSize:40,lineHeight:1,transition:"transform 0.15s",transform:(hoverStar||estrellas)>=n?"scale(1.2)":"scale(1)",filter:(hoverStar||estrellas)>=n?"none":"grayscale(1) opacity(0.25)",flex:1,padding:"6px 0",touchAction:"manipulation"}}>⭐</button>))}</div>
        </div>
        {[{label:et("q2",lang),state:idiomaUtil,set:setIdiomaUtil,opts:[{id:"si",l:"q2a"},{id:"mas_o_menos",l:"q2b"},{id:"no",l:"q2c"}],col:TEAL2},{label:et("q3",lang),state:comodidad,set:setComodidad,opts:[{id:"muy_facil",l:"q3a"},{id:"normal",l:"q3b"},{id:"confuso",l:"q3c"}],col:"#27ae60"},{label:et("q4",lang),state:volveria,set:setVolveria,opts:[{id:"si",l:"q4a"},{id:"papel",l:"q4b"},{id:"igual",l:"q4c"}],col:NAVY}].map((q,qi)=>(
          <div key={qi} style={{background:WHITE,padding:"20px",border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{q.label}</div>
            <div style={{display:"flex",gap:8}}>{q.opts.map(op=>(<button key={op.id} onClick={()=>q.set(op.id)} style={btnS(q.state===op.id,q.col)}><span style={{fontSize:18}}>{et(op.l,lang).split(" ")[0]}</span><span style={{fontSize:10}}>{et(op.l,lang).split(" ").slice(1).join(" ")}</span></button>))}</div>
          </div>
        ))}
        <div style={{background:WHITE,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:10}}>{et("q5",lang)}</div>
          <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="..." rows={3} style={{width:"100%",padding:"12px",background:CREAM,border:`1px solid ${BORDER}`,color:NAVY,fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box"}}/>
        </div>
        <button onClick={handleSubmit} disabled={estrellas===0} style={{width:"100%",padding:"15px",background:estrellas>0?TEAL2:"#ccc",color:WHITE,border:"none",fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",cursor:estrellas>0?"pointer":"not-allowed",fontFamily:"inherit"}}>{et("enviar",lang)}</button>
        <button onClick={onSkip} style={{width:"100%",padding:"12px",background:"transparent",color:MUTED,border:`1px solid ${BORDER}`,fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{et("saltar",lang)}</button>
      </div>
    </div>
  );
}

function AdminPanel({onClose}){
  const surveys=loadSurveys();const total=surveys.length;
  const avg=total>0?(surveys.reduce((s,x)=>s+x.estrellas,0)/total).toFixed(1):"—";
  const stars=[1,2,3,4,5].map(n=>({n,count:surveys.filter(s=>s.estrellas===n).length}));
  const langs=(["es","en","pt","it","fr","ru"]).map(l=>({l,count:surveys.filter(s=>s.lang===l).length,flag:T[l].flag}));
  const comments=surveys.filter(s=>s.comentario?.trim().length>0);
  return(
    <div style={{minHeight:"100vh",background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,paddingBottom:40}}>
      <style>{FONTS}</style>
      <div style={{height:4,background:`linear-gradient(to right,${TEAL},${TEAL2},${TEAL})`,opacity:0.7}}/>
      <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:9,letterSpacing:4,color:MUTED,textTransform:"uppercase",marginBottom:4}}>Panel privado</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontStyle:"italic",color:NAVY}}>⚓ Resultados</div></div>
        <button onClick={onClose} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"7px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:10,letterSpacing:2}}>✕ CERRAR</button>
      </div>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:12,maxWidth:480,margin:"0 auto"}}>
        {total===0?(<div style={{textAlign:"center",padding:"60px 20px",color:MUTED}}><div style={{fontSize:40}}>📭</div><div style={{marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic"}}>Sin respuestas aún</div></div>):(
          <><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{background:WHITE,padding:"16px",textAlign:"center",border:`1px solid ${BORDER}`}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:TEAL2}}>{total}</div><div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginTop:4}}>Respuestas</div></div>
            <div style={{background:WHITE,padding:"16px",textAlign:"center",border:`1px solid ${BORDER}`}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:TEAL2}}>⭐{avg}</div><div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginTop:4}}>Promedio</div></div>
          </div>
          <div style={{background:WHITE,padding:"16px",border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>Distribución de estrellas</div>
            {[...stars].reverse().map(({n,count})=>(<div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:MUTED,minWidth:20}}>{n}★</span><div style={{flex:1,height:6,background:CREAM,overflow:"hidden"}}><div style={{height:"100%",width:total>0?`${(count/total)*100}%`:"0%",background:n>=4?SAND:TEAL,transition:"width 0.5s"}}/></div><span style={{fontSize:11,color:NAVY,minWidth:20,textAlign:"right"}}>{count}</span></div>))}
          </div>
          <div style={{background:WHITE,padding:"16px",border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>Idiomas</div>
            <div style={{display:"flex",gap:14,justifyContent:"center"}}>{langs.filter(l=>l.count>0).map(l=>(<div key={l.l} style={{textAlign:"center"}}><div style={{fontSize:24}}>{l.flag}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:TEAL2}}>{l.count}</div></div>))}</div>
          </div>
          {comments.length>0&&<div style={{background:WHITE,padding:"16px",border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>Comentarios recientes</div>
            {comments.slice(-5).reverse().map((s,i)=>(<div key={i} style={{borderBottom:`1px solid ${BORDER}`,padding:"10px 0"}}><div style={{fontSize:10,color:MUTED,marginBottom:4}}>{s.fecha} · {T[s.lang]?.flag} · {"⭐".repeat(s.estrellas)}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:"italic",color:NAVY}}>{s.comentario}</div></div>))}
          </div>}
          <button onClick={()=>{if(confirm("¿Borrar todos los datos?")){localStorage.removeItem(STORAGE_KEY);onClose();}}} style={{width:"100%",padding:"12px",background:"transparent",color:"#c0392b",border:"1px solid rgba(192,57,43,0.3)",fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>🗑️ Borrar todos los datos</button></>
        )}
      </div>
    </div>
  );
}

// ===================== APP =====================
export default function App(){
  const[lang,setLang]=useState("es");
  const[langSelected,setLangSelected]=useState(false);
  const[langAnim,setLangAnim]=useState(false);
  const[activeCategory,setActiveCategory]=useState("all");
  const[carrito,setCarrito]=useState([]);
  const[showCarrito,setShowCarrito]=useState(false);
  const[pedidoEnviado,setPedidoEnviado]=useState(false);
  const[showCheck,setShowCheck]=useState(false);
  const[showEncuesta,setShowEncuesta]=useState(false);
  const[showAdmin,setShowAdmin]=useState(false);
  const[adminTaps,setAdminTaps]=useState(0);
  const[loaded,setLoaded]=useState(false);

  useEffect(()=>{setTimeout(()=>setLoaded(true),150);},[]);
  useEffect(()=>{if(pedidoEnviado)setTimeout(()=>setShowCheck(true),100);else setShowCheck(false);},[pedidoEnviado]);

  function chooseLang(l){setLang(l);setLangAnim(true);setTimeout(()=>{setLangSelected(true);window.scrollTo(0,0);},500);}
  function handleFooterTap(){const n=adminTaps+1;setAdminTaps(n);if(n>=5){setShowAdmin(true);setAdminTaps(0);}}

  const t=T[lang];
  const totalItems=carrito.reduce((s,i)=>s+i.cantidad,0);
  const totalPrecio=carrito.reduce((s,i)=>s+i.precio*i.cantidad,0);

  function getNombre(item){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function getDesc(item){if(lang==="es")return item.descripcion;return item.t?.[lang]?.[1]??item.descripcion;}
  function getCat(cat){return cat==="all"?t.todo:(CAT_T[cat]?.[lang]??cat);}
  function getCartNombre(item){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function agregarItem(item){setCarrito(prev=>{const e=prev.find(c=>c.nombre===item.nombre);if(e)return prev.map(c=>c.nombre===item.nombre?{...c,cantidad:c.cantidad+1}:c);return[...prev,{nombre:item.nombre,emoji:item.emoji,precio:item.precio,cantidad:1,t:item.t}];});}
  function quitarItem(nombre){setCarrito(prev=>{const e=prev.find(c=>c.nombre===nombre);if(e&&e.cantidad>1)return prev.map(c=>c.nombre===nombre?{...c,cantidad:c.cantidad-1}:c);return prev.filter(c=>c.nombre!==nombre);});}
  function cantidadEnCarrito(nombre){return carrito.find(c=>c.nombre===nombre)?.cantidad||0;}
  function nuevosPedido(){setCarrito([]);setPedidoEnviado(false);setShowCarrito(false);setShowEncuesta(false);}

  const categories=["all",...Array.from(new Set(MENU.map(i=>i.categoria)))];
  const filtered=activeCategory==="all"?MENU:MENU.filter(i=>i.categoria===activeCategory);
  const grouped=filtered.reduce((acc,item)=>{if(!acc[item.categoria])acc[item.categoria]=[];acc[item.categoria].push(item);return acc;},{});

  if(!langSelected){
    const LANGS=[["es","🇪🇸","Bienvenido"],["en","🇬🇧","Welcome"],["pt","🇧🇷","Bem-vindo"],["it","🇮🇹","Benvenuto"],["fr","🇫🇷","Bienvenue"],["ru","🇷🇺","Добро пожаловать"]];
    return(
      <div style={{position:"fixed",inset:0,background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
        <style>{`${FONTS} @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <SeafoodSketchBg opacity={0.22}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:60,overflow:"hidden",opacity:0.3}}>
          <svg viewBox="0 0 480 60" style={{width:"100%",height:60}} preserveAspectRatio="none"><path d="M0,30 Q60,10 120,30 Q180,50 240,30 Q300,10 360,30 Q420,50 480,30 L480,0 L0,0 Z" fill={TEAL} opacity="0.3"/></svg>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,overflow:"hidden",opacity:0.3}}>
          <svg viewBox="0 0 480 60" style={{width:"100%",height:60}} preserveAspectRatio="none"><path d="M0,30 Q60,10 120,30 Q180,50 240,30 Q300,10 360,30 Q420,50 480,30 L480,60 L0,60 Z" fill={TEAL} opacity="0.3"/></svg>
        </div>
        <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:36,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          <div style={{fontSize:9,letterSpacing:6,color:TEAL,textTransform:"uppercase",marginBottom:12}}>⚓ {CONFIG.ciudad} ⚓</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:68,fontStyle:"italic",fontWeight:300,color:NAVY,lineHeight:0.88,marginBottom:16}}>{CONFIG.nombre}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
            <div style={{width:50,height:1,background:`linear-gradient(to right,transparent,${SAND})`}}/>
            <span style={{color:SAND,fontSize:12}}>⚓</span>
            <div style={{width:50,height:1,background:`linear-gradient(to left,transparent,${SAND})`}}/>
          </div>
          <div style={{fontSize:9,letterSpacing:4,color:MUTED,textTransform:"uppercase"}}>Elegí tu idioma · Choose your language</div>
        </div>
        <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:8,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          {LANGS.map(([code,flag,sub],i)=>(
            <button key={code} onClick={()=>chooseLang(code)} style={{width:"100%",padding:"13px 20px",background:"rgba(247,244,238,0.88)",backdropFilter:"blur(8px)",border:`1px solid ${BORDER}`,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:14,animation:`fadeInUp 0.5s ease ${i*0.07}s both`,boxShadow:`0 1px 8px ${BORDER}`}}>
              <span style={{fontSize:26,lineHeight:1,flexShrink:0}}>{flag}</span>
              <div style={{textAlign:"left",flex:1}}>
                <div style={{fontSize:14,fontWeight:400,color:NAVY,letterSpacing:0.5}}>{T[code].langName}</div>
                <div style={{fontSize:11,color:MUTED,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>{sub}</div>
              </div>
              <span style={{color:TEAL,fontSize:16,flexShrink:0}}>›</span>
            </button>
          ))}
        </div>
        <div style={{position:"relative",zIndex:1,marginTop:24,fontSize:9,color:MUTED,letterSpacing:4,textTransform:"uppercase",opacity:langAnim?0:1,transition:"opacity 0.4s"}}>🐚 MENÚ DIGITAL 🐚</div>
      </div>
    );
  }

  if(showAdmin) return <AdminPanel onClose={()=>setShowAdmin(false)}/>;

  if(showCarrito){
    if(showEncuesta) return(<div style={{background:CREAM,minHeight:"100vh",width:"100%"}}><Encuesta lang={lang} onSubmit={()=>{setShowEncuesta(false);nuevosPedido();}} onSkip={()=>{setShowEncuesta(false);nuevosPedido();}}/></div>);
    return(
      <div style={{background:CREAM,minHeight:"100vh",width:"100%",fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,display:"flex",flexDirection:"column"}}>
        <style>{FONTS}</style>
        <div style={{height:4,background:`linear-gradient(to right,${TEAL},${TEAL2},${TEAL})`,opacity:0.7,flexShrink:0}}/>
        <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <button onClick={()=>setShowCarrito(false)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:9,letterSpacing:2,textTransform:"uppercase"}}>{t.volver}</button>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:NAVY}}>{t.tuPedido}</div>
          <div style={{width:80}}/>
        </div>
        {pedidoEnviado?(
          <div style={{padding:"40px 20px",textAlign:"center",flex:1}}>
            {showCheck&&<Fireworks/>}
            <div style={{fontSize:52,margin:"16px 0"}}>🎉</div>
            <div style={{background:WHITE,padding:"20px",margin:"20px 0",border:`1px solid rgba(74,143,168,0.25)`}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:TEAL2,marginBottom:6}}>{t.mostrarMozo}</div>
              <div style={{fontSize:11,color:MUTED,letterSpacing:0.5}}>{t.instruccion}</div>
            </div>
            <div style={{background:WHITE,padding:"16px",marginBottom:16,border:`1px solid ${BORDER}`,textAlign:"left"}}>
              <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>📋 Detalle del pedido</div>
              {carrito.map((item,i)=>(<div key={i} style={{display:"flex",alignItems:"baseline",gap:8,padding:"8px 0",borderBottom:`1px solid ${BORDER}`}}><span style={{fontSize:13,color:NAVY,flex:1}}>{item.nombre} ×{item.cantidad}</span><div style={{flex:1,borderBottom:`1px dotted ${BORDER}`,marginBottom:4}}/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:TEAL2,flexShrink:0}}>{formatPeso(item.precio*item.cantidad)}</span></div>))}
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:12,paddingTop:10,borderTop:`1px solid ${TEAL}30`}}><span style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",flex:1}}>TOTAL</span><div style={{flex:1,borderBottom:`1px dotted ${BORDER}`,marginBottom:4}}/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:TEAL2}}>{formatPeso(totalPrecio)}</span></div>
            </div>
            <button onClick={()=>setShowEncuesta(true)} style={{width:"100%",padding:"14px",background:TEAL2,color:WHITE,border:"none",fontSize:9,fontWeight:500,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>💬 {t.encuesta}</button>
            <button onClick={nuevosPedido} style={{width:"100%",padding:"12px",background:"transparent",color:MUTED,border:`1px solid ${BORDER}`,fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.nuevoPedido}</button>
          </div>
        ):(
          <div style={{padding:"20px",flex:1}}>
            <div style={{fontSize:9,letterSpacing:2,color:MUTED,textTransform:"uppercase",marginBottom:20}}>{t.revisaPedido}</div>
            {carrito.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:MUTED}}>
                <div style={{fontSize:40}}>🐚</div>
                <div style={{marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontStyle:"italic",color:NAVY}}>{t.carritoVacio}</div>
                <button onClick={()=>setShowCarrito(false)} style={{marginTop:20,padding:"10px 28px",background:TEAL2,color:WHITE,border:"none",fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.verMenu}</button>
              </div>
            ):(
              <>
                {carrito.map((item,idx)=>(<div key={idx} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${BORDER}`}}>
                  <span style={{fontSize:20}}>{item.emoji}</span>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:NAVY}}>{getCartNombre(item)}</div><div style={{fontSize:11,color:MUTED,marginTop:1}}>{formatPeso(item.precio)} {t.cu}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button onClick={()=>quitarItem(item.nombre)} style={{width:26,height:26,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:13,color:NAVY,minWidth:16,textAlign:"center"}}>{item.cantidad}</span>
                    <button onClick={()=>agregarItem(item)} style={{width:26,height:26,border:`1px solid ${TEAL}`,background:TEAL,color:WHITE,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:TEAL2,minWidth:70,textAlign:"right"}}>{formatPeso(item.precio*item.cantidad)}</div>
                </div>))}
                <div style={{display:"flex",alignItems:"baseline",gap:8,padding:"16px 0",borderTop:`1px solid ${TEAL}30`,marginTop:8}}><span style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",flex:1}}>TOTAL</span><div style={{flex:2,borderBottom:`1px dotted ${BORDER}`,marginBottom:4}}/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:TEAL2}}>{formatPeso(totalPrecio)}</span></div>
                <button onClick={()=>setPedidoEnviado(true)} style={{width:"100%",padding:"15px",background:TEAL2,color:WHITE,border:"none",fontSize:9,fontWeight:500,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:8}}>📋 {t.confirmar}</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── MENÚ PRINCIPAL ──
  let creatureCounter = 0;

  return(
    <div style={{background:CREAM,fontFamily:"'Jost',sans-serif",fontWeight:300,color:NAVY,minHeight:"100vh",maxWidth:480,margin:"0 auto",overflowX:"hidden",width:"100%"}}>
      <style>{`${FONTS}*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none;}html,body,#root{overflow-x:hidden;width:100%;}`}</style>
      <div style={{height:4,background:`linear-gradient(to right,${TEAL},${TEAL2},${TEAL})`,opacity:0.7}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:WHITE,borderBottom:`1px solid ${BORDER}`}}>
        <button onClick={()=>setLangSelected(false)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"5px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:10,display:"flex",alignItems:"center",gap:6,letterSpacing:0.5}}>
          <span>{T[lang].flag}</span><span>{T[lang].langName}</span>
        </button>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontStyle:"italic",color:MUTED,letterSpacing:1}}>⚓</div>
      </div>

      <div style={{position:"relative",padding:"44px 28px 40px",textAlign:"center",overflow:"hidden",background:WHITE}}>
        <HeroWaves/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:9,fontWeight:400,letterSpacing:5,textTransform:"uppercase",color:TEAL,marginBottom:10}}>🐚 {CONFIG.ciudad} · Argentina</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:80,fontWeight:300,fontStyle:"italic",color:NAVY,lineHeight:0.88,letterSpacing:"-1px",marginBottom:18}}>{CONFIG.nombre}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:10}}>
            <div style={{width:60,height:1,background:`linear-gradient(to right,transparent,${SAND})`}}/>
            <span style={{color:SAND,fontSize:13}}>⚓</span>
            <div style={{width:60,height:1,background:`linear-gradient(to left,transparent,${SAND})`}}/>
          </div>
          <div style={{fontSize:9,fontWeight:400,letterSpacing:5,textTransform:"uppercase",color:MUTED}}>{CONFIG.subtitulo}</div>
        </div>
      </div>

      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(247,244,238,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${BORDER}`,display:"flex",overflowX:"auto",scrollbarWidth:"none",padding:"0 4px"}}>
        {categories.map((cat,ci)=>{
          const active=activeCategory===cat;
          const label=cat==="all"?t.todo:(`${NUMERALS[(ci-1)%NUMERALS.length]} · ${getCat(cat)}`);
          return(<button key={cat} onClick={()=>setActiveCategory(cat)} style={{flexShrink:0,fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:500,letterSpacing:2.5,textTransform:"uppercase",color:active?NAVY:MUTED,padding:"0 16px",height:44,background:"none",border:"none",borderBottom:`2px solid ${active?TEAL:"transparent"}`,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>{label}</button>);
        })}
      </nav>

      <div style={{paddingBottom:100}}>
        {Object.entries(grouped).map(([cat,catItems],gi)=>{
          const catIndex=categories.indexOf(cat)-1;
          return(
            <div key={cat} style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(12px)",transition:`all 0.5s ease ${gi*0.08}s`}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:12,padding:"28px 20px 12px",borderBottom:`1px solid ${BORDER}`}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontStyle:"italic",color:SAND,letterSpacing:1,paddingBottom:3}}>{NUMERALS[catIndex%NUMERALS.length]}.</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,fontStyle:"italic",color:NAVY,lineHeight:1,flex:1}}>{getCat(cat)}</div>
                <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:MUTED,paddingBottom:4}}>{cat==="all"?"All":(CAT_T[cat]?.en??cat)}</div>
              </div>

              <div style={{padding:"0 20px"}}>
                {catItems.map((item,idx)=>{
                  const cant=cantidadEnCarrito(item.nombre);
                  const isLast=idx===catItems.length-1;
                  const ci=creatureCounter++;
                  return(
                    <div key={idx}>
                      <div style={{display:"flex",alignItems:"baseline",gap:8,padding:"13px 0",borderBottom:isLast?`1px solid ${BORDER}`:"none"}}>
                        <div style={{flex:1,minWidth:0}}>
                          {item.promo&&<div style={{fontSize:7.5,fontWeight:500,letterSpacing:2,textTransform:"uppercase",color:SAND,border:`1px solid rgba(197,169,107,0.4)`,display:"inline-block",padding:"1px 6px",marginBottom:4}}>{t.oferta}</div>}
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:item.promo?400:300,fontStyle:item.promo?"italic":"normal",color:NAVY,lineHeight:1.2,marginBottom:3}}>{getNombre(item)}</div>
                          {getDesc(item)?<div style={{fontSize:11,fontWeight:300,color:MUTED,lineHeight:1.6,letterSpacing:0.3}}>{getDesc(item)}</div>:null}
                        </div>
                        <div style={{flex:1,minWidth:20,borderBottom:`1px dotted rgba(26,46,59,0.15)`,marginBottom:5,alignSelf:"flex-end"}}/>
                        <div style={{display:"flex",alignItems:"baseline",gap:10,flexShrink:0}}>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:item.promo?600:400,color:item.promo?SAND:TEAL2,whiteSpace:"nowrap"}}>{formatPeso(item.precio)}</div>
                          {item.disponible&&(cant===0?(
                            <button onClick={()=>agregarItem(item)} style={{width:24,height:24,border:`1px solid ${TEAL}`,background:"transparent",color:TEAL,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>+</button>
                          ):(
                            <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                              <button onClick={()=>quitarItem(item.nombre)} style={{width:22,height:22,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                              <span style={{fontSize:12,color:NAVY,minWidth:12,textAlign:"center"}}>{cant}</span>
                              <button onClick={()=>agregarItem(item)} style={{width:22,height:22,border:`1px solid ${TEAL}`,background:TEAL,color:WHITE,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                            </div>
                          ))}
                        </div>
                      </div>
                      {!isLast&&<CreatureDivider index={ci}/>}
                    </div>
                  );
                })}
              </div>
              <WaveDivider/>
            </div>
          );
        })}

        <footer onClick={handleFooterTap} style={{margin:"28px 20px 0",paddingTop:24,borderTop:`1px solid ${BORDER}`,textAlign:"center",cursor:"default"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:MUTED,marginBottom:14}}>{CONFIG.nombre}</div>
          <div style={{display:"flex",justifyContent:"center",gap:20,marginBottom:12}}>
            {CONFIG.pagoEfectivo&&<span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED}}>💵 {t.efectivo}</span>}
            {CONFIG.pagoMercadoPago&&<span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED}}>📱 Mercado Pago</span>}
            {CONFIG.pagoTarjeta&&<span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MUTED}}>💳 {t.tarjeta}</span>}
          </div>
          <div style={{fontSize:9,color:MUTED,opacity:0.7,letterSpacing:1,marginBottom:14}}>{t.precios}</div>
          <div style={{margin:"0 auto",width:"100%",maxWidth:280}}>
            <svg viewBox="0 0 280 16" style={{width:"100%"}}><path d="M0,8 Q35,1 70,8 Q105,15 140,8 Q175,1 210,8 Q245,15 280,8" fill="none" stroke={TEAL} strokeWidth="1" opacity="0.3"/></svg>
          </div>
          <div style={{marginTop:10,fontSize:8,letterSpacing:3,textTransform:"uppercase",color:TEAL,opacity:0.5}}>⚓ Menú Digital</div>
          <div style={{marginBottom:8}}/>
        </footer>
      </div>

      {totalItems>0&&(
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:100,width:"calc(100% - 32px)",maxWidth:448}}>
          <button onClick={()=>setShowCarrito(true)} style={{width:"100%",padding:"15px 20px",background:NAVY,color:WHITE,border:"none",fontSize:9,fontWeight:500,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:`0 8px 32px ${NAVY}55`}}>
            <span>🐚 {totalItems} {totalItems===1?t.item:t.items}</span>
            <span style={{opacity:0.7}}>{t.verPedido}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16}}>{formatPeso(totalPrecio)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
