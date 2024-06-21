
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


console.log(sum(1,2,3));

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
console.log(third)
//console.log(curry(1)(2)(3));


//Implicit binding
const person = {
    name: 'John',
    sayName: function(){
        console.log(this.name)
    }
}

person.sayName()


//Explicit binding
function sayMyName(){
    console.log(this.name)
}

sayMyName.call(person)

function Person3(name){
    this.name = name;
    console.log(this.name)
}

const p1 = new Person3("name_e")
console.log("The name is : ",p1.name)


//New binding
function Person4(name){
    this.name = name;
    console.log(this.name)
}

const p4 = new Person4('John')


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

console.log(p5.getFullName())

console.log(p6.getFullName())

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
console.log(batman.fightCrime())
SuperHero.prototype = Object.create(Person5.prototype);
const batman2 = new SuperHero('batman','fatherless');
SuperHero.prototype.constructor = SuperHero;
console.log(batman2.getFullName());



class Nama{
    firstName;
    lastName;
    constructor(fName,lName){
        this.firstName = fName;
        this.lastName = lName;
    }
    sayName = function(){
        console.log(this.firstName + ' ' + this.lastName)
    }
}

class NamaBiraa extends Nama{
    isSuperHero = true;
    constructor(fName,lName){
        super(fName,lName)
    }
    fightCrime = function(){
        console.log(`${this.firstName} is fighting crime`)
    }
}

const sew = new Nama('Slave','Chimpanzee')
console.log(sew.sayName())

const batman3 = new NamaBiraa('batman','fatherless')
console.log(batman3.fightCrime())