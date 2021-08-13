window.onload = ()=>{
  timeCounter();
  reproducir();
};

// ================== GLOBAL VARIABLES
const play_pause = document.querySelector("#play-pause");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const loop = document.querySelector("#loop");
const shufle = document.querySelector("#shufle");
const progress_bar = document.querySelector("#progress");
const volume_range = document.querySelector("#volume-range");
const playlist_icon = document.querySelector("#playlist-icon");

let songIndex = 0; let shufleOnOff=false;
let isPlayed = false;
let audio = new Audio();
// =====

// ======================================== PLAY LIST ICON
playlist_icon.addEventListener('click', e=>{
  const music_section = document.querySelector("#music-section");
  const playlist_section = document.querySelector("#playlist");
  
  if(e.target.className=="fas fa-list") {
    music_section.style.display="none";
    playlist_section.style.display="block";
    e.target.className="fas fa-arrow-left";
  }
  else{
    music_section.style.display="flex";
    playlist_section.style.display="none";
    e.target.className="fas fa-list";
  } 
});


// =====

// ================================ PLAY PAUSE BUTTON
play_pause.addEventListener('click', ()=>{
  if(isPlayed){
    audio.pause(); isPlayed=false;
  }
  else{
    audio.play(); isPlayed=true;
  }
});

// ======= PLAYLIST - PLAY PAUSE BUTTON
songs.forEach((e)=>{
  document.querySelector(`#${e.id}-playpause`).addEventListener('click', ()=>{
    const thisSongIndex=parseInt(e.id.slice(4))-1;
    
    if(songIndex==thisSongIndex){
      play_pause.click();
    }
    else{
      playPause();
      songIndex = thisSongIndex;
      isPlayed=true;
      reproducir();
    }
  });
});

function playPause(){
  if(isPlayed){
    const prevPlayPauseBtn = document.querySelector(`#${songs[songIndex].id}-playpause`);
    const prevSongIcon=document.querySelector(`#${songs[songIndex].id}-playpause-icon`);
    const song_title = document.querySelector(`#${songs[songIndex].id}-title`);

    prevSongIcon.style.color = "black";  
    prevSongIcon.className = 'fas fa-play';
    prevPlayPauseBtn.style.background="var(--gray)";
    song_title.style.color="black";
  }
}


// ========= PLAY PAUSE AUDIO
audio.addEventListener('pause', ()=>{
  const play_pause_icon = document.querySelector("#play-pause-icon");
  const playlist_play_pause_icon = document.querySelector(`#${songs[songIndex].id}-playpause-icon`);
  const playlist_play_pause = document.querySelector(`#${songs[songIndex].id}-playpause`);
  const song_title = document.querySelector(`#${songs[songIndex].id}-title`);
  const music_status = document.querySelector("#music-status");

  play_pause_icon.className = play_pause_icon.className.replace('fa-pause' , 'fa-play');
  playlist_play_pause.style.background="var(--gray)";
  playlist_play_pause_icon.className = "fas fa-play";
  playlist_play_pause_icon.style.color = "black";
  song_title.style.color="black";  
  music_status.textContent="MUSIC PLAYER";
});

audio.addEventListener('play', ()=>{
  const play_pause_icon = document.querySelector("#play-pause-icon");
  const playlist_play_pause_icon = document.querySelector(`#${songs[songIndex].id}-playpause-icon`);
  const playlist_play_pause = document.querySelector(`#${songs[songIndex].id}-playpause`);
  const song_title = document.querySelector(`#${songs[songIndex].id}-title`);
  const music_status = document.querySelector("#music-status");
  
  play_pause_icon.className = play_pause_icon.className.replace('fa-play' , 'fa-pause' );
  playlist_play_pause.style.background="var(--primary-color)";
  playlist_play_pause_icon.className = "fas fa-pause";
  playlist_play_pause_icon.style.color = "white";
  song_title.style.color="#2a63ff";
  music_status.textContent="PLAYING NOW...";
});

function reproducir(){
  const song_img=document.querySelector("#music-img");
  const song_title = document.querySelector("#music-title");
  const song_artist = document.querySelector("#music-artist");

  song_img.src = songs[songIndex].img;
  song_title.textContent = songs[songIndex].name;
  song_artist.textContent = songs[songIndex].artist;

  audio.src = songs[songIndex].url;

  if(isPlayed){
    audio.play();
  }
} 
// ====


// ================================== NEXT BUTTON
next.addEventListener('click', ()=>{
  playPause();
  if(shufleOnOff) nextShufle();
  else{
    songIndex++;
    if(songIndex>=songs.length) songIndex=0;
    reproducir();
  }
});
// ====


// ================================ PREVIOUS BUTTON
prev.addEventListener('click', ()=>{
  playPause();
  if(shufleOnOff) nextShufle();
  else{
    songIndex--;
    if(songIndex<0) songIndex=songs.length-1;
    reproducir();
  }
});
// === 

// ====================================== LOOP BUTTON
loop.addEventListener('click', ()=>{
  const loopIcon = document.getElementById("loop-icon");
  if(audio.loop){
    audio.loop=false;
    loopIcon.style.color = "black";
  }
  else{
    audio.loop=true;
    loopIcon.style.color = "#2a63ff";
    if(shufleOnOff) shufle.click();
  }
});
// === 

// ============================================== SHUFFLE BUTTON
shufle.addEventListener('click', ()=>{
  const shuffleIcon = document.querySelector("#shuffle-icon");
  if(shufleOnOff){
    shufleOnOff=false;
    shuffleIcon.style.color = "black";
  }
  else{
    shufleOnOff=true;
    shuffleIcon.style.color = "#2a63ff";
    if(audio.loop) loop.click();
  }
});

function nextShufle() {
  if(isPlayed){
    const prevSongIcon=document.querySelector(`#${songs[songIndex].id}-playpause-icon`);
    prevSongIcon.className = 'fas fa-play';
  }
  songIndex = Math.floor(Math.random() * songs.length);
  reproducir();
}
// === 


// ===================== VOLUME BUTTON
volume_range.addEventListener('change', e=>{
  audio.volume=e.target.value;
});

audio.addEventListener('volumechange', ()=>{
  const volume_icon = document.querySelector("#volume");

  if(audio.volume<1) volume_icon.className="fas fa-volume-down";
  if(audio.volume==1) volume_icon.className="fas fa-volume-up";
  if(audio.volume==0) volume_icon.className="fas fa-volume-mute";
});
// ======


// ==================== PROGRESS BAR
progress_bar.addEventListener('click', e=>{
  const scrubTime = (e.offsetX / e.target.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
});

audio.addEventListener('timeupdate', ()=>{timeCounter();});

let timeCounter = ()=>{
  const currtime_span=document.querySelector("#current-time");
  const lefttime_span=document.querySelector("#left-time");

  let currtime = parseInt(audio.currentTime);
  let duration = isNaN(audio.duration) ? 0 : parseInt(audio.duration);
  let value = currtime*100/duration;
  progress_bar.value = currtime==0 ? 0 : value;

  let csecondTime = parseInt(currtime%60);
  let cminuteTime = parseInt(currtime/60);

  let lsecondTime = parseInt((duration-currtime)%60);
  let lminuteTime = parseInt((duration-currtime)/60);

  currtime_span.innerText = `${cminuteTime}:${csecondTime<10 ? `0${csecondTime}` : csecondTime}`;
  lefttime_span.innerText = `${lminuteTime}:${(lsecondTime<10) ? `0${lsecondTime}` : lsecondTime}`;
};
// =======

// ========== OTHERS
audio.addEventListener('ended', ()=>{if(!audio.loop) next.click();});
audio.addEventListener('canplay', ()=>{
  timeCounter();
});


