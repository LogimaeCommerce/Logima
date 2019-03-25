import { CategorySort } from '@logima-pwa/core/modules/catalog/components/CategorySort'

export default {
  name: 'SortBy',
  methods: {
    changeOrder () {
      // renamed to sort
      this.sort()
    }
  },
  computed: {
    sortByAttribute () {
      // renamed to sortingOptions
      return this.$store.state.config.products.sortByAttributes
    }
  },
  mixins: [CategorySort]
}
