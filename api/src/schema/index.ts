import { buildSchema } from 'graphql'

import { stitchSchema } from '@/utils'
import { MutationResultSchema } from './shared'
import { ConnectionMutations, ConnectionQueries, ConnectionsSchema } from './connections'
import { KeyMutations, KeyQueries, KeysSchema } from './keys'

const schemas = stitchSchema(ConnectionsSchema, KeysSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(ConnectionQueries, KeyQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ConnectionMutations, KeyMutations)}
  }
`

export const schema = buildSchema(stitchSchema(schemas, queries, mutations))

export * from '../resolvers'
