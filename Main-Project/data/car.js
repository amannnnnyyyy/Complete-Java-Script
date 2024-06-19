
//exercises
class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen = false;

constructor(detail){
    this.#brand = detail.brand;
    this.#model = detail.model;
    this.speed = detail.speed? detail.speed:0;
}

displayInfo(){
    console.log(`${this.#brand} ${this.#model},  speed: ${this.speed} Km/hr, Trunk: ${this.isTrunkOpen?'Open':'Close'}`);
}

go(){
    this.speed += 5;
}

break(){
    this.speed -= 5;
    if(this.speed < 0) this.speed = 0;
    if(this.speed > 200) this.speed = 200;
}

openTrunk(){
    this.isTrunkOpen = true;
}

closeTrunk(){
    this.isTrunkOpen = false;
}
}

const carGenerate = [
{
    brand:"Tesla",
    model:"Model 3"
},
{
    brand:"Toyota",
    model:"Corolla"
},
]

const car = carGenerate.map((car)=>{
    return new Car(car)
})


car.forEach((car)=>{
    console.log("here")
    car.break()
    car.break()
    car.go()
    car.go()
    car.displayInfo()
    car.openTrunk()
    car.displayInfo()
})



class RaceCar extends Car {
    acceleration;
    constructor(detail){
        super(detail)
        this.acceleration = detail.acceleration;
    }
    go(){
        this.speed += this.acceleration; 
    }
    openTrunk(){
        return ''
    }
    closeTrunk(){
        return ''
    }
}


const RaceCarGenerate = {
    brand:"McLaren",
    model:"F1",
    acceleration:10
}

const raceCar = new RaceCar(RaceCarGenerate)

raceCar.displayInfo()
raceCar.go()
raceCar.displayInfo()
raceCar.break()
raceCar.break()
raceCar.displayInfo()
raceCar.break()
raceCar.displayInfo()