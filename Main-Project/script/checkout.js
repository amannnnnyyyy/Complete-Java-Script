import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import '../data/cart.oop.js'

const count = renderOrderSummary()
renderPaymentSummary(count)
