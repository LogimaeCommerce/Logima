import { server, graphql } from 'config'
import Vue from 'vue'
import { Logger } from '@logima-pwa/core/lib/logger'

export const getApolloProvider = async () => {
  if (server.api === 'graphql') {
    const ApolloModule = await import(/* webpackChunkName: "logima-graphql" */ 'vue-apollo')
    const VueApollo = ApolloModule.default
    Vue.use(VueApollo)

    const HttpLinkModule = await import(/* webpackChunkName: "logima-graphql" */ 'apollo-link-http')
    const HttpLink = HttpLinkModule.HttpLink

    const httpLink = new HttpLink({
      uri: graphql.host.indexOf('://') >= 0 ? graphql.host : (server.protocol + '://' + graphql.host + ':' + graphql.port + '/graphql')
    })

    const ApolloClientModule = await import(/* webpackChunkName: "logima-graphql" */ 'apollo-client')
    const ApolloClient = ApolloClientModule.default
    const inMemoryCacheModule = await import(/* webpackChunkName: "logima-graphql" */ 'apollo-cache-inmemory')
    const InMemoryCache = inMemoryCacheModule.InMemoryCache

    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })

    let loading = 0

    const apolloProvider = new VueApollo({
      clients: {
        a: apolloClient
      },
      defaultClient: apolloClient,
      defaultOptions: {
        // $loadingKey: 'loading',
      },
      watchLoading (state, mod) {
        loading += mod
        Logger.log('Global loading', loading, mod)()
      },
      errorHandler (error) {
        Logger.log('Global error handler')()
        Logger.error(error)()
      }
    })

    return apolloProvider
  }
}

export default {
  getApolloProvider
}
