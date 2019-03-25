import i18n from '@logima-pwa/i18n'
import { Logger } from '@logima-pwa/core/lib/logger'

export default {
  name: 'Error',
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      Logger.log('Calling asyncData for Error page ' + new Date())()
      if (context) {
        context.output.cacheTags.add(`error`)
      }
      resolve()
    })
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Internal Server Error 500'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
