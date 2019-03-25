import Vue from 'vue'
import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@logima-pwa/core/lib/search'
import SearchQuery from '@logima-pwa/core/lib/search/searchQuery'
import { adjustMultistoreApiUrl } from '@logima-pwa/core/lib/multistore'
import RootState from '@logima-pwa/core/types/RootState'
import ReviewState from '../types/ReviewState'
import * as types from './mutation-types'
import i18n from '@logima-pwa/i18n'
import rootStore from '@logima-pwa/core/store'
import Review from '@logima-pwa/core/modules/review/types/Review'
import { ReviewRequest } from '@logima-pwa/core/modules/review/types/ReviewRequest'
import { Logger } from '@logima-pwa/core/lib/logger'

const actions: ActionTree<ReviewState, RootState> = {
  /**
   * Retrieve reviews
   *
   * @param context
   * @param {any} query
   * @param {any} start
   * @param {any} size
   * @param {any} entityType
   * @param {any} sort
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { productId, approved = true, start = 0, size = 50, entityType = 'review', sort = '', excludeFields = null, includeFields = null}) {
    let query = new SearchQuery()

    if (productId) {
      query = query.applyFilter({key: 'product_id', value: {'eq': productId}})
    }

    if (approved) {
      query = query.applyFilter({key: 'review_status', value: {'eq': 1}})
    }

    quickSearchByQuery({ query, start, size, entityType, sort, excludeFields, includeFields }).then((resp) => {
      context.commit(types.REVIEW_UPD_REVIEWS, resp)
    }).catch(err => {
      Logger.error(err, 'review')()
    })
  },

  /**
   * Add new review
   *
   * @param context
   * @param {Review} reviewData
   * @returns {Promise<void>}
   */
  async add (context, reviewData: Review) {
    const review:ReviewRequest = {review: reviewData}

    Vue.prototype.$bus.$emit('notification-progress-start', i18n.t('Adding a review ...'))

    let url = rootStore.state.config.reviews.create_endpoint

    if (rootStore.state.config.storeViews.multistore) {
      url = adjustMultistoreApiUrl(url)
    }

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })
      Vue.prototype.$bus.$emit('notification-progress-stop')
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You submitted your review for moderation.'),
        action1: { label: i18n.t('OK') }
      })
      Vue.prototype.$bus.$emit('clear-add-review-form')
    } catch (e) {
      Vue.prototype.$bus.$emit('notification-progress-stop')
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Something went wrong. Try again in a few seconds.'),
        action1: { label: i18n.t('OK') }
      })
    };
  }
}

export default actions
