document.addEventListener("DOMContentLoaded", function() {
  // --------------------- PESTAÑAS MENU---------------------
 const tabs = document.querySelectorAll(".top-menu li");
  let metaCargada = false; // <-- para que solo se cargue una vez

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      // Quitar active de todas las pestañas
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Ocultar TODAS las secciones
      document.querySelectorAll("main section").forEach(sec => {
        sec.classList.add("hidden");
      });

      // Ocultar los divs sueltos del home
      document.querySelectorAll("main > div:not([id='text-carousel']):not([class*='carousel']):not([class='parrafo-container'])").forEach(div => {
        div.style.display = "none";
      });

      // Mostrar contenido según la pestaña
      if (i === 0) {
        // HOME
        document.getElementById("home").classList.remove("hidden");
        document.getElementById("estadisticas").style.display = "block";
        document.getElementById("news").style.display = "block";
        document.getElementById("player-ranking").style.display = "block";
      } 
      else if (i === 1) {
        // META
        const metaSection = document.getElementById("meta");
        metaSection.classList.remove("hidden");

        // Cargar meta solo si no se ha cargado antes
        if (!metaCargada) {
          cargarMetaActual();
          metaCargada = true;
        }
      }
      else if (i === 2) {
        // HÉROES
        document.getElementById("heroes").classList.remove("hidden");
      }
      else if (i === 3) {
        // JUGADORES
        document.getElementById("players").classList.remove("hidden");
      }
    });
  });

  // Aseguramos que al cargar la página se vea Home correctamente
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
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(-" + index * slideWidth + "px)";
      }, 500);
    }

    if (index < 0) {
      setTimeout(() => {
        track.style.transition = "none";
        index = originalSlidesCount - 1;
        track.style.transform = "translateX(-" + index * slideWidth + "px)";
      }, 500);
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

  // --------------------- VIDEOS YOUTUBE ---------------------
  const API_KEY = "AIzaSyAT21lkyu_gnD-LvBab8JjqJJSq_N-QRAA";
  const query = "Dota 2";
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("videos-container");
      data.items.forEach(video => {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video-card");
        videoDiv.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <h4>${video.snippet.title}</h4>
          </a>
        `;
        container.appendChild(videoDiv);
      });
    })
    .catch(err => console.error("Error cargando videos:", err));

  // --------------------- RANKING JUGADORES (Stratz) ---------------------
  const container = document.getElementById("players-container");

  // Datos de ejemplo mientras carga la API
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

  // Luego hacemos la llamada real
  const STRATZ_KEY = "TOKEN";
  fetch("https://api.stratz.com/api/v1/rankings/leaders", {
    headers: { "Authorization": `Bearer ${STRATZ_KEY}` }
  })
  .then(res => res.json())
  .then(data => {
    if (!data.entries || !Array.isArray(data.entries)) return;
    const top = data.entries.slice(0,10);
    container.innerHTML = ""; // reemplaza el mock con la API
    top.forEach(p => {
      const row = document.createElement("div");
      row.classList.add("ranking-row");
      row.innerHTML = `
        <div class="col">${p.name || "Unknown"}</div>
        <div class="col">${p.rankLeaderboardRank || "-"}</div>
        <div class="col">${p.rating || "-"}</div>
        <div class="col">${(p.winRate*100).toFixed(1)}%</div>
        <div class="col">${p.matchCount}</div>
      `;
      container.appendChild(row);
    });
  })
  .catch(err => console.error("Error cargando ranking:", err));

  // --------------------- LOGIN / SIGNUP ---------------------
  var overlay = document.getElementById('modal-overlay');
  var modalLogin = document.getElementById('modal-login');
  var modalSignup = document.getElementById('modal-signup');
  var loginBtn = document.querySelectorAll('.login-btn');
  var signupBtn = document.querySelectorAll('.signup-btn');
  var closeBtns = document.querySelectorAll('[data-close]');
  var switchers = document.querySelectorAll('[data-switch]');

  function openModal(modalEl) {
    overlay.classList.add('active');
    overlay.classList.remove('hidden');
    modalEl.classList.add('active');
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalEl.setAttribute('aria-hidden', 'false');
  }

  function closeModals() {
    overlay.classList.remove('active');
    overlay.classList.add('hidden');
    [modalLogin, modalSignup].forEach(function(m){
      m.classList.remove('active');
      m.classList.add('hidden');
      if (m) m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

  loginBtn.forEach(function(btn){
    btn.addEventListener('click', function(){
      openModal(modalLogin);
    });
  });

  signupBtn.forEach(function(btn){
    btn.addEventListener('click', function(){
      openModal(modalSignup);
    });
  });

  closeBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      closeModals();
    });
  });

  overlay.addEventListener('click', function(){
    closeModals();
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeModals();
  });

  switchers.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-switch');
      if (target === 'signup') {
        modalLogin.classList.remove('active'); modalLogin.classList.add('hidden');
        modalSignup.classList.remove('hidden'); modalSignup.classList.add('active');
      } else if (target === 'login') {
        modalSignup.classList.remove('active'); modalSignup.classList.add('hidden');
        modalLogin.classList.remove('hidden'); modalLogin.classList.add('active');
      }
    });
  });

  document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Login simulado.');
    closeModals();
  });
  document.getElementById('signup-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Signup simulado.');
    closeModals();
  });

});

// --------------------- META ACTUAL ---------------------

function cargarMetaMock() {
  const heroesMock = [
    { name: "npc_dota_hero_axe", localized_name: "Axe", pro_pick: 15000, pro_win: 9000 },
    { name: "npc_dota_hero_pudge", localized_name: "Pudge", pro_pick: 12000, pro_win: 7000 },
    { name: "npc_dota_hero_invoker", localized_name: "Invoker", pro_pick: 10000, pro_win: 5500 },
    { name: "npc_dota_hero_sven", localized_name: "Sven", pro_pick: 8000, pro_win: 4200 },
    { name: "npc_dota_hero_crystal_maiden", localized_name: "Crystal Maiden", pro_pick: 7000, pro_win: 3500 },
    { name: "npc_dota_hero_sniper", localized_name: "Sniper", pro_pick: 6500, pro_win: 3300 },
    { name: "npc_dota_hero_lina", localized_name: "Lina", pro_pick: 6000, pro_win: 3100 },
    { name: "npc_dota_hero_phantom_assassin", localized_name: "Phantom Assassin", pro_pick: 5500, pro_win: 2900 },
    { name: "npc_dota_hero_juggernaut", localized_name: "Juggernaut", pro_pick: 5000, pro_win: 2700 },
    { name: "npc_dota_hero_earthshaker", localized_name: "Earthshaker", pro_pick: 5000, pro_win: 2600 }
  ];

  let tbody = document.getElementById("meta-heroes-body");
  if (!tbody) {
    const table = document.querySelector("#meta table");
    if (!table) return; // no hay tabla META
    tbody = document.createElement("tbody");
    tbody.id = "meta-heroes-body";
    table.appendChild(tbody);
  }

  tbody.innerHTML = "";

  heroesMock.forEach((hero, index) => {
    const pickrate = ((hero.pro_pick / 80000) * 100).toFixed(2);
    const winrate = ((hero.pro_win / hero.pro_pick) * 100).toFixed(2);
    const heroName = hero.name.replace("npc_dota_hero_", "");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="https://api.opendota.com/apps/dota2/images/heroes/${heroName}_full.png" alt="${hero.localized_name}"> ${hero.localized_name}</td>
      <td>${pickrate}%</td>
      <td>${winrate}%</td>
      <td>+0.00%</td>
      <td>—</td>
    `;
    tbody.appendChild(tr);
  });

  cargarMetaActual(); // intentamos API real
}


// --------------------- META REAL (OpenDota) ---------------------
async function cargarMetaActual() {
  try {
    const response = await fetch("https://api.opendota.com/api/heroStats");
    const data = await response.json();

    const heroesPro = data.filter(h => h.pro_pick && h.pro_pick > 5000);
    heroesPro.sort((a, b) => b.pro_pick - a.pro_pick);

    const tbody = document.getElementById("meta-heroes-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    heroesPro.forEach((hero, index) => {
      const pickrate = ((hero.pro_pick / 80000) * 100).toFixed(2);
      const winrate = ((hero.pro_win / hero.pro_pick) * 100).toFixed(2);
      const heroName = hero.name.replace("npc_dota_hero_", "");

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="https://api.opendota.com/apps/dota2/images/heroes/${heroName}_full.png" alt="${hero.localized_name}"> ${hero.localized_name}</td>
        <td>${pickrate}%</td>
        <td>${winrate}%</td>
        <td>+0.00%</td>
        <td>—</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.warn("No se pudo cargar la API real de OpenDota, usando mock.");
  }
}