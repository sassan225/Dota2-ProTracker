const btn = document.getElementById("search-btn");
const playerInfo = document.getElementById("player-info");
const recentMatchesDiv = document.getElementById("recent-matches");

btn.addEventListener("click", async () => {
  const nickname = document.getElementById("player-input").value.trim();

  if (!nickname) {
    alert("Ingresa un nickname válido");
    return;
  }

  try {
    // 1️⃣ Buscar el jugador por nickname
    const searchResponse = await fetch(`https://api.opendota.com/api/search?q=${nickname}`);
    const searchData = await searchResponse.json();

    if (!searchData || searchData.length === 0) {
      playerInfo.innerHTML = "<p>No se encontró el jugador.</p>";
      recentMatchesDiv.innerHTML = "";
      return;
    }

    const account_id = searchData[0].account_id;

    // 2️⃣ Obtener datos del jugador
    const playerResponse = await fetch(`https://api.opendota.com/api/players/${account_id}`);
    const playerData = await playerResponse.json();

    if (!playerData.profile) {
      playerInfo.innerHTML = "<p>Perfil privado o no disponible.</p>";
      recentMatchesDiv.innerHTML = "";
      return;
    }

    playerInfo.innerHTML = `
      <h2>${playerData.profile.personaname}</h2>
      <img src="${playerData.profile.avatarfull}" alt="Avatar">
      <p>MMR estimado: ${playerData.mmr_estimate?.estimate || "No disponible"}</p>
    `;

    // 3️⃣ Obtener últimas 5 partidas recientes
    const matchesResponse = await fetch(`https://api.opendota.com/api/players/${account_id}/recentMatches`);
    const matchesData = await matchesResponse.json();

    recentMatchesDiv.innerHTML = "<h3>Últimas 5 partidas</h3>";

    matchesData.slice(0,5).forEach(match => {
      recentMatchesDiv.innerHTML += `
        <div class="match">
          <p>Héroe: ${match.hero_id} | K/D/A: ${match.kills}/${match.deaths}/${match.assists} | Resultado: ${match.radiant_win === match.player_slot < 128 ? "Victoria" : "Derrota"}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error:", error);
    playerInfo.innerHTML = "<p>No se pudo obtener la información.</p>";
    recentMatchesDiv.innerHTML = "";
  }
});
