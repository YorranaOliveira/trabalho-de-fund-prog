const songs = [
  "Até que eu não consiga mais ficar de pé",
  "Me derramar",
  "Escudo",
  "Eu não desisto",
  "A benção",
  "Pra sempre",
];
const player = document.getElementById("player");
const progress_bar = document.getElementById('progress')

const createSongList = () => {
  const list = document.createElement("ol");
  for (let i = 0; i < songs.length; i++) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(songs[i]));
    list.appendChild(item);
  }
  return list;
};

const songList = document.getElementById("songList");
songList.appendChild(createSongList());
const links = document.querySelectorAll("li");
for (const link of links) {
  link.addEventListener("click", setSong);
}

function setSong(e) {
  document.querySelector("#headphones").classList.remove("pulse");

  const source = document.getElementById("source");
  source.src = "songs/" + e.target.innerText;
  document.getElementById(
    "currentSong"
  ).innerText =  e.target.innerText;

  player.load();
  player.play();

  document.querySelector("#headphones").classList.add("pulse");
}

function playAudio() {
  if (player.readyState) {
    player.play();
  }
}

function pauseAudio() {
  player.pause();
}

const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume;
};

function updateProgress() {
  if (player.currentTime > 0) {
    const progressBar = document.getElementById("progress");
    progressBar.value = (player.currentTime / player.duration) * 100;
  }
}

progress_bar.addEventListener('click', (event) => {

  let totalX = progress_bar.clientWidth;
  let mouseX = event.offsetX;
  let song_duration = player.duration;
  let new_time = parseInt((mouseX * song_duration) / totalX)

  player.currentTime = new_time;
  progress_bar.value = (new_time * 100) / song_duration;
  
})