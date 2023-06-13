const btn=document.querySelector(".btn")
const opening=document.querySelector(".opening")
const game=document.querySelector(".game");
const html = document.querySelector("html")
const curtain=document.querySelector('.curtain');
export let audioClick = null;
export let audioSucess = null;
export let audioFail = null;
let audioStart=null;
var lastTouchEnd = 0;

// btn.addEventListener('click',handleClick)
btn.onclick=()=>{
    audioClick= new Audio("../sound/sound1.mp3")
    audioSucess= new Audio("../sound/success.mp3")
    audioFail= new Audio("../sound/fail.mp3")
    audioStart=new Audio("../sound/game-start.mp3")
    audioStart.play();
    audioStart.currentTime=0;
    setTimeout(()=>{
        curtain.style.opacity="1";
        curtain.style.visibility="visible";

    },500)

    changePage().then(()=>{
        curtain.style.opacity=0;
        curtain.style.visibility="hidden"
    })
}

document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

function changePage(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            opening.style.display="none"
            game.style.display="block"
            html.style.overflow="auto"
            curtain.style.visibility="hidden"
            resolve()
        },1500)
    })
}



// function handleClick(){
//     curtain.style.opacity="1";
//     curtain.style.visibility="visible";
   
//     // audioClick= new Audio("../sound/sound1.mp3")
//     // audioSucess= new Audio("../sound/success.mp3")
//     // audioFail= new Audio("../sound/fail.mp3")

//     changePage().then(()=>{
//         curtain.style.opacity=0;
//         curtain.style.visibility="hidden"
//     })
// }