import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@logima-pwa/core/lib/module'
import { initCacheStorage } from '@logima-pwa/core/helpers/initCacheStorage'

export const KEY = 'mailchimp'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
}

export const Mailchimp = new VueStorefrontModule(moduleConfig)