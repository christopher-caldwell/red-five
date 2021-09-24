import { serializeError } from 'serialize-error'
import { GraphQLClient, ClientError } from 'graphql-request'
import { Variables, GraphQLResponse } from 'graphql-request/dist/types'

import { GRAPHQL_ENDPOINT as uri } from '@/constants/index'

const client = new GraphQLClient(uri, { headers: { Authorization: '' } })

/** Runs a request to the GraphQL API */
export const runQuery =
  <ReturnTypeOfQuery, TVariables = undefined>(
    query: string,
    variables?: TVariables
  ): (() => Promise<ReturnTypeOfQuery>) =>
  async () => {
    try {
      const res = await client.rawRequest<ReturnTypeOfQuery, Variables>(query, variables)
      if (!res.data) throw new Error('Data is falsy')
      return res.data
    } catch (e) {
      const error = serializeError<ClientError>(e as ClientError)
      const errorResponse = error.response as GraphQLResponse
      const errors = errorResponse?.errors || []
      if (!errors.length) throw e
      const errorMessage = errors[0].message
      throw new Error(errorMessage)
    }
  }
