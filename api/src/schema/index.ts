import { buildSchema } from 'graphql'

import { stitchSchema } from '@/utils'
import { MutationResultSchema } from './shared'
import { ConnectionMutations, ConnectionQueries, ConnectionsSchema } from './connections'
import { KeyMutations, KeyQueries, KeysSchema } from './keys'
import { SettingsMutations, SettingsQueries, FinalSettingsSchema } from './settings'
import { CliMutations, CliSchema } from './cli'
import { FinalMonitorSchema, MonitorMutations, MonitorSubscriptions } from './monitor'

const schemas = stitchSchema(
  ConnectionsSchema,
  KeysSchema,
  FinalSettingsSchema,
  CliSchema,
  MutationResultSchema,
  FinalMonitorSchema
)
const queries = `#graphql
  type Query {
    ${stitchSchema(ConnectionQueries, KeyQueries, SettingsQueries)}
  }
`

const mutations = `#graphql
  type Mutation {
    ${stitchSchema(ConnectionMutations, KeyMutations, SettingsMutations, CliMutations, MonitorMutations)}
  }
`

const subscriptions = `#graphql
  type Subscription {
    ${stitchSchema(MonitorSubscriptions)}
  }
`

export const schema = buildSchema(stitchSchema(schemas, queries, mutations, subscriptions))

export * from '../resolvers'
