let rock = false;
let paper = false;
let scissor = false;
let rock2 = false;
let paper2 = false;
let scissors2 = false;
let wins = 0;
let loses = 0;
let draws = 0;
let value = 4>3 && document.querySelector('.value');
let lose = document.querySelector('.lose');
let win = document.querySelector('.win');
let draw = document.querySelector('.draw');
let you = document.getElementsByClassName('.you');
let computer = document.getElementsByClassName('.computer');

function greet(name='there'){
    alert(`Hello ${name}`);
}

function getRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = 
    randomDecimal * 3;
    return Math.floor(randomNumber) + 1; 
}

function newGame(){
    rock2 = paper2 = scissors2 = false;
    const randomNum = getRandomNumber();
    if(randomNum == 1){
        rock2 = true;
    }
    else if(randomNum == 2){
        paper2 = true;
    }
    else if(randomNum == 3){
        scissors2 = true;
    }
    console.log("rock: ",rock2);
    console.log("paper: ",paper2);
    console.log("scissor: ",scissors2);
}

function resetGame(){
    loses = 0;
    wins = 0;
    draws =0;
    lose.innerHTML=loses;
    win.innerHTML = wins;
    draw.innerHTML = draws;
}

newGame();

function calc_game(){
    if(rock && paper2){
        value.innerHTML = "You Lose: paper wins";
        loses++;
        lose.innerHTML=loses;
        computer.src = "./assets/paper.jpg";
        you.src = "./assets/rock.jpg";
    }
    else if(rock && scissors2){
        value.innerHTML = "You Win";
        wins++;
        win.innerHTML=wins;
    }
    else if(rock && rock2){
        value.innerHTML = "tie";
        draws++;
        draw.innerHTML=draws;
    }
    else if(paper && scissors2){
        value.innerHTML = "You Lose: scissors wins";
        loses++;
        lose.innerHTML=loses;
    }
    else if(paper && rock2){
        value.innerHTML = "You Win";
        wins++;
        win.innerHTML=wins;
    }
    else if(paper && paper2){
        value.innerHTML = "tie";
        draws++;
        draw.innerHTML=draws;
    }
    else if(scissor && scissors2){
        value.innerHTML = "tie";
        draws++;
        draw.innerHTML=draws;
    }
    else if(scissor && rock2){
        value.innerHTML = "You Lose: rock wins";
        loses++;
        lose.innerHTML=loses;
    }
    else if(scissor && paper2){
        value.innerHTML = "You Win";
        wins++;
        win.innerHTML=wins;
    }
    else{
        value.innerHTML = "invalid input";
    }
    newGame();
}

function play(name){
    rock = name === "rock";
    paper = name === "paper";
    scissor = name === "scissor";
    calc_game();
}
