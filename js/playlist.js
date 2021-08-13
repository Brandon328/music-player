let loadPlayList = () => {
  const playlist = document.querySelector("#playlist");

  songs.forEach((e)=>{
    playlist.insertAdjacentHTML('beforeend', `
      <div class="song">
        <img class="playlist-img" src="${e.img}" alt="imagen del album de la musica">
        <div class="title-section">
          <h3 class="playlist-name" id="${e.id}-title">${e.name}</h3>
          <span class="playlist-artist">${e.artist}</span>
        </div>
        <button type="button" class="playlist-playpause" id="${e.id}-playpause">
          <i class="fas fa-play" id="${e.id}-playpause-icon"></i>
        </button>
      </div>
    `);
  });
}

loadPlayList();
