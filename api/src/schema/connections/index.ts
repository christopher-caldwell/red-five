import { stitchSchema } from '@/utils'

const ConnectionSchema = `#graphql
  type Connection {
    name: String!
    id: String!
    host: String!
    port: Int!
    protocol: String!
  }
  input ConnectionInput {
    name: String!
    host: String!
    port: Int!
    protocol: String!
  }
`

export const ConnectionQueries = `#graphql
connection(id: String!): Connection
connections(limit: Int, startPosition: Int): [Connection]
`

export const ConnectionMutations = `#graphql
createConnection(connection: ConnectionInput!): MutationResult
removeConnection(id: String!): MutationResult
`

export const ConnectionsSchema = stitchSchema(ConnectionSchema)
