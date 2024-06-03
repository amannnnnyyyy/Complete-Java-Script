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
  totalToDoHTML = ''; // Clear existing HTML
    let html;
    for (let i = 0; i < todo.length; i++) {
      const {todoList} = todo[i];
      const {date} = todo[i];
    if(todoList.length > 0 && todoList!==null && todoList !==''){
       html = `
    <p> ${todoList} ${date}</p>
        <button onclick="deleteToDoItem(${i})">
            Delete
        </button>
    </p>
    `;}
    totalToDoHTML += html?html:'';
    values.value = '';
    dateInput.value = '';
}

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
