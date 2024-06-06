import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { removeFromCart } from "../data/cart.js";


const cartItemContainer = document.querySelector('.cart-item-container');
//const paymentSummary = document.querySelector('.payment-summary');
const numberOfItems = document.querySelector('.number-of-items')


let count=0;
cart.forEach((one)=>{
  count++;
  let product = products.filter((product)=>{
    if(product.id===one.productId){
      return true
    }
    return false;
  })
  
cartItemContainer.innerHTML += `
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${product[0].image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${one.productName}
        </div>
        <div class="product-price">
          ${formatCurrency(product[0].priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${one.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete" data-product-id="${product[0].id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${product[0].id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${product[0].id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${product[0].id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    })

count?numberOfItems.textContent = count+' items':null




  document.querySelectorAll('.js-delete').forEach((button)=>{
    button.addEventListener('click',()=>{
      let productId = button.dataset.productId;
      removeFromCart(productId);
    })
  })