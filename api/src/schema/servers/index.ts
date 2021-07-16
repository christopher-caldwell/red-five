import { stitchSchema } from '@/utils'

const ServerSchema = `#graphql
  type Server {
    name: String!
    id: String!
    title: String!
    startDate: String!
    endDate: String
    department: String!
  }
`

export const ServerQueries = `#graphql
server(id: Int!): Server
servers(limit: Int, startPosition: Int): [Server]
`

export const ServerMutations = `#graphql
createServer(emailAddress: String!, phone: String, firstName: String, lastName: String, password: String!): Server
`

export const ServersSchema = stitchSchema(ServerSchema)
