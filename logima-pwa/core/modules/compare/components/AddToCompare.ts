import Product from '@logima-pwa/core/modules/catalog/types/Product'
import compareMountedMixin from '@logima-pwa/core/modules/compare/mixins/compareMountedMixin'

export const AddToCompare = {
  name: 'AddToCompare',
  mixins: [compareMountedMixin],
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    }
  }
}
