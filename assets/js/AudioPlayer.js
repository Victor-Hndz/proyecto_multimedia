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
const autorElement = document.getElementById('artist');
const timeElement = document.getElementById('time');
const duration = document.getElementById('duration');
const progressEl = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume');
const volumeDisplay = document.getElementById('volumeDisplay');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const shuffle = document.getElementById('shuffle');
const progressVar = document.querySelectorAll('input[type="range"].slider-progress');
let mouseDownOnSlider = false;
let isShuffle = false;

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
        portada: 'assets/img/pista1.jpg',
        duration: '00:33',
        url: 'https://freemusicarchive.org/music/independent-music-licensing-collective-imlc/jonas-hipper-snippets/sunwave-snippet/'
    },

    {
        title: 'Our Values',
        autor: 'Independent Music Licensing Collective (IMLC)',
        src: {
            mp3: 'assets/audio/pista2.mp3',
            ogg: 'assets/audio/pista2.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License',
        portada: 'assets/img/pista2.jpg',
        duration: '02:30'
    },

    {
        title: 'Fall and Rise',
        autor: 'Independent Music Licensing Collective (IMLC)',
        src: {
            mp3: 'assets/audio/pista3.mp3',
            ogg: 'assets/audio/pista3.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License',
        portada: 'assets/img/pista3.jpg',
        duration: '03:28'
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
        portada: 'assets/img/rick-roll.jpg',
        duration: '03:32'
    }
];

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    volumeDisplay.textContent = `${Math.floor(audio.volume * 100)}`;
});

audio.addEventListener("loadeddata", () => {
    progressEl.value = 0;
});

audio.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
        progressEl.value = audio.currentTime / audio.duration * 100;
        //Pintamos la barra de progreso
        progressEl.style.setProperty('--value', progressEl.value);
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
autorElement.textContent = tracks[currentTrackIndex].autor;

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
        playPauseButton.innerHTML = '<i id="play-pause" class="bi bi-pause-circle-fill icono"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i id="play-pause" class="bi bi-play-circle-fill icono"></i>';
    }
}

// Función para ajustar el volumenz
function adjustVolume(change) {
    const newVolume = audio.volume + change;
    if (newVolume < 0) {
        audio.volume = 0;
    } else if (newVolume > 1) {
        audio.volume = 1;
    } else {
        audio.volume = newVolume;
    }
    volumeDisplay.textContent = `${Math.floor(audio.volume * 100)}`;
    volumeControl.value = audio.volume;
}

// Función para silenciar el sonido
function toggleMute() {
    audio.muted = !audio.muted;
    if (audio.muted) {
        muteButton.innerHTML = '<i id="mute" class="bi bi-volume-mute-fill icono"></i>';
        volumeDisplay.textContent = '0';
    } else {
        muteButton.innerHTML = '<i id="mute" class="bi bi-volume-down-fill icono"></i>';
        volumeDisplay.textContent = `${Math.floor(audio.volume * 100)}`;
    }
}

//Función para el modo aleatorio
function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffle.style.color = "#b2b2b2";
    } else {
        shuffle.style.color = 'black';
    }
}

// Función para repetir la pista
function toggleRepeat() {
    audio.loop = !audio.loop;
    if (audio.loop) {
        repeatButton.style.color = "#b2b2b2";
    } else {
        repeatButton.style.color = 'black';
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

// Función para cambiar de pista aleatoriamente
function changeTrack() {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    selectTrack(currentTrackIndex);
}

function selectTrack(index) {
    audio.src = tracks[index].src.mp3;
    titleElement.textContent = tracks[index].title;
    autorElement.textContent = tracks[index].autor;
    timeElement.textContent = '0:00';
    audio.play();
    playPauseButton.innerHTML = '<i id="play-pause" class="bi bi-pause-circle-fill icono"></i>';
}

function nextTrack() {
    if (!audio.loop) {
        if (!isShuffle) {
            currentTrackIndex = currentTrackIndex + 1;
            if (currentTrackIndex > tracks.length - 1) {
                currentTrackIndex = 0;
            }
            selectTrack(currentTrackIndex);
        } else {
            changeTrack();
        }
    } else {
        audio.currentTime = 0;
    }
}

function previousTrack() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else if (!audio.loop) {
        if (isShuffle) {
            currentTrackIndex = currentTrackIndex - 1;
            if (currentTrackIndex < 0) {
                currentTrackIndex = tracks.length - 1;
            }
            selectTrack(currentTrackIndex);
        } else {
            changeTrack();
        }
    } else {
        audio.currentTime = 0;
    }
}

function cargarCanciones() {
    var lista = document.getElementById("listaCanciones");
    lista.innerHTML = "";
    tracks.forEach(track => {
        lista.innerHTML += "<div class='row lista_canciones' onclick='selectTrack(" + tracks.indexOf(track) + ")'> <div class='container-lista'><img src="+ track.portada +" alt="+track.title+"/><div><h3>" + track.title + "</h3><h4>" + track.autor + "</h4><p>" + track.duration + "</p></div></div></div>";
    });
}


// Asignar eventos a los botones
playPauseButton.addEventListener('click', togglePlayPause);
muteButton.addEventListener('click', toggleMute);
shuffle.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);
skipBackwardButton.addEventListener('click', () => skipTime(-10));
skipForwardButton.addEventListener('click', () => skipTime(10));
audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('ended', nextTrack);
next.addEventListener('click', nextTrack);
previous.addEventListener('click', previousTrack);
window.addEventListener("load", cargarCanciones);

for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

for (let e of document.querySelectorAll('input[type="range"].slider-progress2')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
