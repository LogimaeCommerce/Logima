import { module } from './store'
import { createModule } from '@logima-pwa/core/lib/module'

export const KEY = 'mailer'
export const Mailer = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
})
