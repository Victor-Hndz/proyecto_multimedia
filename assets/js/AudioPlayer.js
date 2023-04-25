// Obtener elementos del DOM
const audio = document.getElementById('audio');
const sourceMp3 = document.getElementById('source-mp3');
const sourceOgg = document.getElementById('source-ogg');
const playPauseButton = document.getElementById('play-pause');
const volumeUpButton = document.getElementById('volume-up');
const volumeDownButton = document.getElementById('volume-down');
const muteButton = document.getElementById('mute');
const repeatButton = document.getElementById('repeat');
const skipBackwardButton = document.getElementById('skip-backward');
const skipForwardButton = document.getElementById('skip-forward');
const titleElement = document.getElementById('title');
const timeElement = document.getElementById('time');

// Establecer información de las pistas
const tracks = [
    {
        title: 'Pista 1',
        src: {
            mp3: 'assets/audio/rickroll.mp3',
            ogg: 'assets/audio/rickroll.ogg'
        },
        license: 'Creative Commons Attribution 4.0 International License',
        url: 'https://www.example.com/audio1'
    }
];

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
    audio.src = tracks[currentTrackIndex].src.mp3;
    titleElement.textContent = tracks[currentTrackIndex].title;
    timeElement.textContent = '0:00';
    audio.play();
    playPauseButton.textContent = 'Pause';
}

// Asignar eventos a los botones
playPauseButton.addEventListener('click', togglePlayPause);
volumeUpButton.addEventListener('click', () => adjustVolume(0.1));
volumeDownButton.addEventListener('click', () => adjustVolume(-0.1));
muteButton.addEventListener('click', toggleMute);
repeatButton.addEventListener('click', toggleRepeat);
skipBackwardButton.addEventListener('click', () => skipTime(-10));
skipForwardButton.addEventListener('click', () => skipTime(10));
audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('ended', changeTrack);

