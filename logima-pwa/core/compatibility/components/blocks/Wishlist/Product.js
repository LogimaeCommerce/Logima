import { WishlistProduct } from '@logima-pwa/core/modules/wishlist/components/Product'
export default {
  name: 'Product',
  methods: {
    // deprecated
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    }
  },
  mixins: [WishlistProduct]
}
