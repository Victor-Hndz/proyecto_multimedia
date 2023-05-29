const barra = document.getElementById('progress-bar-Video');
const muteButtonVideo = document.getElementById('muteVideo');
const volumeControlVideo = document.getElementById('volumeVideo');
const volumeDisplayVideo = document.getElementById('volumeDisplayVideo');
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

volumeControlVideo.addEventListener('input', function () {
    player.setVolume(volumeControlVideo.value * 100);
    volumeDisplayVideo.innerHTML = volumeControlVideo.value * 100;
}, false);

//lista json de toods los videos
var videos = [
    {
        id: "Iqes7ILJbiY",//https://www.youtube.com/watch?v=Iqes7ILJbiY
        title: "Estoy entre una niña y el hachís",
    },
    {
        id: "1ieGQ_YddX0",//https://www.youtube.com/watch?v=1ieGQ_YddX0&t=1s
        title: "How dwarf fortress was made"
    },
    {
        id: "wlt1XV0-ksk",//https://www.youtube.com/watch?v=wlt1XV0-ksk&t=1s
        title: "16KB RAM Has Redstone Surpassed Rocket Science ?"
    },
    {
        id: "gzthb6gqLDY",//https://www.youtube.com/watch?v=gzthb6gqLDY&t=1s
        title: "My final message goodbye"
    }
];

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var currentVideo = 0;
function onYouTubeIframeAPIReady() {//funcion que se ejecuta cuando se carga el iframe
    //haz que este video no tenga videos relacionados al final 
    //https://www.youtube.com/watch?v=M7lc1UVf-VE&rel=0
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videos[0].id,
        playerVars: { controls: 0, modestbrading: 1, rel: 0, showinfo: 0, fs: 0, iv_load_policy: 3, disablekb: 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {// funcion que se ejecuta cuando el video esta vaciado
    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    var time_update_interval;

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//cuando se acaba el video pasamos al siguiente
function onPlayerStateChange(event) {
    if (player.getPlayerState() == 0) {
        nextVideo();
    }
}
//paramos el video
function stopVideo() {
    player.stopVideo();
}
//funcion de play pause
function playPause() {
    if (player.getPlayerState() == 1) {
        player.pauseVideo();
        document.getElementById("playPauseVideo").className = "bi bi-play-circle-fill icono";
    }
    else {
        player.playVideo();
        document.getElementById("playPauseVideo").className = "bi bi-pause-circle-fill icono";
    }

}
//funcion para pasar 10 segundos
function move10(direction) {
    var time = player.getCurrentTime();
    if (direction) {
        player.seekTo(time + 10);
    }
    else {
        player.seekTo(time - 10);
    }
}
//funcion para hacer mute
function mute() {
    if (player.isMuted()) {
        player.unMute();
        document.getElementById("mute_video").className = "bi bi-volume-down-fill icono";
        volumeDisplayVideo.innerText = `${Math.floor(player.getVolume())}`;
    }
    else {
        player.mute();
        document.getElementById("mute_video").className = "bi bi-volume-mute-fill icono";
        volumeDisplayVideo.innerText = "0";
    }
}
//funcion para cambiar el video
function changeVideo(video) {
    barra.value = 0;
    barra.style.setProperty('--value', barra.value);
    currentVideo = videos.indexOf(video);
    player.loadVideoById(video.id);
    player.playVideo();
}
//funcion para pasar al siguiente video
function nextVideo() {
    index = currentVideo + 1;
    if (index >= videos.length) {
        index = 0;
    }
    console.log(index);
    changeVideo(videos[index]);
}
//funcion para pasar al video anterior
function prevVideo() {
    index = currentVideo - 1;
    if (index < 0) {
        index = videos.length - 1;
    }
    changeVideo(videos[index]);
}
//funcion para cambiar el video usando la id
function changeVideoWithID(video_id) {
    videos.forEach(video => {
        if (video.id == video_id) {
            changeVideo(video);
        }
    });
}
//funcion para cargar los videos en la pagina
function cargarVideos() {
    var lista = document.getElementById("lista-videos");
    lista.innerHTML = "";

    videos.forEach(video => {
        lista.innerHTML += "<div class='row lista_canciones' onclick=\" return changeVideoWithID('" + video.id + "')\"> <div class='container-lista'><img src='https://img.youtube.com/vi/" + video.id + "/maxresdefault.jpg'" + +" alt='" + video.title + "'/><div><h3>" + video.title + "</h3></div></div></div>";
    });
}
//funcion para actualizar el segundero
function updateTimerDisplay() {
    // Update current time text display.
    document.getElementById("timeVideo").innerText = formatTime(player.getCurrentTime());
    document.getElementById("durationVideo").innerText = formatTime(player.getDuration());
}
//funcion para formatear el tiempo
function formatTime(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

barra.addEventListener("change", function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

// This function is called by initialize()
function updateProgressBar() {
    // Update the value of our progress bar accordingly.
    barra.value = (player.getCurrentTime() / player.getDuration()) * 100;
    barra.style.setProperty('--value', barra.value);
}

muteButtonVideo.addEventListener('click', toggleMute);
window.addEventListener("load", cargarVideos);