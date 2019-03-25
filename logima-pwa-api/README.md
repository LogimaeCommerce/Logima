REST API backend for logima-pwa
===================================

This is a backend service for [logima-pwa](https://github.com/LogimaeCommerce/logima-pwa). Provides data access to product catalog (via ElasticSearch) and allows users to place orders into order queue (by default it's Redis queue supported via kqueue library).

## Vue Storefront

Vue Storefront is a standalone [PWA](https://developers.google.com/web/progressive-web-apps/) (Progressive Web Application ) storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.

Vue Storefront is and always will be in the open source. Anyone can use and support the project, we want it to be a tool for the improvement of the shopping experience. The project is still in the prove of concept phase. We are looking for Contributors and Designer willing to help us the the solution development.

Vue Storefront was build as a all-in-one front-end for eCommerce. For providing the best performance we decided to use Vue.js as a front-end library, Node.js + Express (and maybe GraphQL support) as a server-API, Elastic Search as a database of products and full PWA/off-line support.
Here you can read more about the proof of concept for [Vue Storefront connected with Magento2](https://www.linkedin.com/pulse/magento2-nosql-database-pwa-support-piotr-karwatka).

Besides a big improvement for the shopping experience, we also want to create a great code base for every developer who needs to work on a front-end application for the eCommerce.

## Requirements

- Docker and Docker Compose

Already included in `logima-pwa-api` Docker image (required locally, if you do not use containerization):
- Node.js 8.x or higher
- Yarn

## Installation

**Start a containerized environment**

The **legacy** (A) mode - starting just the Elastic and Redis containers:
`docker-compose up -d`

The **standard** (B) mode - starting Elastic, Redis + Vue Storefront API containers:
`docker-compose -f docker-compose.yml -f docker-compose.nodejs.yml up -d`

As a result, all necessary services will be launched:
- Vue Storefront API runtime environment (Node.js with dependencies from `package.json`)
- [ElasticSearch](https://www.elastic.co/products/elasticsearch)
- [Redis](https://redis.io/)
- Kibana (optional)

**Import product catalog**

Product catalog is imported using [elasticdump](https://www.npmjs.com/package/elasticdump), which is installed automatically via project dependency. The default ElasticSearch index name is: `logima_pwa_catalog`

- (A) `yarn restore`
- (B) `docker exec -it logimapwaapi_app_1 yarn restore`

Then, to update the structures in the database to the latest version (data migrations), do the following:

- (A) `yarn migrate`
- (B) `docker exec -it logimapwaapi_app_1 yarn migrate`

By default, the application server is started in development mode. It means that code auto reload is enabled along with ESLint, babel support.

It restores JSON documents stored in `./var/catalog.json`. The opposite command - used to generate `catalog.json` file from running ElasticSearch cluster:

- (A) `yarn dump`
- (B) `docker exec -it logimapwaapi_app_1 yarn dump`

**Access ElasticSearch data with Kibana**

A [Kibana](https://www.elastic.co/products/kibana) service is available to explore, search and visualize indexed data at the following url:

`http://localhost:5601/`

At first access it will ask to specify an index pattern, insert `logima_pwa*`

## API access
Catalog API calls are compliant with ElasticSearch (it works like a filtering proxy to ES). More on ES queries: [ElasticSearch queries tutorial](http://okfnlabs.org/blog/2013/07/01/elasticsearch-query-tutorial.html)

Elastic search endpoint: `http://localhost:8080/api/catalog/search/<INDEX_NAME>/`. You can run the following command to check if everything is up and runing (it assumes `logima_pwa_catalog` as default index name):

`curl -i http://elastic:changeme@localhost:8080/api/catalog/logima_pwa_catalog/_search`

## Data formats
This backend is using ElasticSearch data formats popularized by [ElasticSuite for Magento2 by Smile.fr](https://github.com/Smile-SA/elasticsuite).

* [Product model](./src/models/catalog-product.md)
* [Category model](./src/models/catalog-category.md)

## Data migrations
Please use data migration mechanism provided to manipulate Redis, ElasticSearch or kue. Details: https://github.com/LogimaeCommerce/logima-pwa-api/tree/master/doc 

## Adding custom modules with own dependencies (Yarn only)
When adding custom [Extensions to the API](https://github.com/LogimaeCommerce/logima-pwa/blob/master/doc/Extending%20logima-pwa-api.md) you might want to define some dependencies inside them. Thanks to [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) dependecies defined inside your custom module will be intaled when you execute `yarn` at project root level, so it's way esier and faster than installing all modules dependcies separetly.

To do this, define the `package.json` with your dependencies in your custom module:
- `src/api/extensions/{your-custom-extension}/package.json` 
- `src/platforms/{your-custom-platform}/package.json`

Executing `docker exec -it logima-pwaapiapp_1 yarn install` will also download your custom modules dependencies.

NOTE: `npm` users will still have to install the dependencies individually in their modules.

## Reviews
To use review feature you need to install custom module for Magento 2: [Divante ReviewApi](https://github.com/LogimaeCommerce/magento2-review-api)

## Running initial Magento2 import

Magento2 data import is now integrated into `logima-pwa-api` for simplicity. It's still managed by the [mage2logimapwa](https://github.com/LogimaeCommerce/mage2logimapwa) - added as a dependency to `logima-pwa-api`.

After setting the `config.magento2.api` section using Yours Magento2 oauth credentials:

```json
  "magento2": {
    "url": "http://magento2.demo-1.xyz.com",
    "imgUrl": "http://localhost:8080/media/catalog/product",
    "assetPath": "/../var/magento2-sample-data/pub/media",
    "magentoUserName": "",
    "magentoUserPassword": "",
    "httpUserName": "",
    "httpUserPassword": "",
    "api": {
      "url": "http://pay.logima.io/rest",
      "consumerKey": "key",
      "consumerSecret": "consumerSecret",
      "accessToken": "accessToken",
      "accessTokenSecret": "accessTokenSecret"
    }
  },
```

You can run the following command to execute the full import:

```bash
 yarn mage2vs import
 ```

 ... or in multistore setup You can run the same command with specified `store-code` parameter

```bash
 yarn mage2vs import --store-code=de
 ```
 
## Executing delta indexer

You can use the following command to run a delta indexer for a specific storeview:

```
yarn mage2vs productsdelta --store-code=de
```

License
-------

[MIT](./LICENSE)
