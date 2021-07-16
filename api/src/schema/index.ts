import { stitchSchema } from '../utils'

import { MutationResultSchema } from './shared'
import { ServerMutations, ServerQueries, ServersSchema } from './servers'

const schemas = stitchSchema(ServersSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(ServerQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ServerMutations)}
  }
`

export const schema = stitchSchema(schemas, queries, mutations)

export * from '../resolvers'
