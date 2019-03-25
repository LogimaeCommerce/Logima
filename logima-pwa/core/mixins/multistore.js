import { localizedRoute as localizedRouteHelper, currentStoreView } from '@logima-pwa/core/lib/multistore'

export const multistore = {
  methods: {
    /**
     * Return localized route params
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    localizedRoute (routeObj) {
      const storeView = currentStoreView()
      return localizedRouteHelper(routeObj, storeView.storeCode)
    }
  }
}
