// Read more about modules: https://github.com/LogimaeCommerce/logima-pwa/blob/master/doc/api-modules/about-modules.md
import { module } from './store'
import { plugin } from './store/plugin'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { createModule } from '@logima-pwa/core/lib/module'
import { beforeEach } from './router/beforeEach'
import { afterEach } from './router/afterEach'
import { initCacheStorage } from '@logima-pwa/core/helpers/initCacheStorage'

export const KEY = 'example'
export const cacheStorage = initCacheStorage(KEY)
export const Example = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  beforeRegistration,
  afterRegistration,
  router: { beforeEach, afterEach }
}
)
