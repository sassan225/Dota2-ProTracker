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
      var topHeroes = data.slice(0, 10);

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
var API_KEY = "AIzaSyDI0-Vr2yL90SVOZYVHBvOhXHRZboO3_oU"; // Cambia esto por tu API key
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
