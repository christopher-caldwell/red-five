import { buildSchema } from 'graphql'

import { stitchSchema } from '@/utils'
import { MutationResultSchema } from './shared'
import { ConnectionMutations, ConnectionQueries, ConnectionsSchema } from './connections'
import { KeyMutations, KeyQueries, KeysSchema } from './keys'
import { SettingsMutations, SettingsQueries, FinalSettingsSchema } from './settings'
import { CliMutations, CliSchema } from './cli'

const schemas = stitchSchema(ConnectionsSchema, KeysSchema, FinalSettingsSchema, CliSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(ConnectionQueries, KeyQueries, SettingsQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ConnectionMutations, KeyMutations, SettingsMutations, CliMutations)}
  }
`

export const schema = buildSchema(stitchSchema(schemas, queries, mutations))

export * from '../resolvers'
