const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP3/Batida%20de%20Zapote/2_Ph_t_H_n_-_KAIZ_Remix.mp3",
    displayName: "2 Phút Hơn - KAIZ Remix",
    cover:
      "assets/1.jpg",
    artist: "Phao, KAIZ",
  },
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP3/Batida%20de%20Zapote/Agony.mp3",
    displayName: "Agony",
    cover:
      "assets/2.jpg",
    artist: "Azedia",
  },
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP3/Batida%20de%20Zapote/Autre_temps.mp3",
    displayName: "Autre temps",
    cover:
      "assets/3.jpg",
    artist: "Alcest",
  },
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP4/Casiio%20x%20Sleepermane%20x%20%C3%98DYSSEE%20%E2%80%93%20Suntai.mp4",
    displayName: "Suntai",
    cover:
      "assets/1.jpg",
    artist: "Casiio x Sleepermane",
  },
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP4/Casiio%20x%20Sleepermane%20%E2%80%93%20Afterglow.mp4",
    displayName: "Afterglow",
    cover:
      "assets/2.jpg",
    artist: "Casiio x Sleepermane",
  },
  {
    path: "https://github.com/semanticdata/public-test/raw/main/MP4/Casiio%20x%20Sleepermane%20%E2%80%93%20Atoms.mp4",
    displayName: "Atoms",
    cover:
      "assets/3.jpg",
    artist: "Casiio x Sleepermane",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);