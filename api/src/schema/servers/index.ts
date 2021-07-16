import { stitchSchema } from '@/utils'

const ServerSchema = `#graphql
  type Server {
    name: String!
    id: String!
    host: String!
    port: Int!
  }
  input ServerInput {
    name: String!
    id: String!
    host: String!
    port: Int!
  }
`

export const ServerQueries = `#graphql
server(id: Int!): Server
servers(limit: Int, startPosition: Int): [Server]
`

export const ServerMutations = `#graphql
createServer(server: ServerInput!): MutationResult
`

export const ServersSchema = stitchSchema(ServerSchema)
