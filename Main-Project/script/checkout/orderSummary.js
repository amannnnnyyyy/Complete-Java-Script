import { addToCart, cart, pushToCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { removeFromCart } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { taxCalc } from "../utils/money.js";
import { deliveryTime, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export let count;

export function renderOrderSummary(){
let deliveryPrice;

const cartItemContainer = document.querySelector('.cart-item-container');
const numberOfItems = document.querySelector('.number-of-items')
const main = document.querySelector('.main')

//managing the popup message

const overlay = document.querySelector('.overlay')
const popup_message = document.querySelector('.popup-message')
const ok_popup = document.querySelector('.ok-popup')
const close_popup = document.querySelector('.close-popup')
const popup_body = document.querySelector('.popup-body')

function displayCart(truth){
  truth?overlay.classList.add('hidden'):overlay.classList.remove('hidden')
  truth?popup_message.classList.add('hidden'):popup_message.classList.remove('hidden')
}

function sayOkToPopup(productId){
ok_popup.addEventListener('click',()=>{
  deleteProduct(productId)
  displayCart(true)
})
}
close_popup.addEventListener('click',()=>{
  displayCart(true)
})


// console.log(dayjs(new Date).format('dddd, MMMM D'))
count=0;

function forUpdate(){
  cart.forEach((one)=>{
    let product = products.filter((product)=>{
      if(product.id===one.productId){
        orderPrice += Number(product.priceCents) * one.quantity;
        return true
      }
      return false;
    })})
}

let orderPrice=0;
cart.forEach((one)=>{
    
  count+=one.quantity;
  const product = getProduct(one.productId)
  orderPrice += Number(product.priceCents) * one.quantity;
 
  
  const cartItemDiv = document.createElement('div');
  cartItemDiv.classList.add('cart-item');
  
  const deliveryOptionId= one.deliveryOptionId;
  const deliveryOption=getDeliveryOption(deliveryOptionId);


let deliveryDate = dayjs(new Date).add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D')


cartItemContainer.innerHTML += `
    <div class="cart-item-container js-container-${product.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryDate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${product.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${one.productName}
        </div>
        <div class="product-price">
          ${formatCurrency(product.priceCents)}
        </div>
        <div class="product-quantity">
          <span class="js-quantity-${product.id}">
            Quantity: <span class="quantity-label quantity-display-${product.id}">${one.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update js-update-${product.id}" data-product-id="${product.id}">
            Update
          </span>
          <input class="quantity-input hidden js-input-${product.id}" type="number" placeholder="update quantity here">
          <span class="hidden save-quantity-link link-primary js-updateBtn-${product.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete js-delete-${product.id}" data-product-id="${product.id}">
            Delete
          </span>
        </div>
        <h5 class="errorMessage-${product.id} error-message-update hidden">please insert positive number only</h5>
      </div>
      <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryTimeCalc(product,one).html}
      </div>
      </div>
    </div>
    `
    cartItemContainer.appendChild(cartItemDiv);
    })
  

    //render Payment Summary page
    console.log("items: ",count)
          renderPaymentSummary(count)
          console.log("for header count ",count)
          renderCheckoutHeader(count)
// count?numberOfItems.textContent = count+' items':numberOfItems.textContent = 'No Items'
  document.querySelectorAll('.js-delete').forEach((button)=>{
    button.addEventListener('click',()=>{
      let productId = button.dataset.productId;
      deleteProduct(productId)
    })
  })

  //delete functionality
  function deleteProduct(productId){
    const countQuantity = removeFromCart(productId);
    count=count-countQuantity;
      document.querySelector(`.js-container-${productId}`).remove()
      // count?numberOfItems.textContent = count+' items':numberOfItems.textContent = 'No Items'
      renderCheckoutHeader(count)
      if(!count) {
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
      renderPaymentSummary(count);
  }

  //update functionality
  document.querySelectorAll('.js-update').forEach((button)=>{
    let productId = button.dataset.productId;
    const updateBtn = document.querySelector(`.js-updateBtn-${productId}`);
    const editingQuantity = document.querySelector(`.js-container-${productId}`)
    button.addEventListener('click',()=>{
        document.querySelector(`.js-updateBtn-${productId} `).classList.remove('hidden')
        document.querySelector(`.js-updateBtn-${productId} `).addEventListener('click',()=>{
          saveUpdatedQuantity(productId)
        })
        document.querySelector(`.js-input-${productId}`).classList.remove('hidden')
        document.querySelector(`.js-update-${productId}`).classList.add('hidden')
        editingQuantity.classList.add('is-editing-quantity')
        updateBtn?updateBtn.addEventListener('click',()=>{
          document.querySelector(`.js-updateBtn-${productId} `).classList.add('hidden')
          document.querySelector(`.js-input-${productId}`).classList.add('hidden')
          document.querySelector(`.js-update-${productId}`).classList.remove('hidden')
          editingQuantity.classList.remove('is-editing-quantity')
          renderPaymentSummary(count)
        }):null
    })
  
  })

  let newCount;
  function saveUpdatedQuantity(productId){
    const inputValue = document.querySelector(`.js-input-${productId}`).value
    let quantity=Number(inputValue);
    let newCart = cart.filter((value)=>value.productId===productId)
    if(!(quantity <= 0)){
    console.log(
      cart.filter((value)=>{
        if(value.productId === productId){
          quantity -= value.quantity
          pushToCart(productId,value.productName,newCart,quantity)
          document.querySelector(`.quantity-display-${productId}`).textContent = inputValue
          count+=quantity
          newCount = 0
    cart.map((value)=>{
        newCount+=value.quantity
    })
    renderCheckoutHeader(newCount)
    // numberOfItems.textContent = newCount+' items'
        }
      })
    )
    orderPrice = 0;
    forUpdate();
  }else if(quantity === 0){
    displayCart(false)
    sayOkToPopup(productId)
  }else if(quantity < 0){
    const error = document.querySelector(`.errorMessage-${productId}`)
    error.classList.remove('hidden')
    setTimeout(()=>{
      error.classList.add('hidden')
    },2000)
  }
  }
  

function deliveryTimeCalc(product,cartItem){
  let html='';
  let price;

  deliveryTime.forEach((time)=>{
    const isChecked = time.id === cartItem.deliveryOptionId;

  price = formatCurrency(time.priceCents)
html+=`
  <div class="delivery-option">
    <input type="radio" ${isChecked ?`checked`:``}
      class="delivery-option-input radio-input"
      name="delivery-option-${product.id}" data-product-id = "${product.id}" data-delivery-option-id="${time.id}" data-delivery-price="${time.priceCents}">
    <div>
      <div class="delivery-option-date">
      ${dayjs(new Date).add(time.deliveryDays, 'day').format('dddd, MMMM D')}
      </div>
      <div class="delivery-option-price">
        ${time.priceCents?formatCurrency(time.priceCents):`FREE Shipping`}
      </div>
    </div>
  </div>
`
 })
return {html:html,price:price};
}

const radio_input = document.querySelectorAll('.radio-input').forEach((radio)=>radio.addEventListener('click',()=>{
  let productId = radio.dataset.productId;
  let deliveryOptionId = radio.dataset.deliveryOptionId;
  let deliveryOptionPrice = radio.dataset.deliveryPrice;
  updateDeliveryOption(productId,deliveryOptionId)
  cartItemContainer.innerHTML = '';
  renderOrderSummary()
}))
return count
}

