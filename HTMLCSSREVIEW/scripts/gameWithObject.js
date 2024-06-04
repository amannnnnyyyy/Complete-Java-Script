let win = document.querySelector(".win")
let draw = document.querySelector(".draw")
let lose = document.querySelector(".lose")
let computer = document.querySelector(".yourMove")
let you = document.querySelector(".computerMove")
let value = document.querySelector(".value")
let autoplayB = document.querySelector(".autoplay")
let player1 = document.querySelector(".player1")
let player2 = document.querySelector(".player2")
let rockImg = document.querySelector(".rockImg")
let paperImg = document.querySelector(".paperImg")
let scissorsImg = document.querySelector(".scissorsImg")
let modal = document.querySelector(".modal")
let help = document.querySelector(".help")

rockImg?rockImg.addEventListener('click',()=>{play("rock")}):null
paperImg?paperImg.addEventListener('click',()=>play("paper")):null
scissorsImg?scissorsImg.addEventListener('click',()=>play("scissor")):null
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
        play("rock")
    else if(event.key==='p')
        play("paper")
    else if(event.key==='s')
        play("scissor")
    else if(event.key==='a')
        autoplay();
    else if(event.key==='Escape')
        resetGame();
    else if(event.key==='q')
        stop_autoplay();
});
help?help.addEventListener('click',()=>{
    display_help();
}):null;


const game= {
    name:"ROCK PAPER SCISSORS",
    content:{
        rock:{
            name:"Rock",
            image:"../assets/rock.jpg"
        },
        paper:{
            name:"Paper",
            image:"../assets/paper.jpg"
        },
        scissor:{
            name:"Scissor",
            image:"../assets/scissors.jpg"
        }
    },
    score:JSON.parse(localStorage.getItem("score")) ||{
        wins:0,
        draws:0,
        loses:0
    },
    player:{
        rock:false,
        paper:false,
        scissor:false
    },
    computer:{
        rock:false,
        paper:false,
        scissor:false
    }
}

win.innerHTML=game.score.wins;
lose.innerHTML=game.score.loses;
draw.innerHTML=game.score.draws;
document.querySelector(".rock").src=game.content.rock.image
document.querySelector('.paper').src = game.content.paper.image
document.querySelector('.scissor').src = game.content.scissor.image

function resetGame(){
    game.score.wins = 0;
    game.score.draws = 0;
    game.score.loses = 0;
    localStorage.removeItem("score");
    lose.innerHTML = 0;
    win.innerHTML = 0;
    draw.innerHTML = 0;
}

function getRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = 
    randomDecimal * 3;
    return Math.floor(randomNumber) + 1; 
}

function newGame(){
    game.computer.rock = game.computer.paper = game.computer.scissor = false;
    const randomNum = getRandomNumber();
    if(randomNum == 1){
        game.computer.rock = true;
    }
    else if(randomNum == 2){
        game.computer.paper = true;
    }
    else if(randomNum == 3){
        game.computer.scissor = true;
    }
}

newGame();

setDetail=(you,computer,status,player,player2)=>{
    if(status=="win"){
        if(player2==="Computer"){
            value.innerHTML = 'You Win';
        }else
        value.innerHTML =`${player2} Lost ${player} wins with ${you}`;
        game.score.wins++;
        win.innerHTML=game.score.wins;
    }else if(status == "lose"){
        value.innerHTML = `${player} Lost ${player2} wins with ${computer}`;
        game.score.loses++;
        lose.innerHTML=game.score.loses;
    }else{
        value.innerHTML = "tie";
        game.score.draws++;
        draw.innerHTML=game.score.draws;
    }
}
function calc_game(play1="you",play2="computer"){
    let player = play1==="you"?"You":"Computer 1"
    let player2 = play2==="computer"?"Computer":"Computer 2"
    if(game.player.rock && game.computer.paper){
        setDetail("rock","paper","lose",player,player2)
        you.src = game.content.paper.image;
        computer.src = game.content.rock.image;
    }
    else if(game.player.rock && game.computer.scissor){
        console.log("sending ",player," ",player2)
        setDetail("rock","scissor","win",player,player2)
        you.src = game.content.scissor.image;
        computer.src = game.content.rock.image;
    }
    else if(game.player.rock && game.computer.rock){
        setDetail("rock","rock","tie",player,player2)
        you.src = game.content.rock.image;
        computer.src =game.content.rock.image;
    }
    else if(game.player.paper && game.computer.scissor){
        setDetail("paper","scissor","lose",player,player2)
        you.src = game.content.scissor.image;
        computer.src = game.content.paper.image;
    }
    else if(game.player.paper && game.computer.rock){
        setDetail("paper","rock","win",player,player2)
        you.src = game.content.rock.image;
        computer.src = game.content.paper.image;
    }
    else if(game.player.paper && game.computer.paper){
        setDetail("paper","paper","tie",player,player2)
        you.src = game.content.paper.image;
        computer.src = game.content.paper.image;
    }
    else if(game.player.scissor && game.computer.scissor){
        setDetail("scissor","scissor","tie",player,player2)
        you.src = game.content.scissor.image;
        computer.src = game.content.scissor.image;
    }
    else if(game.player.scissor && game.computer.rock){
        setDetail("scissor","rock","lose",player,player2)
        you.src = game.content.rock.image;
        computer.src = game.content.scissor.image;
    }
    else if(game.player.scissor && game.computer.paper){
        setDetail("scissor","paper","win",player,player2)
        computer.src = game.content.scissor.image;
        you.src = game.content.paper.image;
    }
    else{
        value.innerHTML = "invalid input";
    }
    localStorage.setItem('score',JSON.stringify(game.score))
    newGame();
}

function play(name,type){
    game.player.rock = name === "rock";
    game.player.paper = name === "paper";
    game.player.scissor = name === "scissor";
    type==="auto"?calc_game("comp","comp"):calc_game();
}

function for_autoplay(){
    newGame();
    const randomNum = getRandomNumber();
    if(randomNum == 1){
        play('rock',"auto");
    }
    else if(randomNum == 2){
        play('paper',"auto");
    }
    else if(randomNum == 3){
        play('scissor',"auto");
    }
}

let autoplayId;

function autoplay(){
    autoplayB.textContent = "Stop autoplay";
    player1.textContent="computer 1"
    player2.textContent="computer 2"
    autoplayB.onclick = stop_autoplay;
    autoplayId=setInterval(for_autoplay,2000);
}

function stop_autoplay(){
    autoplayB.textContent = "Autoplay";
    player1.textContent="You"
    player2.textContent="Computer"
    autoplayB.onclick = autoplay;
    clearInterval(autoplayId);
}

function display_help(){

    modal.classList.contains('hideItem')?modal.classList.remove('hideItem'):modal.classList.add('hideItem');

}