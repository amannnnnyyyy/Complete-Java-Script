const subBtn = document.querySelector('.subscribe');
const input  = document.querySelector('.input');
const setResult = document.querySelector('.setResult');
const under40Tax = 10;
const _40AndAboveTax = 'free';
const subscribe = ()=>{
    if(subBtn.textContent === 'subscribe'){
        subBtn.textContent = 'subscribed';
        subBtn.title = 'you are already subscribed. Click to unsubscribe'
    }else{subBtn.textContent = 'subscribe';
    subBtn.title = 'subscribe'
    }
}
function display(){
    if(input.value<40)
        setResult.textContent=`Cost with shipping = ${(Number(input.value)+under40Tax)}`
        else if(input.value>=40)
            setResult.textContent = `Cost with shipping = ${input.value}`
}

const calculate = ()=>{
    display();
}

const calculateKey = (event)=>{
    if(event.key=='Enter'){
        display();
    }
}