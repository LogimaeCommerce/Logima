import * as localForage from 'localforage'
import UniversalStorage from '@logima-pwa/core/store/lib/storage'
import { currentStoreView } from '@logima-pwa/core/lib/multistore'

export function beforeRegistration({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  Vue.prototype.$db.usersCollection = new UniversalStorage(localForage.createInstance({
    name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
    storeName: 'user',
    driver: localForage[config.localForage.defaultDrivers['user']]
  }))

  Vue.prototype.$db.ordersHistoryCollection = new UniversalStorage(localForage.createInstance({
    name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
    storeName: 'ordersHistory',
    driver: localForage[config.localForage.defaultDrivers['ordersHistory']]
  }))
}