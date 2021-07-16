import { buildSchema } from 'graphql'

import { stitchSchema } from '@/utils'
import { MutationResultSchema } from './shared'
import { ConnectionMutations, ConnectionQueries, ConnectionsSchema } from './connections'

const schemas = stitchSchema(ConnectionsSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(ConnectionQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ConnectionMutations)}
  }
`

export const schema = buildSchema(stitchSchema(schemas, queries, mutations))

export * from '../resolvers'
