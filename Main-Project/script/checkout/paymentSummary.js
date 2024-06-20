import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(count=0){
    console.log("count: " + count);
    let orderPrice=0;
    let priceShippingCents=0
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId)
        orderPrice += Number(product.priceCents) * cartItem.quantity;
        
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    priceShippingCents += deliveryOption.priceCents;


 
    })
    const totalBeforeTaxCents = priceShippingCents + orderPrice;
    const taxCents = totalBeforeTaxCents*0.1
    const totalCostCents = totalBeforeTaxCents + taxCents;
    console.log("total cost : ", totalCostCents)

    const paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${count}):</div>
            <div class="payment-summary-money">${formatCurrency(orderPrice)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(priceShippingCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalCostCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `
    
document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;

document.querySelector('.place-order-button').addEventListener('click',async ()=>{
    try {
        const response = await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            cart:cart,
            deliveryOptionId:cart[0].deliveryOptionId
        })
    });
    console.log(cart)
    const order = await response.json();
    addOrder(order);
    } catch (error) {
        console.log('Unexpected Error ',error.message)
    }
    window.location.href=('orders.html')
    
})
}