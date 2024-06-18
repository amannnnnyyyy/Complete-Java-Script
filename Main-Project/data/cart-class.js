class Cart{
    count=undefined;
    count=undefined;
    #storage = undefined;

    constructor(value){
        this.#storage=value;
        this.#loadFromStorage()
    }


    #loadFromStorage(){
        console.log("loading from storage")
        this.cartItems = JSON.parse(localStorage.getItem(this.#storage));
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
        }

        saveToStorage(){
            localStorage.setItem(this.#storage,JSON.stringify(this.cartItems))
        }



        pushToCart(productId='',quantity=0){
            this.#loadFromStorage()
                if(this.cartItems&& !this.cartItems.find(o=>o.productId===productId))
                    {
                    this.cartItems.push({
                        productId,
                        quantity:quantity,
                        deliveryOptionId:'1'
                    })}
                else if(this.cartItems) {
                    this.cartItems?this.cartItems.map((value)=>{
                        if(value.productId===productId){
                            value.quantity+=quantity;}
                    }):null
                }
                this.saveToStorage()
            }



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
        }



        addToCart(){
            const cart_quantity = document.querySelector('.cart-quantity')
            count = 0
            cart.map((value)=>{
                count+=value.quantity
            })
            cart_quantity.textContent = count;
        }



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


    
    const cart = new Cart('cart');
    const businessCart = new Cart('cart-bis');
    businessCart.pushToCart(`e43638ce-9090-4b85-b27f-e1d07eb678c6`,50)
    
    console.log("cart",cart)
    console.log("business",businessCart)
    
    