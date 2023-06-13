import {URLS} from './data.js'
import {audioClick,audioSucess,audioFail} from './index.js'
const html = document.querySelector("html")
const opening=document.querySelector(".opening")
const game=document.querySelector(".game")
const table=document.querySelector(".table");
let cards=null;
const modal=document.querySelector(".modal")
const completed=document.querySelector(".completed");
const attempt_count = document.querySelector(".attempt-count");
const failure_count =document.querySelector(".failure-count");

var sum=0
for(var i=1; i<=14;i++){
  sum +=i;
}
console.log(sum)
let firstFlippedCard={}
let totalNum=0;
let isFlipping=false;
let numOfAttempts=0;
let numOfFailure=0;

document.addEventListener("DOMContentLoaded",setCards(URLS));

function setCards(arr){
  shuffle(arr);
  arr.forEach((c,index)=>{
      const card = document.createElement("div")
      card.classList.add("card");
  
      const front=document.createElement("img");
      front.classList.add("front");
      front.setAttribute("src",URLS[index].front)
      front.setAttribute("alt","")
  
      const back=document.createElement("img");
      back.classList.add("back")
      back.setAttribute("src",URLS[index].back)
      back.setAttribute("alt","");
  
      back.addEventListener('click',()=>{
       
         if(!isFlipping) {
          // audio need to be instatiated when user action occers in order to make it work in IOS 
          // however, if it is done, take a time to process them, which causes freezing page when clicked multiple times
          // so commented out
          // audioClick= new Audio("../sound/sound1.mp3")
          // audioSucess= new Audio("../sound/success.mp3")
          // audioFail= new Audio("../sound/fail.mp3")
          audioClick.play()
          audioClick.currentTime=0;
          // filpCard(index,c.value)
          if(Object.keys(firstFlippedCard).length===0){
            firstFlip(index,c.value)
          }
          else{
            secondFilp(index,c.value)
          }
         }
      })
      
      card.append(front,back);
      table.appendChild(card);
      cards=table.children;
    })
}
  
  function firstFlip(index,value){
    isFlipping=true;
    setTimeout(()=>{
      isFlipping=false;
    },500)
    
    cards[index].style.transform="rotateY(0deg)";
    firstFlippedCard.index=index;
    firstFlippedCard.value=value;
  }

  function secondFilp(index,value){
    isFlipping=true;
    numOfAttempts++;
    cards[index].style.transform="rotateY(0deg)";
   
    checkResult(index,value).then(()=>{
      if(totalNum === 105){
       calculateResult();
      }
    })
  }

  function checkResult(index,value){
    return new Promise(resolve=>{
      if(value !== firstFlippedCard.value){
        setTimeout(()=>{
          cards[index].style.transform="rotateY(180deg)";
          cards[firstFlippedCard.index].style.transform="rotateY(180deg)";
          audioFail.play();
          audioFail.currentTime=0;
          firstFlippedCard={}
          isFlipping=false;
        },1100)
        numOfFailure++;
      }
      else{
        totalNum +=value;
        firstFlippedCard={};
        setTimeout(()=>{
          audioSucess.play()
          audioSucess.currentTime=0;
          isFlipping=false;
        },600)  
      }
      
      resolve();
    })
  }
  
  function calculateResult(){
         createAndAppendSpans(attempt_count,"Attempts",numOfAttempts);
         createAndAppendSpans(failure_count,"Failure",numOfFailure);
         table.style.pointerEvents="none";
         setTimeout(()=>{
          completed.classList.add("animation")
          completed.style.height="300px"
         },800)
  }



function createAndAppendSpans(parent,text,number){
  const textNode = document.createElement("span");
  const numberNode = document.createElement("span");
  textNode.innerText=text
  numberNode.innerText=number
  parent.append(textNode,numberNode)
}

function removeSpans(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild)
  }
}


function resetGame(){
  while(table.firstChild){
    table.removeChild(table.firstChild)
  }
  cards=null;
  setCards(URLS);

  completed.classList.remove("animation")
  completed.style.height="100px"
  totalNum=0; numOfAttempts=0; numOfFailure=0;
  firstFlippedCard={};
  removeSpans(attempt_count);
  removeSpans(failure_count);
  document.querySelector(".top").style.pointerEvents="all";
  table.style.pointerEvents="all";
}

function shuffle(arr){
  // arr.sort(() => Math.random() - 0.5);
   let currentIndex=arr.length;
   let randomIndex;

   while(currentIndex !==0){
    randomIndex=Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex],arr[randomIndex]]=[arr[randomIndex], arr[currentIndex]]
   }
}

document.querySelector(".continue").addEventListener('click',resetGame)

document.querySelector(".end").onclick=()=>{
  game.style.display="none"
  opening.style.display="flex"
  html.style.overflow="hidden"
  resetGame();
}

document.querySelector(".reset-btn").onclick=()=>{
  resetGame();
}

document.querySelector(".quit-btn").onclick=()=>{
    document.querySelector(".top").style.pointerEvents="none";
    calculateResult()
}