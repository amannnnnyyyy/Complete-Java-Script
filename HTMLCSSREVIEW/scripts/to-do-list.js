const value1 = document.querySelector('.value1');
const value2 = document.querySelector('.value2');
const display = document.querySelector('.display');
const values = document.querySelector('.value');
const displayToDo = document.querySelector('.displayToDo');
const dateInput = document.querySelector('.date');
const todo1 = [];
const todo2 = [];
const todo = [{
  todoList:'',
  date:''
}];
let date1;

function add_demo(num) {
  if (num === 1) {
    todo1.push(value1.value);
    value1.value = '';
    console.log('todo1: ', todo1);
  } else if (num === 2) {
    todo2.push(value2.value);
    let totalHTML = '';
    for (let n of todo2) {
      totalHTML += `<p>${n}</p>`;
    }
    display.innerHTML = totalHTML;
    value2.value = '';
    console.log(todo2);
  }
}

let totalToDoHTML = '';

function add_toDoList() {
  date1 = dateInput.value;
  todo.push({todoList:values.value,date:date1});
  renderToDoList();
}

function deleteToDoItem(index) {
  todo.splice(index, 1);
  renderToDoList(); // Re-render the todo list after deletion
}

function renderToDoList() {
  totalToDoHTML = ''; 
    let html;
      todo.forEach(({todoList,date},index)=>{
    if(todoList.length > 0 && todoList!==null && todoList !==''){
       html = `
    <div> ${todoList}</div> 
    <div>${date}</div>
    <button class="delete" onclick="deleteToDoItem(${index})">
            Delete
    </button>
    `;}
    totalToDoHTML += html?html:'';
    values.value = '';
    dateInput.value = '';
    })

displayToDo.innerHTML = totalToDoHTML;
}

// Find max and min of array
let nums = [1];

function minMax(nums) {
  let min = nums[0];
  let max = nums[0]; // Initialize max to the first element
  for (let n of nums) {
    if (n > max) {
      max = n;
    } else if (n < min) {
      min = n;
    }
  }
  if (nums.length === 0) {
    min = null;
    max = null;
  }
  console.log('min: ', min, 'max: ', max);
}

minMax(nums);



const astr = ["hello","world","search","search","good"];

function findIndex(astr,word){
for(let i=0;i<astr.length;i++) {
  if(astr[i]===word){
    console.log(i);
    break;
  }else if(i===(astr.length-1)){
    console.log(-1);
  }
}}
// findIndex(astr,"search");

function removeEgg(food){
  let newFood = [];
  for (let i = 0; i<food.length; i++) {
    if(food[i]==="Egg"){
      continue;
    }
    newFood.push(food[i]);
  }
  return newFood;
}

// console.log(removeEgg(["Hamburger","Egg","Salad","Egg"]));

function firstTwoEggs(food){
  let newFood = [];
  let count = 0;
  for (let i = 0; i<food.length; i++) {
    if(food[i]==="Egg" && count<2){
      count++;
      continue;
    }
    newFood.push(food[i]);
  }
  return newFood;
}

//console.log(firstTwoEggs(["Shellfish","Egg","Egg","Normal","Egg","Egg"]));

function lastTwoEggs(food){
  let newFood = [];
  let count = 0;
  let reverseFood=food.slice().reverse();
  console.log("reverse food: " + reverseFood);
  for (let i = 0; i<reverseFood.length; i++) {
    if(reverseFood[i]==="Egg" && count<2){
      count++;
      continue;
    }
    newFood.push(reverseFood[i]);
  }
  console.log("original food: " + food);
  return newFood.reverse();
}

//console.log(lastTwoEggs(["Shellfish","Egg","Egg","Normal","Egg","Egg","Egg"]));

function fizzBuzz(nums){
  newArr = [];
  for (let i=0; i<nums.length;i++){
    if((nums[i]%3===0)&&(nums[i]%5===0)){
      newArr.push("FizzBuzz");
    }
    else if(nums[i]%3===0){
      newArr.push("Fizz");
    }
    else if (nums[i]%5===0){
      newArr.push("Buzz");
    }
    else{
      newArr.push(nums[i]);
    }
  }
  return newArr;
}

//console.log(fizzBuzz([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));

//for Each
[2,3,4,5,6,7].forEach((value)=>{
  console.log(value**2)
})