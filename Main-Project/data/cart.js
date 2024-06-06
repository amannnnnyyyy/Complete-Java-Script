export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    quantity: 1
},{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productName: "Intermediate Size Basketball",
    quantity: 3
}]

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