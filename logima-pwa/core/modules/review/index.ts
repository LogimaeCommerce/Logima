import { module } from './store'
import { createModule } from '@logima-pwa/core/lib/module'

export const KEY = 'review'
export const Review = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
})