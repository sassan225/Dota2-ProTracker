document.addEventListener("DOMContentLoaded", function() {
  // --------------------- PESTAÑAS MENU---------------------
  const tabs = document.querySelectorAll(".top-menu li");

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      // Quitar active de todas las pestañas
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Ocultar TODAS las secciones
      document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));

      // Ocultar divs sueltos del home
      document.querySelectorAll("main > div:not([id='text-carousel']):not([class*='carousel']):not([class='parrafo-container'])").forEach(div => div.style.display = "none");

      // Mostrar contenido según la pestaña
      if (i === 0) {
        // HOME
        document.getElementById("home").classList.remove("hidden");
        document.getElementById("estadisticas").style.display = "block";
        document.getElementById("news").style.display = "block";
        document.getElementById("player-ranking").style.display = "block";
      } else if (i === 1) {
        // META
        document.getElementById("meta").classList.remove("hidden");
        cargarMetaMock(); // carga mock al abrir pestaña
      } else if (i === 2) {
        document.getElementById("heroes").classList.remove("hidden");
      } else if (i === 3) {
        document.getElementById("players").classList.remove("hidden");
      }
    });
  });

  // HOME al cargar
  document.getElementById("home")?.classList.remove("hidden");
  document.getElementById("estadisticas").style.display = "block";
  document.getElementById("news").style.display = "block";
  document.getElementById("player-ranking").style.display = "block";

  // --------------------- CARRUSEL INFINITO ---------------------
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let slideWidth = slides[0].offsetWidth + 10;
  let index = 0;

  slides.forEach(slide => track.appendChild(slide.cloneNode(true)));
  const originalSlidesCount = slides.length;

  function moveCarousel() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
    if (index >= originalSlidesCount) {
      setTimeout(() => { track.style.transition = "none"; index = 0; track.style.transform = "translateX(0px)"; }, 500);
    }
    if (index < 0) {
      setTimeout(() => { track.style.transition = "none"; index = originalSlidesCount - 1; track.style.transform = "translateX(-" + index * slideWidth + "px)"; }, 500);
    }
  }

  nextBtn.addEventListener("click", () => { index++; moveCarousel(); });
  prevBtn.addEventListener("click", () => { index--; moveCarousel(); });
  setInterval(() => { index++; moveCarousel(); }, 3000);
  window.addEventListener("resize", () => { slideWidth = slides[0].offsetWidth + 10; moveCarousel(); });

  // --------------------- CARRUSEL DE FRASES ---------------------
  const textSlides = document.querySelectorAll(".text-slide");
  let currentText = 0;
  function nextTextSlide() {
    textSlides[currentText].classList.remove("active");
    currentText = (currentText + 1) % textSlides.length;
    textSlides[currentText].classList.add("active");
  }
  setInterval(nextTextSlide, 4000);

  // --------------------- ESTADISTICAS HEROES ---------------------
  const statsContainer = document.getElementById('stats-container');
  fetch('https://api.opendota.com/api/heroStats')
    .then(res => res.json())
    .then(data => {
      const topHeroes = data.slice(0, 20);
      topHeroes.forEach(hero => {
        const heroId = hero.name.replace('npc_dota_hero_', '');
        const winrate = hero.pro_pick ? (hero.pro_win / hero.pro_pick * 100) : 0;
        const pickrate = hero.pro_pick ? (hero.pro_pick / data.reduce((sum,h) => sum + h.pro_pick,0) * 100) : 0;

        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-stat');
        heroCard.innerHTML = `
          <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroId}_full.png" alt="${hero.localized_name}">
          <h3>${hero.localized_name}</h3>
          <p>Winrate: ${winrate.toFixed(2)}%</p>
          <p>Pickrate: ${pickrate.toFixed(2)}%</p>
        `;
        statsContainer.appendChild(heroCard);
      });
    })
    .catch(err => console.error("Error cargando héroes:", err));

  // --------------------- NOTICIAS ---------------------
  const newsContainer = document.getElementById("news-container");
   const noticias = [
  { title: "Nuevo parche 7.35c lanzado", description: "Cambios en héroes, items y balance general del juego.", url: "https://www.dota2.com/patches/" },
  { title: "Torneo internacional 2025: Equipos confirmados", description: "Los equipos top del mundo confirmaron su participación.", url: "https://www.dota2.com/esports/" },
  { title: "Guía rápida: Cómo usar los nuevos héroes", description: "Descubre tips y estrategias de los héroes más recientes.", url: "https://www.dotabuff.com/heroes" },
  { title: "Evento especial de Halloween", description: "Objetos, misiones y recompensas temáticas.", url: "https://www.dota2.com/events/" },
  { title: "Balance de objetos en el último parche", description: "Se ajustaron costos y estadísticas de varios items.", url: "https://www.dota2.com/patches/" },
  { title: "Top 5 héroes más usados esta semana", description: "Estadísticas globales de winrate y pickrate.", url: "https://www.dotabuff.com/heroes" },
  { title: "Nuevo set de Arcana disponible", description: "Consigue skins exclusivas en la tienda de Dota 2.", url: "https://www.dota2.com/store/" },
  { title: "Torneos locales de Dota 2", description: "Inscripciones abiertas para competir y ganar premios.", url: "https://www.dota2.com/esports/" },
  { title: "Actualización de la interfaz de juego", description: "Mejoras visuales y optimización de rendimiento.", url: "https://www.dota2.com/patches/" },
  { title: "Cambios en habilidades de héroes", description: "Algunos héroes recibieron buffs y nerfs importantes.", url: "https://www.dotabuff.com/heroes" },
  { title: "Evento de invierno 2025", description: "Misiones temáticas, cofres y recompensas especiales.", url: "https://www.dota2.com/events/" },
  { title: "Nuevo tutorial para principiantes", description: "Aprende a jugar Dota 2 desde cero con consejos prácticos.", url: "https://www.dota2.com/learn" },
  { title: "Actualización del cliente de Dota 2", description: "Optimización de red y reducción de bugs.", url: "https://www.dota2.com/patches/" },
  { title: "Liga profesional DPC: Resultados de la semana", description: "Revisa los últimos resultados y estadísticas de los equipos.", url: "https://www.dota2.com/esports/" },
  { title: "Héroe destacado del mes", description: "Conoce las estrategias y build recomendadas.", url: "https://www.dotabuff.com/heroes" }
];
  noticias.forEach(n => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<h3>${n.title}</h3><p>${n.description}</p><a href="${n.url}" target="_blank">Leer más</a>`;
    newsContainer.appendChild(card);
  });

  // --------------------- RANKING JUGADORES ---------------------
  const container = document.getElementById("players-container");
  const topPlayersMock = [
  { name: "SMASH 🥇", rankLeaderboardRank: 1, rating: 9500, winRate: 0.75, matchCount: 1200 },
  { name: "WISPER 🥈", rankLeaderboardRank: 2, rating: 9400, winRate: 0.72, matchCount: 1180 },
  { name: "ANA    🥉", rankLeaderboardRank: 3, rating: 9300, winRate: 0.70, matchCount: 1150 },
  { name: "STRIKER", rankLeaderboardRank: 4, rating: 9200, winRate: 0.68, matchCount: 1120 },
  { name: "PHOENIX", rankLeaderboardRank: 5, rating: 9100, winRate: 0.66, matchCount: 1100 },
  { name: "BLITZ", rankLeaderboardRank: 6, rating: 9050, winRate: 0.65, matchCount: 1080 },
  { name: "NOVA", rankLeaderboardRank: 7, rating: 9000, winRate: 0.64, matchCount: 1065 },
  { name: "SHADOW", rankLeaderboardRank: 8, rating: 8950, winRate: 0.63, matchCount: 1050 },
  { name: "FROST", rankLeaderboardRank: 9, rating: 8900, winRate: 0.62, matchCount: 1030 },
  { name: "VORTEX", rankLeaderboardRank: 10, rating: 8850, winRate: 0.61, matchCount: 1020 }
];

  container.innerHTML = "";
  topPlayersMock.forEach(p => {
    const row = document.createElement("div");
    row.classList.add("ranking-row");
    row.innerHTML = `
      <div class="col">${p.name}</div>
      <div class="col">${p.rankLeaderboardRank}</div>
      <div class="col">${p.rating}</div>
      <div class="col">${(p.winRate*100).toFixed(1)}%</div>
      <div class="col">${p.matchCount}</div>
    `;
    container.appendChild(row);
  });

  // --------------------- LOGIN / SIGNUP MODALS ---------------------
  var overlay = document.getElementById('modal-overlay');
  var modalLogin = document.getElementById('modal-login');
  var modalSignup = document.getElementById('modal-signup');
  var loginBtn = document.querySelectorAll('.login-btn');
  var signupBtn = document.querySelectorAll('.signup-btn');
  var closeBtns = document.querySelectorAll('[data-close]');
  var switchers = document.querySelectorAll('[data-switch]');
  function openModal(modalEl) { overlay.classList.add('active'); overlay.classList.remove('hidden'); modalEl.classList.add('active'); modalEl.classList.remove('hidden'); document.body.style.overflow = 'hidden'; modalEl.setAttribute('aria-hidden', 'false'); }
  function closeModals() { overlay.classList.remove('active'); overlay.classList.add('hidden'); [modalLogin, modalSignup].forEach(m=>{ m.classList.remove('active'); m.classList.add('hidden'); if(m) m.setAttribute('aria-hidden','true'); }); document.body.style.overflow = ''; }
  loginBtn.forEach(btn=>btn.addEventListener('click',()=>openModal(modalLogin)));
  signupBtn.forEach(btn=>btn.addEventListener('click',()=>openModal(modalSignup)));
  closeBtns.forEach(btn=>btn.addEventListener('click',()=>closeModals()));
  overlay.addEventListener('click',()=>closeModals());
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModals(); });
  switchers.forEach(btn=>btn.addEventListener('click',()=>{ var target=btn.getAttribute('data-switch'); if(target==='signup'){ modalLogin.classList.remove('active'); modalLogin.classList.add('hidden'); modalSignup.classList.remove('hidden'); modalSignup.classList.add('active'); } else if(target==='login'){ modalSignup.classList.remove('active'); modalSignup.classList.add('hidden'); modalLogin.classList.remove('hidden'); modalLogin.classList.add('active'); } }));

  document.getElementById('login-form').addEventListener('submit', e=>{ e.preventDefault(); alert('Login simulado.'); closeModals(); });
  document.getElementById('signup-form').addEventListener('submit', e=>{ e.preventDefault(); alert('Signup simulado.'); closeModals(); });

// --------------------- META HEROES MOCK ---------------------
// ====================== MOCK DATA - META COMPLETA (Patch 7.38b - Divine+) ======================

const metaHeroesMock = [
  { name: "npc_dota_hero_spirit_breaker",    localized_name: "Spirit Breaker",    pickrate: 18.4, winrate: 54.8 },
  { name: "npc_dota_hero_beastmaster",       localized_name: "Beastmaster",       pickrate: 16.2, winrate: 55.1 },
  { name: "npc_dota_hero_muerta",            localized_name: "Muerta",          pickrate: 15.7, winrate: 53.9 },
  { name: "npc_dota_hero_shadow_fiend",      localized_name: "Shadow Fiend",      pickrate: 14.3, winrate: 52.7 },
  { name: "npc_dota_hero_phantom_assassin", localized_name: "Phantom Assassin",   pickrate: 13.8, winrate: 53.4 },
  { name: "npc_dota_hero_lina",              localized_name: "Lina",              pickrate: 12.9, winrate: 51.9 },
  { name: "npc_dota_hero_invoker",           localized_name: "Invoker",            pickrate: 12.5, winrate: 52.3 },
  { name: "npc_dota_hero_terrorblade",       localized_name: "Terrorblade",        pickrate: 11.8, winrate: 54.2 },
  { name: "npc_dota_hero_windranger",        localized_name: "Windranger",         pickrate: 11.5, winrate: 51.6 },
  { name: "npc_dota_hero_spectre",          localized_name: "Spectre",            pickrate: 11.1, winrate: 52.1 },
  { name: "npc_dota_hero_crystal_maiden",    localized_name: "Crystal Maiden",     pickrate: 10.8, winrate: 50.5 },
  { name: "npc_dota_hero_axe",              localized_name: "Axe",               pickrate: 10.4, winrate: 51.8 },
  { name: "npc_dota_hero_tiny",             localized_name: "Tiny",               pickrate: 10.1, winrate: 53.0 },
  { name: "npc_dota_hero_pudge",            localized_name: "Pudge",              pickrate: 9.9,  winrate: 49.7 },
  { name: "npc_dota_hero_queenofpain",      localized_name: "Queen of Pain",      pickrate: 9.6,  winrate: 52.6 }
];

const metaItemsMock = [
  { id: "black_king_bar",        name: "Black King Bar",        pickrate: 42.1, winrate: 56.3 },
  { id: "blink",                 name: "Blink Dagger",         pickrate: 38.7, winrate: 53.8 },
  { id: "aghanims_scepter",      name: "Aghanim's Scepter",   pickrate: 35.2, winrate: 54.1 },
  { id: "manta",                name: "Manta Style",          pickrate: 28.9, winrate: 55.7 },
  { id: "desolator",            name: "Desolator",           pickrate: 26.4, winrate: 54.9 },
  { id: "silver_edge",           name: "Silver Edge",          pickrate: 24.1, winrate: 53.2 },
  { id: "satanic",              name: "Satanic",             pickrate: 22.8, winrate: 58.1 },
  { id: "butterfly",             name: "Butterfly",            pickrate: 21.5, winrate: 57.3 },
  { id: "heart",               name: "Heart of Tarrasque",   pickrate: 20.1, winrate: 59.0 },
  { id: "travel_boots",          name: "Boots of Travel",      pickrate: 19.7, winrate: 56.8 }
];

const metaItemsTopMock = [
  { hero: "Spirit Breaker", item: "Black King Bar",       pickrate: 68.2, winrate: 58.9 },
  { hero: "Beastmaster",   item: "Aghanim's Scepter",   pickrate: 72.1, winrate: 60.2 },
  { hero: "Muerta",       item: "Desolator",           pickrate: 65.4, winrate: 57.8 },
  { hero: "Shadow Fiend",  item: "Black King Bar",       pickrate: 70.1, winrate: 56.5 },
  { hero: "Phantom Assassin", item: "Desolator",         pickrate: 74.3, winrate: 59.1 },
  { hero: "Lina",        item: "Eul's Scepter",       pickrate: 62.8, winrate: 55.9 },
  { hero: "Terrorblade",   item: "Manta Style",          pickrate: 81.2, winrate: 61.3 },
  { hero: "Windranger",   item: "Maelstrom",           pickrate: 58.7, winrate: 54.2 },
  { hero: "Invoker",       item: "Aghanim's Scepter",   pickrate: 69.5, winrate: 57.8 },
  { hero: "Spectre",      item: "Radiance",            pickrate: 55.1, winrate: 58.6 }
];

// ====================== FUNCIONES PARA CARGAR TABLAS ======================

function cargarMetaHeroes() {
  const tbody = document.getElementById("meta-heroes-body");
  tbody.innerHTML = "";

  metaHeroesMock.forEach((h, i) => {
    let id = h.name.replace("npc_dota_hero_", "");
    if (id === "windrunner") id = "windranger";
    if (id === "shadow_fiend") id = "nevermore";
    if (id === "queenofpain") id = "queenofpain";

    const cambio = (Math.random() * 6 - 3).toFixed(2);
    const sube = cambio > 0;

    tbody.innerHTML += `
      <tr>
        <td style="color:#e63946;font-weight:bold">${i+1}</td>
        <td style="display:flex;align-items:center;gap:10px;">
          <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${id}.png" 
               style="width:52px;height:29px;border-radius:6px;border:2px solid #444;">
          <strong>${h.localized_name}</strong>
        </td>
        <td style="color:#a8dadc">${h.pickrate}%</td>
        <td style="color:#4ade80;font-weight:bold">${h.winrate}%</td>
        <td style="color:${sube?'#4ade80':'#f87171'}">${sube?'+' : ''}${cambio}%</td>
        <td style="font-size:1.6rem">${sube ? 'Up Arrow' : 'Down Arrow'}</td>
      </tr>`;
  });
}

function cargarMetaItems() {
  const tbody = document.getElementById("meta-items-body");
  tbody.innerHTML = "";

  metaItemsMock.forEach((item, i) => {
    const cambio = (Math.random() * 8 - 4).toFixed(2);
    const sube = cambio > 0;

    tbody.innerHTML += `
      <tr>
        <td style="color:#e63946;font-weight:bold">${i+1}</td>
        <td style="display:flex;align-items:center;gap:10px;">
          <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${item.id}.png" 
               style="width:44px;height:33px;border-radius:6px;">
          ${item.name}
        </td>
        <td style="color:#a8dadc">${item.pickrate}%</td>
        <td style="color:#4ade80;font-weight:bold">${item.winrate}%</td>
        <td style="color:${sube?'#4ade80':'#f87171'}">${sube?'+' : ''}${cambio}%</td>
        <td style="font-size:1.6rem">${sube ? 'Up Arrow' : 'Down Arrow'}</td>
      </tr>`;
  });
}

function cargarMetaItemsTop() {
  const tbody = document.getElementById("meta-items-top-body");
  tbody.innerHTML = "";

  metaItemsTopMock.forEach((data, i) => {
    tbody.innerHTML += `
      <tr>
        <td style="color:#e63946;font-weight:bold">${i+1}</td>
        <td>${data.hero}</td>
        <td style="display:flex;align-items:center;gap:10px;">
          <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${data.item.toLowerCase().replace(/ /g,'_').replace(/'/g,'')}.png" 
               style="width:44px;height:33px;border-radius:6px;">
          ${data.item}
        </td>
        <td style="color:#a8dadc">${data.pickrate}%</td>
        <td style="color:#4ade80;font-weight:bold">${data.winrate}%</td>
      </tr>`;
  });
}

// ====================== CARGA AL ENTRAR A LA PESTAÑA META ======================
document.querySelector(".top-menu li:nth-child(2)").addEventListener("click", () => {
  // Solo carga una vez
  if (document.getElementById("meta-heroes-body").children.length === 1) {
    cargarMetaHeroes();
    cargarMetaItems();
    cargarMetaItemsTop();
  }
});
})
