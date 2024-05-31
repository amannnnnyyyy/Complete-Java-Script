let win = document.querySelector(".win")
let draw = document.querySelector(".draw")
let lose = document.querySelector(".lose")
let computer = document.querySelector(".yourMove")
let you = document.querySelector(".computerMove")
let value = document.querySelector(".value")

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

setDetail=(you,computer,status)=>{
    if(status=="win"){
        value.innerHTML = `You Win`;
        game.score.wins++;
        win.innerHTML=game.score.wins;
    }else if(status == "lose"){
        value.innerHTML = `You Lose ${computer} wins`;
        game.score.loses++;
        lose.innerHTML=game.score.loses;
    }else{
        value.innerHTML = "tie";
        game.score.draws++;
        draw.innerHTML=game.score.draws;
    }
}
function calc_game(){
    if(game.player.rock && game.computer.paper){
        setDetail("rock","paper","lose")
        computer.src = game.content.paper.image;
        you.src = game.content.rock.image;
    }
    else if(game.player.rock && game.computer.scissor){
        setDetail("rock","scissor","win")
        computer.src = game.content.scissor.image;
        you.src = game.content.rock.image;
    }
    else if(game.player.rock && game.computer.rock){
        setDetail("rock","rock","tie")
        computer.src = game.content.rock.image;
        you.src =game.content.rock.image;
    }
    else if(game.player.paper && game.computer.scissor){
        setDetail("paper","scissor","lose")
        computer.src = game.content.scissor.image;
        you.src = game.content.paper.image;
    }
    else if(game.player.paper && game.computer.rock){
        setDetail("paper","rock","win")
        computer.src = game.content.rock.image;
        you.src = game.content.paper.image;
    }
    else if(game.player.paper && game.computer.paper){
        setDetail("paper","paper","tie")
        computer.src = game.content.paper.image;
        you.src = game.content.paper.image;
    }
    else if(game.player.scissor && game.computer.scissor){
        setDetail("scissor","scissor","tie")
        computer.src = game.content.scissor.image;
        you.src = game.content.scissor.image;
    }
    else if(game.player.scissor && game.computer.rock){
        setDetail("scissor","rock","lose")
        computer.src = game.content.rock.image;
        you.src = game.content.scissor.image;
    }
    else if(game.player.scissor && game.computer.paper){
        setDetail("scissor","paper","win")
        computer.src = game.content.scissor.image;
        you.src = game.content.paper.image;
    }
    else{
        value.innerHTML = "invalid input";
    }
    localStorage.setItem('score',JSON.stringify(game.score))
    newGame();
}

function play(name){
    game.player.rock = name === "rock";
    game.player.paper = name === "paper";
    game.player.scissor = name === "scissor";
    calc_game();
}
