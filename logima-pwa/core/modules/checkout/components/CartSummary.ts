import { mapGetters } from 'vuex'
import Microcart from '@logima-pwa/core/compatibility/components/blocks/Microcart/Microcart'

export const CartSummary = {
  name: 'CartSummary',
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals',
      isVirtualCart: 'cart/isVirtualCart'
    })
  }
}
