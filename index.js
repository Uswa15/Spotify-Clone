//alert("Welcome to Spotify");

let songList=[
    {songName:"Blinding Lights" , filePath:"Songs/1.mp3" ,SongCover:"Covers/Blinding lights.jpg"},
    {songName:"Out of time" , filePath:"Songs/2.mp3" ,SongCover:"Covers/out of time cover.jpg"},
    {songName:"After hours" , filePath:"Songs/3.mp3" ,SongCover:"Covers/after hours cover.jpg"},
    {songName:"Alone again" , filePath:"Songs/4.mp3" ,SongCover:"Covers/alone again cover.jpg"},
    {songName:"In your eyes" , filePath:"Songs/5.mp3" ,SongCover:"Covers/in ur eyes cover.jpg"},
 ]

  let SongIndex=0;
  let audioElement=new Audio("Songs/1.mp3");
  let playButton=document.getElementById("PlayButton");
  let progressBar=document.getElementById("ProgressBar");
  let gif=document.getElementById("gif");
  let SongNamedisplay=document.getElementById("SongNamedisplay");
  let Items=Array.from(document.getElementsByClassName("SongItem"));
  let miniButtons= Array.from(document.getElementsByClassName("SongItemPlay"));

  Items.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songList[i].SongCover;
    element.getElementsByClassName("songName")[0].innerText = songList[i].songName;
    
});


 playButton.addEventListener("click",function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playButton.classList.remove("fa-play-circle");
        playButton.classList.add("fa-pause-circle");
 
        miniButtons[SongIndex].classList.remove("fa-play-circle");
        miniButtons[SongIndex].classList.add("fa-pause-circle");

        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        playButton.classList.add("fa-play-circle");
        playButton.classList.remove("fa-pause-circle");

        miniButtons[SongIndex].classList.add("fa-play-circle");
        miniButtons[SongIndex].classList.remove("fa-pause-circle");

        gif.style.opacity=0;
    }
 })

 audioElement.addEventListener("timeupdate" , function(){
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
 })

progressBar.addEventListener("change" , function(){
          audioElement.currentTime=progressBar.value*audioElement.duration/100;
 })

 MakeAllPlay=()=>{
    Array.from(document.getElementsByClassName("SongItemPlay")).forEach((event)=>{
        event.classList.remove("fa-pause-circle");
        event.classList.add("fa-play-circle");
    })
 }

 miniButtons.forEach((event)=>{
    event.addEventListener("click",(event)=>{
        SongIndex = parseInt(event.target.id);
        if(audioElement.src.includes(`Songs/${SongIndex + 1}.mp3`)){
        if(audioElement.paused){
            audioElement.play();
            event.target.classList.remove("fa-play-circle");
            event.target.classList.add("fa-pause-circle");
            playButton.classList.remove("fa-play-circle");
            playButton.classList.add("fa-pause-circle");
        }
        else{
            audioElement.pause();
            event.target.classList.add("fa-play-circle");
            event.target.classList.remove("fa-pause-circle");
            playButton.classList.add("fa-play-circle");
            playButton.classList.remove("fa-pause-circle");
        }}
        else{
        MakeAllPlay();
        SongIndex=parseInt(event.target.id);
        event.target.classList.remove("fa-play-circle");
        event.target.classList.add("fa-pause-circle");
        SongNamedisplay.innerText=songList[SongIndex].songName;
        audioElement.src = `Songs/${SongIndex + 1}.mp3`
        audioElement.play();
        audioElement.currentTime=0;
        playButton.classList.remove("fa-play-circle");
        playButton.classList.add("fa-pause-circle");
        }
    });
});

document.getElementById("next").addEventListener("click",()=>{
    if(SongIndex>=4){
        SongIndex=0;
    }
    else{
        SongIndex+=1;
    }
    audioElement.src = `Songs/${SongIndex + 1}.mp3`;
    audioElement.play();
    SongNamedisplay.innerText=songList[SongIndex].songName;
    audioElement.currentTime=0;

    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
        
     MakeAllPlay();
     
     miniButtons[SongIndex].classList.remove("fa-play-circle");
     miniButtons[SongIndex].classList.add("fa-pause-circle");

})

document.getElementById("previous").addEventListener("click",()=>{
    if(SongIndex<=0){
        SongIndex=0;
    }
    else{
        SongIndex-=1;
    }
    audioElement.src = `Songs/${SongIndex + 1}.mp3`;
    audioElement.play();
    SongNamedisplay.innerText=songList[SongIndex].songName;
    audioElement.currentTime=0;

    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
})
