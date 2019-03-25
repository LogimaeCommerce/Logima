import { createModule } from '@logima-pwa/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'

const KEY = 'payment-cash-on-delivery'
export const PaymentCashOnDelivery = createModule({
  key: KEY,
  afterRegistration
})