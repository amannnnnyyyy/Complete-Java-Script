import {cart} from '../data/cart.js';

const product_name = document.querySelector('.product-name');
const product_image = document.querySelector('.product-image');
const product_rating_image = document.querySelector('.product-rating-stars');
const product_price = document.querySelector('.product-price');
const product_rating_count = document.querySelector('.product-rating-count');
const products_grid = document.querySelector('.products-grid') 
const cart_quantity = document.querySelector('.cart-quantity')


products.map((product)=>{
    products_grid.innerHTML += `
    <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${(product.rating.stars)*10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container js-quantity">
                <select class="select-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-message-${product.id} hide">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `
})


let quantity;
let timeoutId;
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const productName = button.dataset.productName;
        const productId = button.dataset.productId;
        let newCart = cart.filter((value)=>value.productId===productId)
        quantity=Number(document.querySelector(`.select-${productId}`).value)
            console.log("quantity ",quantity)
        let message = document.querySelector(`.js-message-${productId}`);
        message.classList.remove('hide')
        console.log(!timeoutId)
        if(!timeoutId){
            timeoutId = setTimeout(()=>message.classList.add('hide'),9000)
        }
        else{
            clearTimeout(timeoutId);
            console.log("after clearing ",timeoutId)
            timeoutId = setTimeout(()=>message.classList.add('hide'),9000)
        }
        
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
        addToCart(quantity);
        console.log(cart)
    })
})


let count=0;
function addToCart(){
    count = 0
    cart.map((value)=>{
        count+=value.quantity
    })
    cart_quantity.textContent = count;
}
