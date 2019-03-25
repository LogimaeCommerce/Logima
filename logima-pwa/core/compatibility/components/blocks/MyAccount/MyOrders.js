import { UserOrders } from '@logima-pwa/core/modules/order/components/UserOrders'

// component fully deprecated. Use user/components/Orders instead
export default {
  name: 'MyOrders',
  mixins: [UserOrders]
}
