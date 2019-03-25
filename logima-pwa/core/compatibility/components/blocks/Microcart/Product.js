import rootStore from '@logima-pwa/core/store'
import { MicrocartProduct } from '@logima-pwa/core/modules/cart/components/Product.ts'
import i18n from '@logima-pwa/i18n'

export default {
  data () {
    // deprecated
    return {
    }
  },
  beforeMount () {
    // deprecated, will be moved to theme or removed in the near future #1742
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
    this.$bus.$on('notification-after-itemremoved', this.onProductRemoved)
  },
  beforeDestroy () {
    // deprecated, will be moved to theme or removed in the near future #1742
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
    this.$bus.$off('notification-after-itemremoved', this.onProductRemoved)
  },
  methods: {
    removeItem () {
      if (rootStore.state.config.cart.askBeforeRemoveProduct) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          item: this.product,
          message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
          action2: { label: i18n.t('OK'), action: this.removeFromCart },
          action1: { label: i18n.t('Cancel'), action: 'close' },
          hasNoTimeout: true
        })
      } else {
        this.removeFromCart()
      }
    },
    updateQuantity (newQuantity) {
      let quantity = parseInt(newQuantity)
      if (quantity < 1) quantity = 1
      MicrocartProduct.methods.updateQuantity.call(this, quantity)
    },
    onProductChanged (event) {
      // deprecated, will be moved to theme or removed in the near future #1742
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    onProductRemoved (event) {
      if (event.item.sku === this.product.sku) {
        this.removeFromCart(event.item)
      }
    }
  },
  mixins: [
    MicrocartProduct
  ]
}