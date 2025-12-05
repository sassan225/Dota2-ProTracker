document.addEventListener("DOMContentLoaded", function() {
  // --------------------- PESTAÑAS MENU ---------------------
  const tabs = document.querySelectorAll(".top-menu li");
  const sections = document.querySelectorAll("main section");

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      sections.forEach(s => s.classList.add("hidden"));
      if (sections[i]) sections[i].classList.remove("hidden");
    });
  });

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
  const STRATZ_KEY = "TOKEN";
  fetch("https://api.stratz.com/api/v1/rankings/leaders", {
    headers: { "Authorization": `Bearer ${STRATZ_KEY}` }
  })
  .then(res => res.json())
  .then(data => {
    if (!data.entries || !Array.isArray(data.entries)) return;
    const top = data.entries.slice(0,10);
    const container = document.getElementById("players-container");
    container.innerHTML = "";
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

});
