import { stitchSchema } from '@_api/utils'

const ConnectionSchema = `#graphql
  type Connection {
    name: String!
    id: String!
    host: String!
    port: Int!
    protocol: String!
    password: String
    isActive: Boolean!
  }
  input ConnectionInput {
    name: String!
    host: String!
    port: Int!
    protocol: String!
    password: String
  }
  type ConnectionTestResponse {
    connected: Boolean!
  }
`

export const ConnectionQueries = `#graphql
activeConnection: Connection
connection(id: String!): Connection!
connections(limit: Int, startPosition: Int): [Connection!]!
testActiveConnection: ConnectionTestResponse!
`

export const ConnectionMutations = `#graphql
createConnection(connection: ConnectionInput!, makeActive: Boolean): MutationResult
removeConnection(id: String!): MutationResult
makeConnectionActive(id: String): MutationResult
`

export const ConnectionsSchema = stitchSchema(ConnectionSchema)
