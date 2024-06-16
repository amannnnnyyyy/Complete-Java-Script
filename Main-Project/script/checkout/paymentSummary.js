import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(count){
    let orderPrice=0;
    let priceShippingCents=0
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId)
        orderPrice += Number(product.priceCents) * cartItem.quantity;
        console.log(orderPrice)
        
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    priceShippingCents += deliveryOption.priceCents;


 
    })
    const totalBeforeTaxCents = priceShippingCents + orderPrice;
    const taxCents = totalBeforeTaxCents*0.1
    const totalCents = totalBeforeTaxCents + taxCents;

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
            <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `
return paymentSummaryHtml;
}