export const cart = []

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
}