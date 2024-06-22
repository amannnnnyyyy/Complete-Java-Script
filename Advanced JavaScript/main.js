
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