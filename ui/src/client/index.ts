// import { DocumentNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'

import { GRAPHQL_ENDPOINT as uri } from 'constants/index'

const client = new GraphQLClient(uri, { headers: { Authorization: '' } })

/** Runs a request to the GraphQL API */
export const runQuery = async <ReturnTypeOfQuery>(
  query: string,
  variables: Variables = {}
): Promise<ReturnTypeOfQuery> => {
  const res = await client.rawRequest<Record<string, ReturnTypeOfQuery>, Variables>(query, variables)
  if (res.errors) throw res.errors
  // GraphQL request returns an object with a single key ( the name of the query ). This returns that key
  const keyOfReturn = Object.keys(res.data || {})[0]
  if (!res.data?.[keyOfReturn]) throw new Error('Key is not correctly structured on return')
  return res.data?.[keyOfReturn]
}
