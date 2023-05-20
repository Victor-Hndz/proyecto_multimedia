 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
    //haz que este video no tenga videos relacionados al final 
    //https://www.youtube.com/watch?v=M7lc1UVf-VE&rel=0
   player = new YT.Player('player', {
     height: '360',
     width: '640',
     videoId: 'M7lc1UVf-VE',
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
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
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