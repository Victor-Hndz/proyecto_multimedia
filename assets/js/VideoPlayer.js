 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 var videos = [
    {
        id: "yJK6uHsX-xU",
        title: "Musikita pokemon",
    },
    {
        id: "1ieGQ_YddX0",
        title: "How dwarf fortress was made"
    },
    {
        id: "wlt1XV0-ksk",
        title: "16KB RAM Has Redstone Surpassed Rocket Science ?"
    },
    {
        id: "gzthb6gqLDY",
        title: "My final message goodbye"
    }
 ];

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 var currentVideo = 0;
 function onYouTubeIframeAPIReady() {
    //haz que este video no tenga videos relacionados al final 
    //https://www.youtube.com/watch?v=M7lc1UVf-VE&rel=0
   player = new YT.Player('player', {
     height: '360',
     width: '640',
     videoId: videos[0].id,
     playerVars: {controls: 0, modestbrading:  1, rel: 0, showinfo: 0, fs: 0, iv_load_policy: 3, disablekb: 1},
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
  function onPlayerStateChange(event) {
    if(player.getPlayerState() == 0)
    {
        nextVideo();   
    }
 }
 function stopVideo() {
   player.stopVideo();
 }

 function playPause()
 {
    if(player.getPlayerState() == 1)
        {
            player.pauseVideo();
            document.getElementById("playPauseVideo").className = "bi bi-pause-circle-fill icono";
        }
    else
        {
            player.playVideo();
            document.getElementById("playPauseVideo").className = "bi bi-play-circle-fill icono";
        }

}

function move10(direction)
{
    var time = player.getCurrentTime();
    if(direction)
        {
            player.seekTo(time + 10);
        }
    else
        {
            player.seekTo(time - 10);
        }
}

function mute()
{
    if(player.isMuted())
        {
            player.unMute();
            document.getElementById("mute_video").className = "bi bi-volume-down-fill icono";
        }
    else
        {
            player.mute();
            document.getElementById("mute_video").className = "bi bi-volume-mute-fill icono";
            document.getElementById("volumeDisplayVideo").innerText = "0";
        }
}

function changeVideo(video)
{
    currentVideo = videos.indexOf(video);
    player.loadVideoById(video.id);
    player.playVideo();
}

function nextVideo(){
    index = currentVideo + 1;
    if(index >= videos.length)
        {
            index = 0;
        }
    console.log(index);
    changeVideo(videos[index]);
}

function prevVideo(){
    index = currentVideo - 1;
    if(index < 0)
        {
            index = videos.length - 1;
        }
    changeVideo(videos[index]);
}
function changeVideoWithID(video_id)
{
    videos.forEach(video => {
        if(video.id == video_id)
            {
                changeVideo(video);
            }
    });  
}
function cargarVideos()
{
    var lista = document.getElementById("lista-videos");
    lista.innerHTML = "";
    console.log("hola");
    videos.forEach(video => {
        lista.innerHTML += "<div class='row lista_canciones' onclick=\" return changeVideoWithID('" + video.id + "')\"> <div class='container-lista'><img src='https://img.youtube.com/vi/" + video.id +"/maxresdefault.jpg'"+  +" alt='"+video.title+"'/><div><h3>" + video.title + "</h3></div></div></div>";
    });
}

window.addEventListener("load", cargarVideos);