import Product from '@logima-pwa/core/modules/catalog/types/Product'
import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@logima-pwa/core/modules/wishlist/mixins/wishlistMountedMixin'

export const AddToWishlist = {
  name: 'AddToWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    WishlistModule.register()
  },
  methods: {
    addToWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/addItem', product) : false
    }
  }
}
