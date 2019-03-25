import onEscapePress from '@logima-pwa/core/mixins/onEscapePress'
import { Wishlist } from '@logima-pwa/core/modules/wishlist/components/Wishlist'
export default {
  name: 'Wishlist',
  props: {
    // deprecated
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  methods: {
    // theme-specific
    onEscapePress () {
      this.closeWishlist()
    }
  },
  mixins: [ Wishlist, onEscapePress ]
}
