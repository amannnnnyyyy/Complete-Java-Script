const messageDiv = document.querySelector('.message'); 
const btn = document.querySelector('.btn');
const cart = document.querySelector('.numberCart');
const equals = document.querySelector('.value');
let clicked =0;
function buy(){
    alert("bought");
}
function addToCart(){
    alert("added to cart");
    clicked++;
    cart.innerHTML = clicked;
}
function buying(){
    messageDiv.innerHTML = "you are trying to buy";
}

function adding(){
    messageDiv.innerHTML = "you are adding to cart";
    messageDiv.animate({scrollTop:20});
}


function resetCart(){
    console.log("resetting cart");
    clicked = 0;
    cart.innerHTML = clicked;
}
let filled = false;
let firstNo = '0';
let secondNo = '0';
let toAdd = false;
let toSub = false;
let calculation = '';

function display(){
    equals.innerHTML = calculation;
}
function one(){
    if(!filled)
    firstNo += 1;
else{secondNo += 1;}

console.log("firstNo: " + firstNo);
console.log("secondNo: " + secondNo);
calculation += '1'; 
}
function two(){
calculation += '2'; 
}
function three(){
 calculation += '3'; 
}
function four(){
 calculation += '4'; 
}
function five(){
calculation += '5';
}
function six(){
calculation += '6';
}
function seven(){
calculation += '7';
}
function eight(){
calculation += '8';
}
function nine(){
calculation += '9';
}
function zero(){
    if(!filled)
        firstNo += 0;
    else{secondNo +=0;}

    console.log("firstNo: " + firstNo);
    console.log("secondNo: " + secondNo);
    calculation += '0';
}

function add(){
    calculation += ' + ';
}
function substruct(){
    toSub = true;
    filled = true;
    console.log("firstNo: " + firstNo);
    console.log("secondNo: " + secondNo);
    calculation +=' - ';
}

function equal(){
    y = eval(calculation)
    equals.innerHTML = y;   
}