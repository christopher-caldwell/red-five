import { buildSchema } from 'graphql'

import { stitchSchema } from '@/utils'
import { MutationResultSchema } from './shared'
import { ConnectionMutations, ConnectionQueries, ConnectionsSchema } from './connections'
import { KeyMutations, KeyQueries, KeysSchema } from './keys'
import { SettingsMutations, SettingsQueries, FinalSettingsSchema } from './settings'

const schemas = stitchSchema(ConnectionsSchema, KeysSchema, FinalSettingsSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(ConnectionQueries, KeyQueries, SettingsQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ConnectionMutations, KeyMutations, SettingsMutations)}
  }
`

export const schema = buildSchema(stitchSchema(schemas, queries, mutations))

export * from '../resolvers'
