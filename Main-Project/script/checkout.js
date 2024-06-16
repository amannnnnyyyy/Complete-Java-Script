import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'

const count = renderOrderSummary()
renderPaymentSummary(count)
