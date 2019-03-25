import Product from '@logima-pwa/core/modules/catalog/types/Product'

export const AddToCart = {
  name: 'AddToCart',
  props: {
    product: {
      required: true,
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addToCart (product: Product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}
