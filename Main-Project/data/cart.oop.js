// //OOP

//simplify using function
function CartFunctionWithOOP(storage){
const cart = {
        cartItems : undefined,
        count:undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(storage));
            if(!this.cartItems){
            this.cartItems=[{
                productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
                quantity:3,
                deliveryOptionId:'2'
            },
            {
                    productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
                quantity:1,
                deliveryOptionId:'1'
            }]}
            },
    
        saveToStorage(){
            localStorage.setItem(storage,JSON.stringify(this.cartItems))
        },
    
        pushToCart(productId='',quantity=0){
        this.loadFromStorage()
        console.log("pushing to cart")
            if(this.cartItems&& !this.cartItems.find(o=>o.productId===productId))
                {
                    console.log("this is a new cartItem")
                this.cartItems.push({
                    productId,
                    quantity:quantity,
                    deliveryOptionId:'1'
                })}
            else if(this.cartItems) {
                console.log("this cartItem already exists")
                this.cartItems?this.cartItems.map((value)=>{
                    console.log("adding quantity by ",quantity, " for ",value)
                    if(value.productId===productId){
                        console.log("approved adding quantity by ",quantity, " for ",value)
                        value.quantity+=quantity;
                    console.log(value.quantity, 'after update')}
                }):null
            }
            console.log("saving to storage", this.cartItems)
            this.saveToStorage()
            console.log("saved to storage", this.cartItems)
        },
    
        removeFromCart (productId){
            let quantityCount=0;
            this.cartItems = this.cartItems.filter((value)=>{
                if(value.productId===productId){
                    quantityCount = value.quantity;
                    return false;
                }else return true
            })
            this.saveToStorage();
        return quantityCount;
        },
    
        addToCart(){
            const cart_quantity = document.querySelector('.cart-quantity')
            count = 0
            cart.map((value)=>{
                count+=value.quantity
            })
            console.log(cart_quantity)
            cart_quantity.textContent = count;
        },
    
        updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
            cart.forEach(cartItem => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    
    }
    return cart;
}

const cart = CartFunctionWithOOP('cart')
const businessCart = CartFunctionWithOOP('cart-business')
cart.loadFromStorage();
businessCart.loadFromStorage();
businessCart.pushToCart(`e43638ce-9090-4b85-b27f-e1d07eb678c6`,50)
businessCart.loadFromStorage();

console.log("cart ",cart)
console.log("business ",businessCart)

