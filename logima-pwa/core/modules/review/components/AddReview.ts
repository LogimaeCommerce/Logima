import Review from '@logima-pwa/core/modules/review/types/Review'

export const AddReview = {
  name: 'AddReview',
  methods: {
    addReview (review: Review) {
      this.$store.dispatch('review/add', review)
    }
  }
}
