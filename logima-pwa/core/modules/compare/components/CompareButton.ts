import compareMountedMixin from '@logima-pwa/core/modules/compare/mixins/compareMountedMixin'

export const CompareButton = {
  name: 'CompareButton',
  mixins: [compareMountedMixin],
  computed: {
    isEmpty () : boolean {
      return this.$store.getters['compare/isEmpty']
    }
  }
}
