

export let cart = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):
[{
    productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    productName:'Product 1',
    quantity:1,
    deliveryOptionId:'2'
},
{
    productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    productName:'Product 1',
    quantity:1,
    deliveryOptionId:'1'
}]

export const pushToCart=(productId,productName,newCart,quantity)=>{
    if(!newCart.find(o=>o.productId===productId))
        cart.push({
            productId,
            productName,
            quantity:quantity,
            deliveryOptionId:'1'
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
    let quantityCount=0;
    cart = cart.filter((value)=>{
        if(value.productId===productId){
            quantityCount = value.quantity;
            return false;
        }else return true
    })
    saveToStorage();
 return quantityCount;
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

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach(cartItem => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

