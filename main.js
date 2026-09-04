// Variable global para mantener la instancia de PlayerJS
let playerInstance = null;

// Función para inicializar o cambiar el video en PlayerJS
function reproducirVideo(urlVideo, posterVideo) {
  // Si PlayerJS ya existe, cargamos la nueva URL
  if (playerInstance) {
    playerInstance.api("play", urlVideo);
  } else {
    // Si no se ha creado, instanciamos el reproductor en el div #player
    playerInstance = new Playerjs({
      id: "player",
      file: urlVideo,
      poster: posterVideo,
      autoplay: 1
    });
  }
}

// Renderizado de las tarjetas desde playlist_3.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("video-grid");

  if (typeof PLAYLIST_VIDEOS !== "undefined" && grid) {
    PLAYLIST_VIDEOS.forEach((video) => {
      // Crear la tarjeta HTML
      const card = document.createElement("div");
      card.className = "video-card";
      
      card.innerHTML = `
        <div class="thumbnail-container">
          <img src="${video.poster}" alt="${video.titulo}" loading="lazy">
        </div>
        <div class="video-info">
          <h3 class="video-title">${video.titulo}</h3>
          <p class="video-canal">${video.canal} • ${video.suscriptores}</p>
          <p class="video-meta">${video.fecha}</p>
        </div>
      `;

      // Evento Click: al tocar la tarjeta, PlayerJS reproduce el mp4 correspondiente
      card.addEventListener("click", () => {
        reproducirVideo(video.url, video.poster);
        // Scroll suave hacia arriba para ver el reproductor
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      grid.appendChild(card);
    });
  }
});
