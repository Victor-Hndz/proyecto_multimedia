// Obtener elementos del DOM
const audio = document.getElementById('audio');
const sourceMp3 = document.getElementById('source-mp3');
const sourceOgg = document.getElementById('source-ogg');
const playPauseButton = document.getElementById('play-pause');
const muteButton = document.getElementById('mute');
const repeatButton = document.getElementById('repeat');
const skipBackwardButton = document.getElementById('skip-backward');
const skipForwardButton = document.getElementById('skip-forward');
const titleElement = document.getElementById('title');
const timeElement = document.getElementById('time');
const duration = document.getElementById('duration');
const progressEl = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume');
const volumeDisplay = document.getElementById('volumeDisplay');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
let mouseDownOnSlider = false;

// Establecer información de las pistas
var tracks = [
    {
        title: 'Sunwave snippet',
        autor: 'Independent Music Licensing Collective (IMLC)',
        src: {
            mp3: 'assets/audio/pista1.mp3',
            ogg: 'assets/audio/pista1.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License',
        url: 'https://freemusicarchive.org/music/independent-music-licensing-collective-imlc/jonas-hipper-snippets/sunwave-snippet/'
    },

    {
        title: 'Our Values',
        autor: 'Independent Music Licensing Collective (IMLC)',
        src: {
            mp3: 'assets/audio/pista2.mp3',
            ogg: 'assets/audio/pista2.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License'
    },

    {
        title: 'Fall and Rise',
        autor: 'Independent Music Licensing Collective (IMLC)',
        src: {
            mp3: 'assets/audio/pista3.mp3',
            ogg: 'assets/audio/pista3.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License'
    }
];

const hiddenTrack = [
    {
        title: 'Rickroll',
        autor: 'Rick Astley',
        src: {
            mp3: 'assets/audio/rickroll.mp3',
            ogg: 'assets/audio/rickroll.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License',
    }
];

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    volumeDisplay.textContent = `${Math.floor(audio.volume * 100)}%`;
});

audio.addEventListener("loadeddata", () => {
    progressEl.value = 0;
});
audio.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
        progressEl.value = audio.currentTime / audio.duration * 100;
    }
});
progressEl.addEventListener("change", () => {
    const pct = progressEl.value / 100;
    audio.currentTime = (audio.duration || 0) * pct;
});
progressEl.addEventListener("mousedown", () => {
    mouseDownOnSlider = true;
});
progressEl.addEventListener("mouseup", () => {
    mouseDownOnSlider = false;
});

// Actualizar la duración de la pista cuando se cargue
audio.addEventListener('loadedmetadata', () => {
    const durationInMinutes = Math.floor(audio.duration / 60);
    const durationInSeconds = Math.floor(audio.duration % 60);
    duration.textContent = `${durationInMinutes}:${durationInSeconds < 10 ? '0' + durationInSeconds : durationInSeconds}`;
});

// Inicializar el reproductor
let currentTrackIndex = 0;
sourceMp3.src = tracks[currentTrackIndex].src.mp3;
sourceOgg.src = tracks[currentTrackIndex].src.ogg;
audio.load();
titleElement.textContent = tracks[currentTrackIndex].title;

// Función para actualizar el tiempo de la pista
function updateTime() {
    const time = Math.floor(audio.currentTime);
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    timeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Función para reproducir o pausar la pista
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Función para ajustar el volumen
function adjustVolume(change) {
    const newVolume = audio.volume + change;
    if (newVolume < 0) {
        audio.volume = 0;
    } else if (newVolume > 1) {
        audio.volume = 1;
    } else {
        audio.volume = newVolume;
    }
    volumeDisplay.textContent = `${Math.floor(audio.volume * 100)}%`;
    volumeControl.value = audio.volume;
}

// Función para silenciar el sonido
function toggleMute() {
    audio.muted = !audio.muted;
    if (audio.muted) {
        muteButton.textContent = 'Unmute';
    } else {
        muteButton.textContent = 'Mute';
    }
}

// Función para repetir la pista
function toggleRepeat() {
    audio.loop = !audio.loop;
    if (audio.loop) {
        repeatButton.style.backgroundColor = 'green';
    } else {
        repeatButton.style.backgroundColor = 'transparent';
    }
}

// Función para avanzar o retroceder 10 segundos
function skipTime(seconds) {
    const newTime = audio.currentTime + seconds;
    if (newTime < 0) {
        audio.currentTime = 0;
    } else if (newTime > audio.duration) {
        audio.currentTime = audio.duration;
    } else {
        audio.currentTime = newTime;
    }
}

// Función para cambiar de pista
function changeTrack() {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    selectTrack(currentTrackIndex);
}

function selectTrack(index)
{
    audio.src = tracks[index].src.mp3;
    titleElement.textContent = tracks[index].title;
    timeElement.textContent = '0:00';
    audio.play();
    playPauseButton.textContent = 'Pause';  
}

function nextTrack(){
    currentTrackIndex = currentTrackIndex + 1;
    if(currentTrackIndex > tracks.length - 1){
        currentTrackIndex = 0;
    }
    selectTrack(currentTrackIndex);
}

function previousTrack(){
    currentTrackIndex = currentTrackIndex - 1;
    if(currentTrackIndex < 0){
        currentTrackIndex = tracks.length - 1;
    }
    selectTrack(currentTrackIndex);
}

function cargarCanciones(){
    var lista = document.getElementById("listaCanciones");
    lista.innerHTML = "";
    tracks.forEach(track => {
        lista.innerHTML += "<div class='row' onclick='selectTrack(" + tracks.indexOf(track) + ")'> <div class='col-5'><img/><div class='col-7'><h3>" + track.title + "</h3><h4>" + track.autor + "</h4></div></div><div class='col-3'><p>" + track.duration + "</p></div></div>";
    });
}


// Asignar eventos a los botones
playPauseButton.addEventListener('click', togglePlayPause);
muteButton.addEventListener('click', toggleMute);
repeatButton.addEventListener('click', toggleRepeat);
skipBackwardButton.addEventListener('click', () => skipTime(-10));
skipForwardButton.addEventListener('click', () => skipTime(10));
audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('ended', changeTrack);
next.addEventListener('click', nextTrack);
previous.addEventListener('click', previousTrack);
window.addEventListener("load", cargarCanciones);