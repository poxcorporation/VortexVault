// comments.js - COMENTARIOS FALSOS POR NOMBRE DE VIDEO - FIX GENERICOS
// Ahora busca sin importar mayusculas, espacios, y acepta coincidencias parciales

const COMMENTS_DB = {
  "Sigan Viendo - Big Smile": [
    { usuario: "CarlosGamer_23", texto: "Jajaja La cara 😂", likes: 124, hace: "hace 2 años" },
    { usuario: "PAKITO", texto: "SIGAN VIENDO🗣️🗣️🗣️🔥🔥🔥", likes: 89, hace: "hace 1 año" },
    { usuario: "LoritoInsano", texto: "Oye bro, que app usas para hacer esos efectos, es que me da risa la cara pliss", likes: 45, hace: "hace 1 año" },
    { usuario: "CarlosGamer_23", texto: "ME REGALARON UN PAIS CASI DAÑADO🗣️🗣️🗣️🔥🔥🔥", likes: 45, hace: "hace 2 años" },
    { usuario: "QueEsSonreir", texto: "Quien En 2025", likes: 380, hace: "hace 2 dias" }
  ],
  "PUG se emociona y baila en su cuarto nuevo": [
    { usuario: "PugLover", texto: "Amo los pugs, que hermoso 🐶❤️", likes: 210, hace: "hace 3 horas" },
    { usuario: "SnapchatFiltrosFan", texto: "Jajaja parece que esta perreando", likes: 156, hace: "hace 1 dia" },
    { usuario: "Mariana_22", texto: "Mi perro hace lo mismo!", likes: 67, hace: "hace 2 dias" }
  ],
  "Shaneke JR En Cartoon Network (Falso) - Big Smile": [
    { usuario: "CartoonFan", texto: "Noooo yo si me la crei que salio en CN", likes: 432, hace: "hace 4 horas" },
    { usuario: "ShanekeReal", texto: "Falso pero quedo epico", likes: 98, hace: "hace 1 dia" }
  ],
  "Todos los videos de davidbravo971": [
    { usuario: "user6971378", texto: "Buen video Bro", likes: 35, hace: "hace 2 años" },
    { usuario: "ElProinsano", texto: "Soy el Unico que ni conoce a ese wey?", likes: 98, hace: "hace 1 año" },
    { usuario: "CallateAlaverga", texto: "¿Quien es este Tipo?", likes: 98, hace: "hace 2 meses" },
    { usuario: "El chico que se parece mucho a Pommi", texto: "Bro quien es davidbravo971😭🙏", likes: 3001, hace: "hace 4 meses" },
    { usuario: "PoppyPlaytime", texto: "Quien carajos es ese wey", likes: 70, hace: "hace 1 mes" },
    { usuario: "Ten un Chokomilk", texto: "Quien en su Sano juicio miraria este video entero", likes: 100, hace: "hace 1 Semana" },
    { usuario: "Sammy🕷️❤️", texto: "A ese wey ni en su casa lo conocen", likes: 300, hace: "hace 2 años" }
  ],
  "Video de prueba VortexVault 2": [
    { usuario: "VortexFan", texto: "Este video esta epico", likes: 54, hace: "hace 5 horas" },
    { usuario: "TestUser", texto: "Probando comentarios falsos", likes: 12, hace: "hace 1 dia" }
  ],
  "Mi primer video local": [
    { usuario: "LocalLover", texto: "Este es local y no lo tumban, grande VortexVault", likes: 88, hace: "hace 2 horas" },
    { usuario: "AntiCensura", texto: "Por fin un lugar sin censura", likes: 42, hace: "hace 1 dia" }
  ]
};

const COMMENTS_GENERICOS = [
  { usuario: "FanNumero1", texto: "Que buen video bro 🔥", likes: 32, hace: "hace 3 horas" },
  { usuario: "Xx_Mario_xX", texto: "Alguien mas en 2024? 👇", likes: 120, hace: "hace 1 dia" },
  { usuario: "GatoJardineroFan", texto: "Grande Gato Jardinero, sigue asi!", likes: 67, hace: "hace 4 dias" },
  { usuario: "RandomUser", texto: "No puedo creer que esto sea falso 😱", likes: 210, hace: "hace 1 semana" },
  { usuario: "DavidBravo", texto: "Buenisimo, me suscribo", likes: 8, hace: "hace 2 horas" }
];

function normalizeStr(s) {
  return (s || "").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscarComentariosPorTitulo(titulo) {
  if (!titulo) return null;
  // 1. Exacto
  if (COMMENTS_DB[titulo]) return COMMENTS_DB[titulo];
  // 2. Trim exacto
  const tTrim = titulo.trim();
  if (COMMENTS_DB[tTrim]) return COMMENTS_DB[tTrim];
  // 3. Case-insensitive
  const norm = normalizeStr(titulo);
  for (const key in COMMENTS_DB) {
    if (normalizeStr(key) === norm) return COMMENTS_DB[key];
  }
  // 4. Contiene (si el titulo del video contiene la clave o viceversa)
  for (const key in COMMENTS_DB) {
    const nk = normalizeStr(key);
    if (norm.includes(nk) || nk.includes(norm)) return COMMENTS_DB[key];
  }
  // 5. Palabra clave davidbravo971
  if (norm.includes("davidbravo971") && COMMENTS_DB["Todos los videos de davidbravo971"]) {
    return COMMENTS_DB["Todos los videos de davidbravo971"];
  }
  return null;
}

function renderComentarios(idx) {
  const list = document.getElementById('commentsList');
  const countEl = document.getElementById('commentsCount');
  if (!list) return;
  
  let titulo = "";
  let videoObj = null;
  try {
    if (typeof PLAYLIST_VIDEOS !== 'undefined' && PLAYLIST_VIDEOS[idx]) {
      videoObj = PLAYLIST_VIDEOS[idx];
      titulo = videoObj.titulo || "";
    }
  } catch (e) {}
  
  // Si no hay titulo, intenta sacarlo del DOM
  if (!titulo) {
    const titleEl = document.getElementById('videoTitle');
    if (titleEl) titulo = titleEl.textContent || "";
  }
  
  console.log("[comments] idx:", idx, " titulo buscado:", titulo);
  
  let comentarios = buscarComentariosPorTitulo(titulo);
  
  if (!comentarios || comentarios.length === 0) {
    console.log("[comments] No se encontro, usando GENERICOS. Claves disponibles:", Object.keys(COMMENTS_DB));
    comentarios = COMMENTS_GENERICOS;
  } else {
    console.log("[comments] Encontrados", comentarios.length, "para", titulo);
  }
  
  // Corrige likes string
  comentarios = comentarios.map(c => {
    let l = c.likes;
    if (typeof l === 'string') l = parseInt(l.replace(/[^0-9]/g, '')) || 0;
    if (typeof l !== 'number' || isNaN(l)) l = 0;
    return { ...c, likes: l };
  });
  
  if (countEl) countEl.textContent = comentarios.length + " comentarios";
  
  list.innerHTML = comentarios.map((c, i) => {
  const inicial = (c.usuario || '?')[0].toUpperCase();
  const likesTxt = c.likes >= 1000 ? (c.likes / 1000).toFixed(1) + 'K' : String(c.likes);
  return `
      <div class="comment-item" style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);animation:cardIn 0.4s both;animation-delay:${i*0.05}s">
        <div class="comment-avatar" style="width:36px;height:36px;min-width:36px;border-radius:50%;background:var(--bg-pill);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:var(--text-primary)">${inicial}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <span style="font-weight:800;font-size:13px;color:var(--text-primary)">@${c.usuario}</span>
            <span style="font-size:11px;color:var(--text-secondary)">${c.hace}</span>
          </div>
          <div style="font-size:13.5px;line-height:1.4;margin-top:3px;word-break:break-word;color:var(--text-primary)">${c.texto}</div>
          <div style="display:flex;gap:14px;margin-top:6px;align-items:center">
            <span style="display:flex;gap:5px;align-items:center;font-size:12px;color:var(--text-secondary);cursor:pointer">${likesTxt}</span>
            <span style="font-size:12px;color:var(--text-secondary);cursor:pointer">No me gusta</span>
            <span style="font-size:12px;font-weight:700;color:var(--text-secondary);cursor:pointer">Responder</span>
          </div>
        </div>
      </div>
    `;
}).join
}

// Fuerza que si playlist cambia, siga funcionando
window.COMMENTS_DB = COMMENTS_DB;
window.COMMENTS_GENERICOS = COMMENTS_GENERICOS;