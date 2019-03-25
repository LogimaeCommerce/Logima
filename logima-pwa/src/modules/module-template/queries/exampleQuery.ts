// GraphQL and ES queries exposed by this module
import SearchQuery from '@logima-pwa/core/lib/search/searchQuery'

export function exampleQuery(queryText, queryFilter) {
  let exampleQuery = new SearchQuery()

  exampleQuery = exampleQuery
    .setSearchText(queryText)
    .applyFilter(queryFilter)

return exampleQuery
}
