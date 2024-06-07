import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { removeFromCart } from "../data/cart.js";
import { saveToStorage } from "../data/cart.js";


const cartItemContainer = document.querySelector('.cart-item-container');
//const paymentSummary = document.querySelector('.payment-summary');
const numberOfItems = document.querySelector('.number-of-items')
const main = document.querySelector('.main')
const paymentSummary = document.querySelector('.payment-summary')


export let count=0;
cart.forEach((one)=>{
  count++;
  let product = products.filter((product)=>{
    if(product.id===one.productId){
      return true
    }
    return false;
  })
  
cartItemContainer.innerHTML += `
    <div class="cart-item-container js-container-${product[0].id}">
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
          <span class="update-quantity-link link-primary js-update js-update-${product[0].id}" data-product-id="${product[0].id}">
            Update
          </span>
          <input class="quantity-input hidden js-input-${product[0].id}" type="number" placeholder="update quantity here">
          <span class="hidden save-quantity-link link-primary js-updateBtn-${product[0].id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete js-delete-${product[0].id}" data-product-id="${product[0].id}">
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
    </div>
    `
    })

    document.querySelector('.payment-summary').innerHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${count}):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        ` 

count?numberOfItems.textContent = count+' items':numberOfItems.textContent = 'No Items'
  document.querySelectorAll('.js-delete').forEach((button)=>{
    button.addEventListener('click',()=>{
      let productId = button.dataset.productId;
      removeFromCart(productId);
      count--;
      document.querySelector(`.js-container-${productId}`).remove()
      count?numberOfItems.textContent = count+' items':numberOfItems.textContent = 'No Items'
      if(!count) {
        console.log("no count") 
      document.body.classList.add('remove-background')
      main.classList.add('main-after')
      document.body.innerHTML += `
        <div class='drop-shadow'>
          <div class="glass">
          </div>
          <h1 class="errorMessage">No items in your cart</h1>
          <div class="bullshit">
          <h4 class="redirect">Redirecting you to home page<span class="ellipsis"> ...</span></h4></div>
        </div>`
        setTimeout(()=>window.location = "../Main-Project/amazon.html",2000)
      }
    })
  })


  //update functionality
  document.querySelectorAll('.js-update').forEach((button)=>{
    let productId = button.dataset.productId;
    const updateBtn = document.querySelector(`.js-updateBtn-${productId}`);
    const editingQuantity = document.querySelector(`.js-container-${productId}`)
    button.addEventListener('click',()=>{
        document.querySelector(`.js-updateBtn-${productId} `).classList.remove('hidden')
        document.querySelector(`.js-input-${productId}`).classList.remove('hidden')
        document.querySelector(`.js-update-${productId}`).classList.add('hidden')
        editingQuantity.classList.add('is-editing-quantity')
        updateBtn?updateBtn.addEventListener('click',()=>{
          document.querySelector(`.js-updateBtn-${productId} `).classList.add('hidden')
          document.querySelector(`.js-input-${productId}`).classList.add('hidden')
          document.querySelector(`.js-update-${productId}`).classList.remove('hidden')
          editingQuantity.classList.remove('is-editing-quantity')
        }):null
    })
  })