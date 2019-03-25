const _slugify = require('./helpers/slugify')

module.exports = {

  seo: {
    useUrlDispatcher: JSON.parse(process.env.SEO_USE_URL_DISPATCHER || false),
    productUrlPathMapper: (product) => {
      let destPath = ''
      if (product.category && product.category.length > 0) {
        const firstCat = product.category[0]
        destPath = (firstCat.path ? (firstCat.path) : _slugify(firstCat.name)) + '/' + (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      } else {
        destPath = (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      }
      destPath += '.html'
      console.log('Dest. product path = ', destPath)
      return destPath
    },
    categoryUrlPathMapper: (category) => {
      const destSlug = (category.url_path ? category.url_path + '/': '') + category.url_key
      console.log('Dest. cat path = ', destSlug)
      return destSlug
    },    
  },

  magento: {
    url: process.env.MAGENTO_URL || 'https://production.logima.io/rest/',
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'consumerKey',
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || 'consumerSecret',
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || 'accessToken',
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || 'accessTokenSecret',
    storeId: process.env.MAGENTO_STORE_ID || 1,
    currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'USD'
  },

  vuestorefront: {
    invalidateCache: JSON.parse(typeof process.env.VS_INVALIDATE_CACHE === 'undefined' ? false : process.env.VS_INVALIDATE_CACHE),
    invalidateCacheUrl: process.env.VS_INVALIDATE_CACHE_URL || 'http://localhost:3000/invalidate?key=aeSu7aip&tag='
  },

  product: {
    expandConfigurableFilters: ['manufacturer'],
    synchronizeCatalogSpecialPrices: process.env.PRODUCTS_SPECIAL_PRICES || false,
    renderCatalogRegularPrices: process.env.PRODUCTS_RENDER_PRICES || false,
    excludeDisabledProducts: process.env.PRODUCTS_EXCLUDE_DISABLED || false
  },

  kue: {}, // default KUE config works on local redis instance. See KUE docs for non standard redis connections

  db: {
    driver: 'elasticsearch',
    url: process.env.DATABASE_URL || 'http://localhost:9200',
    indexName: process.env.INDEX_NAME || 'vue_storefront_catalog'
  },

  elasticsearch: {
    apiVersion: process.env.ELASTICSEARCH_API_VERSION || '5.6'
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
  },

  passport: {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
      session: false
    }
  }

}