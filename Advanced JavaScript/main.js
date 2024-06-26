
/////////Scope////////

/*
let a = 10;
function outer(){
    let b = 20;
    function inner(){
        let c = 30;
        console.log("Scope: ",a,b,c);
    }
    inner();
}
outer();
*/



/////////Closure////////

// function outer(){
//     let counter=0;
//     function inner(){
//         counter++;
//         console.log(counter);
//     }
//     return inner;
// }
// const fn = outer();
// fn();
// fn();



//function currying
function sum(a,b,c){
    return a+b+c;
}


//console.log(sum(1,2,3));

function sumCurrying(fn){
    return  function(a){
        return function(b){
            return function(c){
                return fn(a,b,c);
        }
    }
}
}
const curry = sumCurrying(sum)
const first = curry(1)
const second = first(2)
const third = second(3)
//console.log(third)
//console.log(curry(1)(2)(3));


//Implicit binding
const person = {
    name: 'John',
    sayName: function(){
        console.log(this.name)
    }
}

//person.sayName()


//Explicit binding
function sayMyName(){
    console.log(this.name)
}

//sayMyName.call(person)

function Person3(name){
    this.name = name;
    console.log(this.name)
}

//const p1 = new Person3("name_e")
//console.log("The name is : ",p1.name)


//New binding
function Person4(name){
    this.name = name;
    console.log(this.name)
}

//const p4 = new Person4('John')


//Prototype
function Person5(fName,lName){
    this.firstName = fName;
    this.lastName = lName;
}

const p5 = new Person5('John','Doe')
const p6 = new Person5('Some','One')

Person5.prototype.getFullName = function(){
    return `${this.firstName}'s last name is ${this.lastName}`
}

//console.log(p5.getFullName())

//console.log(p6.getFullName())

Person5.prototype.sayName = function(){
    console.log(this.name)
}


//Prototypical Inheritance
function SuperHero(fName,lName){
    Person5.call(this,fName,lName)
    this.isSuperHero = true;
}

SuperHero.prototype.fightCrime = function(){
    console.log(`${this.firstName} is fighting crime`)
}

const batman = new SuperHero('batman','fatherless');
//console.log(batman.fightCrime())
SuperHero.prototype = Object.create(Person5.prototype);
const batman2 = new SuperHero('batman','fatherless');
SuperHero.prototype.constructor = SuperHero;
//console.log(batman2.getFullName());


//classes
class Nama{
    constructor(fName,lName){
        this.firstName = fName;
        this.lastName = lName;
    }
    sayName = function(){
        console.log(this.firstName + ' ' + this.lastName)
    }
}

class NamaBiraa extends Nama{
    constructor(fName,lName){
        super(fName,lName)
        this.isSuperHero = true;
    }
    fightCrime = function(){
        console.log(`${this.firstName} is fighting crime in class`)
    }
}

const sew = new Nama('Slave','Chimpanzee')
//console.log(sew.sayName())

const batman3 = new NamaBiraa('batman','fatherless')
//console.log(batman3.fightCrime())




//////////////////iterables and iterators/////////////////
const obj = {
    [Symbol.iterator]: function(){
        let step = 0
        const iterator = {
            next: function(){
                step++;
                if(step === 1){
                    return {
                        value: 'Hello',
                        done: false
                    }
                }
                else if(step === 2){
                    return {
                        value: 'World',
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
        return iterator
    }
};

// for (const word of obj)
//     console.log(word)


//generator functions   -  they simplify the iterable function creation
function* generatorFunction(){
    yield 'hey'
    yield 'homie'
}

const gen = generatorFunction()

// for (const word of gen)
//     console.log(word)



//Practice the asynchronicity of JS - Asynchronous callbacks
function jsIsSync(){
    console.log("Are you still waiting")
    setTimeout((name)=>{
        console.log('Waiting '+name)
    },6000,"Aman")
}

function holdUP(){
    console.log("You're a more patient person than me")
}

//jsIsSync();
//holdUP();

///synchronous callback function  -- bcs the function gets executed immediately
function greet(name){
    console.log(`Hello ${name}`)
}

function callFunc(callback){
    let name = "Aman"
    callback(name)
}

//callFunc(greet)


///////Promises///////
const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("Aman")
    },0)
})
const onFulfillment = (name)=>{
    console.log(name+ ": promise is fulfilled")
}

const onRejection =(name)=> {
    console.log(name+ ": promise rejected")
}

promise.then(onFulfillment)
        .catch(onRejection)


        
//////async await

async function asyncAFunc(){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("waiting for async")},1000)
    })
    let name = await promise;
    return name
}

//asyncAFunc().then((value)=>console.log(value));
async function asyncAFunc2(){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("waiting for async 2")},2000)
    })
    let name = await promise;
    return name
}

//asyncAFunc2().then((value)=>console.log(value));

function resolveHello(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("Hello")},8000)
    })
}

function resolveWorld(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("World")},6000)
    })
}


async function sequentialStart(){
    const hello = await resolveHello();
    console.log(hello) 
    const world = await resolveWorld();
    console.log(world)
}
//sequentialStart()
//time taken = 14 seconds
async function concurrentStart(){
    const hello = resolveHello();
    const world = resolveWorld();
    console.log(await hello) 
    console.log(await world)
}

//concurrentStart();
//time taken = 8 seconds   hello world displayed in order


async function parallelStart(){
    Promise.all([
        (async () => console.log(await resolveHello()))(),
        (async () => console.log(await resolveWorld()))()
    ])
}

//parallelStart()
//time taken 8 seconds but world displayed first








///////////////////Data structures////////////////

//////Stacks////////

const arr = [1,2,3,4,5]
function push(number){
    arr.push(number)
}

function pop(){
    return arr.pop()
}

arr.push(7);
//console.log(arr)
arr.pop();
//console.log(arr)


let palindrome = []
let word = "hannah";
let reverse = ""
for(let i = 0 ; i<word.length;i++){
    palindrome.push(word[i]);
}

for(let i = 0 ; i<word.length;i++){
    reverse+= palindrome.pop();
}  
if(word === reverse){
    console.log(word + ` is a palindrome`)
}
else{
    console.log(reverse)
}


const knapsack = [{
    name:"one",
    weight:1,
    value:10
},
{
    name:"two",
    weight:2,
    value:6
},{
    name:"three",
    weight:3,
    value:12
},{
    name:"four",
    weight:4,
    value:16
}]

const weightLimit = 24
let temp_weight = 0;

// knapsack.forEach((sack)=>{
    
// })
// function knapsackProblem(knapsack,weightLimit){

// }

//Arrays

function moveZerosToEnd(arr) {
    const nonZeroValues = arr.filter(value => value !== 0);
    const zeroCount = arr.length - nonZeroValues.length;
    const zeros = Array(zeroCount).fill(0);
    return nonZeroValues.concat(zeros);
}

  const array = [0, 1, 0, 3, 12];
  const result = moveZerosToEnd(array);
  //console.log(result); // Output: [1, 3, 12, 0, 0]
  
const summing=(arr,summed =0)=>{       
    arr.forEach(num=>summed+=num);     
    return summed;                     
}
//O(n)
const spliced = array.splice(2,3)
// console.log("Array spliced",spliced)
// console.log("Array: ",array)
// console.log(summing([1, 3, 12, 0, 15]))



//Sets
const sets = new Set();
sets.add(4)
sets.add("foo")
sets.add("foo")

// for(set of sets){
//     console.log("set ",set)
// }



//Maps
const map = new Map();
map.set("name","Aman")
map.set("age",21)
map.set("name","Aman2")
map.set([1,2],"array")
map.set([1,2],"second array")   // Adds another second array 
map.set("name","Another name")  // changes name doesn't set new name
// for(let [key,value] of map){
//     console.log(key,value)
// }





//Linked Lists
class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    append(tail){
        const newNode = {Value:tail, next:null}
        if(this.tail)
            this.tail.next = newNode;
        this.tail = newNode;

        if(!this.head)
            this.head = newNode;
    }

    toArray(){
        const elements = [];
        while(this.head){
            elements.push(this.head.Value)
            this.head = this.head.next;
        }
        return elements;
    }

    prePend(head){
        let newNode = {Value:head, next:this.head}
        this.head = newNode;
        if(!this.tail)
            this.tail = newNode;
    }

    find(value){
        if(!this.head)
            return;
        let curNode = this.head;
        while(curNode){
            if(curNode.Value === value)
                return curNode;
            curNode = curNode.next;
        }
    }

    insertAfter(existingValue,newValue){
        let curValue = this.find(existingValue)
        if(!this.head)
            return;
        
        if(curValue)
        {
            const newNode = {Value:newValue,next:curValue.next }
            curValue.next = newNode;
        }
        
    }


    delete(value){
        if(!this.head)
            return;
        
        while(this.head && this.head.Value===value){
            this.head = this.head.next
        }

        let curNode = this.head;

        while(curNode.next){
            if(curNode.next.Value === value)
                {
                    curNode.next = curNode.next.next;                }
                else 
                    curNode = curNode.next;
        }

        if(this.tail.value === value){
            this.tail = curNode;
        }
    }
}

const checkLinkedList = new LinkedList();
checkLinkedList.append(1);
checkLinkedList.append(2);
checkLinkedList.append("hello");
checkLinkedList.prePend(0);
checkLinkedList.prePend(true)
checkLinkedList.prePend(true)
checkLinkedList.insertAfter(1,3)
//console.log("custom linked list : ",checkLinkedList.toArray())
checkLinkedList.delete(true)
// console.log("find true : ",checkLinkedList.find(true))
// console.log("find  0",checkLinkedList.find(0))
// console.log("custom linked list : ",checkLinkedList.toArray())


//Binary search
function binarySearch(arr,target){
    let leftIndex = 0;
    let rightIndex = arr.length-1;
    while(leftIndex <= rightIndex){
        let middleIndex = Math.floor((leftIndex + rightIndex)/2);
        if(target === arr[middleIndex])
            return middleIndex;
        else if(target < arr[middleIndex]){
            rightIndex = middleIndex - 1;
        }
        else if(target > arr[middleIndex]){
            leftIndex = middleIndex + 1;
        }
    }
    return -1;
}

console.log("Normal: ",binarySearch([-5,2,4,6,10],6))



//Binary Recursive
function binarySearchRecursive(arr,target,leftIndex=0,rightIndex=arr.length-1){
    let middleIndex = Math.floor((leftIndex + rightIndex)/2);
    if(leftIndex>rightIndex) return -1;
    else if(target === arr[middleIndex]) return middleIndex;
    else if(target > arr[middleIndex]) {
        return binarySearchRecursive(arr,target,middleIndex+1,rightIndex)
    }
    else if (target< arr[middleIndex]){
        return binarySearchRecursive(arr,target,leftIndex,middleIndex-1)
    }
    return -1;
    
}

console.log("recursive:",binarySearchRecursive([-5,2,4,6,10],6))



//Graph
const graph = {
    a:['b','c'],
    b:['d'],
    c:['e'],
    d:['f'],
    e:[],
    f:[]
}

// DFS
depthFirstPrint(graph,'a')  //acebdf

//left first
function depthFirstPrint(graph,start){
    const stack = [start]
    while (stack.length){
        const current = stack.pop()
        console.log(current);
        for (let neighbor of graph[current]){
            stack.push(neighbor)
        }
    }

}
depthFirstRightFirstPrint(graph,'a')
//right first
function depthFirstRightFirstPrint(graph,start){
    console.log("right first")
    const stack = [start]
    while (stack.length){
        const current = stack.pop()
        if(current)
            console.log(current);
        
        if(graph[current])
            for (let i=graph[current].length;i>=0;i--){
                stack.push(graph[current][i])
            }
    }

}

console.log('recursive')
depthFirstRecursive(graph,'a')

function depthFirstRecursive(graph,value){
    console.log(value)
    for (let element of graph[value])
        depthFirstRecursive(graph,element)
    
}



//breadth first
function breadthFirst(graph,value){
    console.log("breadth first")
    const queue = [value]
    while (queue.length){
        const current = queue.shift();
        console.log(current)
        for (let neighbor of graph[current]){
            queue.push(neighbor)
        }
    }
}

breadthFirst(graph,'a')




