import {cart,pushToCart} from '../data/cart.js';
import { products } from '../data/products.js';

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
        handleAddToCart(productName,productId)
        addToCart(quantity);
        console.log(cart)
    })
})


function handleAddToCart(productName,productId){
    let newCart = cart.filter((value)=>value.productId===productId)
        quantity=Number(document.querySelector(`.select-${productId}`).value)
        display_added_message(productId)
        pushToCart(productId,productName,newCart,quantity)
}


function display_added_message(productId){
    let message = document.querySelector(`.js-message-${productId}`);
        message.classList.remove('hide')
        if(!timeoutId){
            timeoutId = setTimeout(()=>message.classList.add('hide'),2000)
        }
        else{
            clearTimeout(timeoutId);
            console.log("after clearing ",timeoutId)
            timeoutId = setTimeout(()=>message.classList.add('hide'),2000)
        }   
}
let count=0;
function addToCart(){
    count = 0
    cart.map((value)=>{
        count+=value.quantity
    })
    cart_quantity.textContent = count;
}
