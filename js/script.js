// --------------------- CARRUSEL INFINITO ---------------------
var track = document.querySelector(".carousel-track");
var slides = Array.prototype.slice.call(track.children);
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");

var slideWidth = slides[0].offsetWidth + 10; // ancho + margen
var index = 0;

// Clonamos los slides para infinito
slides.forEach(function(slide) {
  track.appendChild(slide.cloneNode(true));
});

var originalSlidesCount = slides.length;

// Función para mover carrusel
function moveCarousel() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = "translateX(-" + (index * slideWidth) + "px)";

  if (index >= originalSlidesCount) {
    setTimeout(function() {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
    }, 500);
  }

  if (index < 0) {
    setTimeout(function() {
      track.style.transition = "none";
      index = originalSlidesCount - 1;
      track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
    }, 500);
  }
}

// Botones
nextBtn.addEventListener("click", function() {
  index++;
  moveCarousel();
});

prevBtn.addEventListener("click", function() {
  index--;
  moveCarousel();
});

// Autoplay
setInterval(function() {
  index++;
  moveCarousel();
}, 3000);

// Ajustar ancho si la ventana cambia
window.addEventListener("resize", function() {
  slideWidth = slides[0].offsetWidth + 10;
  moveCarousel();
});

// --------------------- PESTAÑAS MENU ---------------------
var tabs = document.querySelectorAll(".top-menu li");
var sections = document.querySelectorAll("main section");

for (var i = 0; i < tabs.length; i++) {
  (function(i){
    tabs[i].addEventListener("click", function() {
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
        sections[j].classList.add("hidden");
      }
      tabs[i].classList.add("active");
      sections[i].classList.remove("hidden");
    });
  })(i);
}

// --------------------- ESTADISTICAS HEROES ---------------------
document.addEventListener("DOMContentLoaded", function() {
  var statsContainer = document.getElementById('stats-container');

  fetch('https://api.opendota.com/api/heroStats')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var topHeroes = data.slice(0, 20);

      topHeroes.forEach(function(hero) {
        var heroId = hero.name.replace('npc_dota_hero_', '');
        var winrate = hero.pro_pick ? (hero.pro_win / hero.pro_pick * 100) : 0;
        var pickrate = hero.pro_pick ? (hero.pro_pick / data.reduce(function(sum, h){ return sum + h.pro_pick; },0) * 100) : 0;

        var heroCard = document.createElement('div');
        heroCard.classList.add('hero-stat');
        heroCard.innerHTML = '<img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/' + heroId + '_full.png" alt="' + hero.localized_name + '">' +
                             '<h3>' + hero.localized_name + '</h3>' +
                             '<p>Winrate: ' + winrate.toFixed(2) + '%</p>' +
                             '<p>Pickrate: ' + pickrate.toFixed(2) + '%</p>';
        statsContainer.appendChild(heroCard);
      });
    })
    .catch(function(err) { console.error("Error cargando héroes:", err); });
});

// --------------------- VIDEOS YOUTUBE ---------------------
var API_KEY = "AIzaSyAT21lkyu_gnD-LvBab8JjqJJSq_N-QRAA"; // Cambia esto por tu API key
var query = "Dota 2";
var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&type=video&maxResults=6&key=" + API_KEY;

fetch(url)
  .then(function(res){ return res.json(); })
  .then(function(data){
    var container = document.getElementById("videos-container");
    data.items.forEach(function(video){
      var videoDiv = document.createElement("div");
      videoDiv.classList.add("video-card");
      videoDiv.innerHTML = '<a href="https://www.youtube.com/watch?v=' + video.id.videoId + '" target="_blank">' +
                           '<img src="' + video.snippet.thumbnails.medium.url + '" alt="' + video.snippet.title + '">' +
                           '<h4>' + video.snippet.title + '</h4>' +
                           '</a>';
      container.appendChild(videoDiv);
    });
  })
  .catch(function(err){ console.error("Error cargando videos:", err); });
//-------------------------------- CARRUSEL DE FRASES

var slides = document.querySelectorAll(".text-slide");
var currentSlide = 0;

function nextTextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextTextSlide, 4000); // Cambia cada 4 segundos


//SECCION DE NOTICAS
document.addEventListener("DOMContentLoaded", function() {
  var newsContainer = document.getElementById("news-container");

  // Noticias de ejemplo (manual)
 var noticias = [
  {
    title: "Nuevo parche 7.35c lanzado",
    description: "Cambios en héroes, items y balance general del juego.",
    url: "https://www.dota2.com/patches/"
  },
  {
    title: "Torneo internacional 2025: Equipos confirmados",
    description: "Los equipos top del mundo confirmaron su participación.",
    url: "https://www.dota2.com/esports/"
  },
  {
    title: "Guía rápida: Cómo usar los nuevos héroes",
    description: "Descubre tips y estrategias de los héroes más recientes.",
    url: "https://www.dotabuff.com/heroes"
  },
  {
    title: "Evento especial de Halloween",
    description: "Objetos, misiones y recompensas temáticas.",
    url: "https://www.dota2.com/events/"
  },
  {
    title: "Balance de objetos en el último parche",
    description: "Se ajustaron costos y estadísticas de varios items.",
    url: "https://www.dota2.com/patches/"
  },
  {
    title: "Top 5 héroes más usados esta semana",
    description: "Estadísticas globales de winrate y pickrate.",
    url: "https://www.dotabuff.com/heroes"
  },
  {
    title: "Nuevo set de Arcana disponible",
    description: "Consigue skins exclusivas en la tienda de Dota 2.",
    url: "https://www.dota2.com/store/"
  },
  {
    title: "Torneos locales de Dota 2",
    description: "Inscripciones abiertas para competir y ganar premios.",
    url: "https://www.dota2.com/esports/"
  }
];


  noticias.forEach(function(noticia){
    var card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<h3>${noticia.title}</h3>
                      <p>${noticia.description}</p>
                      <a href="${noticia.url}" target="_blank">Leer más</a>`;
    newsContainer.appendChild(card);
  });
});
//---------------- script PARA LA API DE JUGADORES DE DOTA 2
// --------------------- RANKING DE JUGADORES (OpenDota Leaderboard) ---------------------
const STRATZ_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiOWVlMmYyNTUtMDcwYi00NGYxLThhMzAtYmFjZWI1YTYzNDczIiwiU3RlYW1JZCI6IjEwNjEzNzUyMTkiLCJBUElVc2VyIjoidHJ1ZSIsIm5iZiI6MTc2NDkzODk3MiwiZXhwIjoxNzk2NDc0OTcyLCJpYXQiOjE3NjQ5Mzg5NzIsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.p1J4cdJvUBbDhtIdiSodxHxli_BFXSUKMpZmWF7eQLM";  
fetch("https://api.stratz.com/api/v1/rankings/leaders", {
  headers: {
    "Authorization": `Bearer ${STRATZ_KEY}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (!data.entries || !Array.isArray(data.entries)) {
      console.error("Respuesta inesperada:", data);
      return;
    }

    let top = data.entries.slice(0, 10); // Top 10
    let container = document.getElementById("ranking-container");

    top.forEach(p => {
      let row = document.createElement("div");
      row.classList.add("ranking-row");

      row.innerHTML = `
        <div class="col">${p.name || "Unknown"}</div>
        <div class="col">${p.rankLeaderboardRank || "-"}</div>
        <div class="col">${p.rating || "-"}</div>
        <div class="col">${(p.winRate * 100).toFixed(1)}%</div>
        <div class="col">${p.matchCount}</div>
      `;

      container.appendChild(row);
    });

  })
  .catch(err => console.error("Error cargando ranking:", err));
