import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { loadProducts } from '../data/products.js'
//import '../data/cart-class.js'
//import '../data/car.js'
//import '../data/back-end-practice.js'

//after fetch (a better way to make http requests) instead of XMLHttpRequest
loadProducts().then(()=>{
    const count = renderOrderSummary()
    renderPaymentSummary(count)
})



//using Promise
// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve();
//     })
// }).then(()=>{
//     const count = renderOrderSummary()
//     renderPaymentSummary(count)
// })

// loadProducts(()=>{
//     const count = renderOrderSummary()
//     renderPaymentSummary(count)
// })

