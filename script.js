console.log("Music App");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songIcon = document.getElementById('songItemContainer');

let songs = [
    {songName: "Fir se udd chala", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",length:"5:02"},
    {songName: "Dil chahta hai ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",length:"6:12"},
    {songName: "Yarron Dosti badi hin ajib hai", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",length:"4:21"},
    {songName: "Jab koi baat bigar jae", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",length:"4:01"},
    {songName: "Tum hin aana ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",length:"5:51"},
    {songName: "Teri mitti me mil jawa gul ban ke khil jawa", filePath: "songs/6.mp3", coverPath: "covers/6.jpg",length:"5:00"},
    {songName: "Love you zindagi", filePath: "songs/7.mp3", coverPath: "covers/7.jpg",length:"6.05"},
    {songName: "Tum hin hon ashiquie 2", filePath: "songs/8.mp3", coverPath: "covers/8.jpg",length:"6:22"},
    {songName: "Bahati hawa tha vo ", filePath: "songs/9.mp3", coverPath: "covers/9.jpg",length:"5:42"},
    {songName: "Dil hai Chhota sa choti", filePath: "songs/10.mp3", coverPath: "covers/10.jpg",length:"5:36"},
]

songIcon.innerHTML = songs.map((song,i)=>
    `<div class="songItem"> 
    <img src = ${song.coverPath} alt="1"> 
    <span class="songName">${song.songName}</span>
    <span class="songlistplay"><span class="timestamp">${song.length} <i id=${i} class="far songItemPlay fa-play-circle"></i> </span></span>
    </div>`
).join("");
    
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
         //  audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            
        }
        else{
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            e.element.classList.remove('fa-pause-circle');
            e.element.classList.add('fa-play-circle');
            
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
   // audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
})