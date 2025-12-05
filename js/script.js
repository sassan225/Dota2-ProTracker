import './carrusel.js'
import { initCarrusel } from './carrusel.js';
initCarrusel();

// --- Pestañas del menú ---
const tabs = document.querySelectorAll(".top-menu li");
const sections = document.querySelectorAll("main section");

tabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    sections.forEach(s => s.classList.add("hidden"));
    sections[idx].classList.remove("hidden");
  });
});


// fin del carrusel del home //


//----------------------------------------------------------------------//

// --- Estadísticas debajo del carrusel ---
document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.getElementById('stats-container');

  fetch('https://api.opendota.com/api/heroStats')
    .then(res => res.json())
    .then(data => {
      const topHeroes = data.slice(0, 10); // primeros 10 héroes

  topHeroes.forEach(hero => {
  const heroId = hero.name.replace('npc_dota_hero_', '');
  const winrate = hero.pro_pick ? (hero.pro_win / hero.pro_pick * 100) : 0;
  const pickrate = hero.pro_pick ? (hero.pro_pick / data.reduce((sum, h) => sum + h.pro_pick, 0) * 100) : 0;

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
});
//--------------------------------------------------------------------------
//Api de yotube para los videos de dota 2

const API_KEY = "AIzaSyBB8MajhXbj_d6f5rvI7x7hs4onHGzozMc";
const query = "Dota 2";
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${API_KEY}`;

fetch(url)
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
  });
