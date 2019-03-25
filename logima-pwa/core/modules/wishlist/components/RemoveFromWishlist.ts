import Product from '@logima-pwa/core/modules/catalog/types/Product'
import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@logima-pwa/core/modules/wishlist/mixins/wishlistMountedMixin'

export const RemoveFromWishlist = {
  name: 'RemoveFromWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      WishlistModule.register()
      this.$store.dispatch('wishlist/removeItem', product)
    }
  }
}
