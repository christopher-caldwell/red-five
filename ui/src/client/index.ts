// import { DocumentNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'

import { GRAPHQL_ENDPOINT as uri } from 'constants/index'

const client = new GraphQLClient(uri, { headers: { Authorization: '' } })

/** Runs a request to the GraphQL API */
export const runQuery =
  <ReturnTypeOfQuery, TVariables = undefined>(
    query: string,
    variables?: TVariables
  ): (() => Promise<ReturnTypeOfQuery>) =>
  async () => {
    const res = await client.rawRequest<ReturnTypeOfQuery, Variables>(query, variables)
    if (res.errors) throw res.errors
    if (!res.data) throw new Error('Data is falsy')
    return res.data
  }
