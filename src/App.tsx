import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const CONFIG = {
  nombre:          "Desnivel",
  ciudad:          "Buenos Aires",
  subtitulo:       "Parrilla · Cocina de autor",
  tagline:         "Parrilla al Carbón · Desde 1993",
  direccion:       "Defensa 855, San Telmo",
  mapLat:          -34.617873,
  mapLng:          -58.37182,
  mapUrl:          "https://www.google.com/maps/place/Desnivel/@-34.6179334,-58.3721757,19.5z/data=!4m15!1m8!3m7!1s0x95bccb2b331b5921:0x50b173b729b1d91!2sDefensa+855,+C1065AAO+Cdad.+Aut%C3%B3noma+de+Buenos+Aires!3b1!8m2!3d-34.6179578!4d-58.3717232!16s%2Fg%2F11rg5xzn4h!3m5!1s0x95a334d4ccafe9f5:0xd454ac3b2d72253a!8m2!3d-34.617873!4d-58.37182!16s%2Fg%2F1tsylcbk",
  whatsapp:        "5491176160786",
  whatsappLabel:   "11 7616-0786",
  telefonos:       [{ label:"4300 – 9081", numero:"43009081" }, { label:"4307-2489", numero:"43072489" }],
  redes: {
    instagram:   "https://www.instagram.com/parrilladesniveloficial/?igshid=MGU3ZTQzNzY%3D",
    facebook:    "https://www.facebook.com/profile.php?id=100090468200567",
    tripadvisor: "https://www.tripadvisor.com.ar/Restaurant_Review-g312741-d1066258-Reviews-Desnivel-Buenos_Aires_Capital_Federal_District.html",
    tiktok:      "https://www.tiktok.com/@desnivelsantelmo?_t=8apu5goeZN8&_r=1",
  },
  pagoEfectivo:    true,
  pagoMercadoPago: true,
  pagoTarjeta:     true,
  sheetsUrl:       "PEGAR_URL_DE_GOOGLE_APPS_SCRIPT_AQUI",
};

// Пример словаря для автоматического перевода частых примечаний с других языков на испанский для официанта
const translationsToSpanish: Record<string, string> = {
  // Английский -> Испанский
  "no onion": "Sin cebolla",
  "no ice": "Sin hielo",
  "well done": "Bien cocido",
  "medium rare": "A punto / Jugoso",
  // Португальский -> Испанский
  "sem cebola": "Sin cebolla",
  "bem passado": "Bien cocido",
  // Можете добавлять любые другие варианты или подключить переводчик
};

// Функция для приведения примечания к испанскому языку перед отправкой на экран официанта
const translateNoteToSpanish = (note: string, clientLang: string): string => {
  if (!note) return "";
  const lowerNote = note.toLowerCase().trim();
  
  // Если в словаре есть готовый перевод
  if (translationsToSpanish[lowerNote]) {
    return translationsToSpanish[lowerNote];
  }

  // Если язык клиента испанский, оставляем как есть
  if (clientLang === "es") {
    return note;
  }

  // Здесь можно добавить логику вызова API перевода или вернуть исходный текст с пометкой
  return `${note}`;
};

export default function App() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [notaCliente, setNotaCliente] = useState("");
  const [idiomaCliente, setIdiomaCliente] = useState("es"); // язык, выбранный клиентом
  const [pantallaOcupada, setPantallaOcupada] = useState(false);

  const enviarPedidoOcioso = () => {
    // Превращаем примечание на языке клиента в испанский для экрана официанта
    const notaParaElMozo = translateNoteToSpanish(notaCliente, idiomaCliente);

    const pedidoParaCocina = {
      items: carrito,
      notaOriginal: notaCliente,
      idiomaOriginal: idiomaCliente,
      notaParaMozo: notaParaElMozo, // <--- Уйдет официанту на испанском
    };

    console.log("Enviado al mozo:", pedidoParaCocina);
    setPantallaOcupada(true);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Jost, sans-serif' }}>
      <h1>{CONFIG.nombre}</h1>
      <p>{CONFIG.subtitulo}</p>
      
      {/* Селектор языка клиента */}
      <div style={{ marginBottom: 15 }}>
        <label>Idioma / Language: </label>
        <select value={idiomaCliente} onChange={(e) => setIdiomaCliente(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      {/* Поле ввода примечания в корзине */}
      <div style={{ marginBottom: 15 }}>
        <label>
          {idiomaCliente === 'ru' && 'Примечания к заказу:'}
          {idiomaCliente === 'en' && 'Order notes:'}
          {idiomaCliente === 'pt' && 'Observações do pedido:'}
          {idiomaCliente === 'es' && 'Notas del pedido:'}
        </label>
        <br />
        <textarea
          value={notaCliente}
          onChange={(e) => setNotaCliente(e.target.value)}
          placeholder={
            idiomaCliente === 'ru' ? 'Например: без лука' :
            idiomaCliente === 'en' ? 'E.g. no onion' : 'Ej: sin cebolla'
          }
          style={{ width: '100%', height: 80 }}
        />
      </div>

      <button onClick={enviarPedidoOcioso} style={{ background: TEAL2, color: WHITE, padding: '10px 20px', border: 'none' }}>
        {idiomaCliente === 'ru' ? 'Отправить заказ' : 'Enviar pedido'}
      </button>

      {/* Эмуляция экрана официанта */}
      {pantallaOcupada && (
        <div style={{ marginTop: 30, padding: 15, border: '1px solid #ccc', background: '#f9f9f9' }}>
          <h3>Pantalla del Mozo (Экран официанта):</h3>
          <p><strong>Nota en Español:</strong> {translateNoteToSpanish(notaCliente, idiomaCliente)}</p>
          <p><small>(Nota original del cliente [{idiomaCliente}]: {notaCliente})</small></p>
        </div>
      )}
    </div>
  );
}
