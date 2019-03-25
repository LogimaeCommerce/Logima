import Product from '@logima-pwa/core/modules/catalog/types/Product'
import compareMountedMixin from '@logima-pwa/core/modules/compare/mixins/compareMountedMixin'

export const CompareProduct = {
  name: 'CompareProduct',
  mixins: [compareMountedMixin],
  computed: {
    isOnCompare () : boolean {
      return this.$store.getters['compare/isOnCompare'](this.product)
    }
  },
  methods: {
    removeFromCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/removeItem', product)
        : false
    }
  }
}
