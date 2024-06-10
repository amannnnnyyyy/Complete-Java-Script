

export let cart = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):
[]

export const pushToCart=(productId,productName,newCart,quantity)=>{
    if(!newCart.find(o=>o.productId===productId))
        cart.push({
            productId,
            productName,
            quantity:quantity
        })
    else {
        cart.map((value)=>{
            if(value.productId===productId)
                value.quantity+=quantity;
        })
    }
    saveToStorage()
}
export const saveToStorage = () =>{
    localStorage.setItem('cart',JSON.stringify(cart))
}

export const removeFromCart = (productId) => {
    cart = cart.filter((value)=>{
        if(value.productId===productId){
            return false;
        }else return true
    })
    saveToStorage();
    location.reload();
}

export let count;
export function addToCart(){
    const cart_quantity = document.querySelector('.cart-quantity')
    count = 0
    cart.map((value)=>{
        count+=value.quantity
    })
    console.log(cart_quantity)
    cart_quantity.textContent = count;
}

