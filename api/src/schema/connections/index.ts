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
    id: String!
    host: String!
    port: Int!
    protocol: String!
  }
`

export const ConnectionQueries = `#graphql
connection(id: Int!): Connection
connections(limit: Int, startPosition: Int): [Connection]
`

export const ConnectionMutations = `#graphql
createConnection(Connection: ConnectionInput!): MutationResult
`

export const ConnectionsSchema = stitchSchema(ConnectionSchema)
