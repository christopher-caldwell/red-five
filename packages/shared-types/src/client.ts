import { serializeError } from 'serialize-error'
import { GraphQLClient, ClientError } from 'graphql-request'
import { Variables, GraphQLResponse } from 'graphql-request/dist/types'

/** Runs a request to the GraphQL API */
export const runQuery =
  <ReturnTypeOfQuery, TVariables extends Variables>(
    query: string,
    variables?: TVariables
  ): (() => Promise<ReturnTypeOfQuery>) =>
  async () => {
    const uri = process.env['NX_GRAPHQL_ENDPOINT']
    if (!uri) throw new Error('Cannot determine the GraphQL endpoint')
    try {
      const token = localStorage.getItem('_auth') || ''
      const client = new GraphQLClient(uri, { headers: { Authorization: token } })
      const res = await client.rawRequest<ReturnTypeOfQuery, Variables>(query, variables)
      if (!res.data) throw new Error('Data is falsy')
      return res.data
    } catch (e) {
      const error = serializeError<ClientError>(e as ClientError)
      const errorResponse = error['response'] as GraphQLResponse
      const errors = errorResponse?.errors || []
      if (!errors.length) throw e
      const errorMessage = errors[0].message
      throw new Error(errorMessage)
    }
  }
