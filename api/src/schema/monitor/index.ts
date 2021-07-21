import { stitchSchema } from '@/utils'

const MonitorSchema = `#graphql
  type MonitoringStatus {
    isMonitoring: Boolean!
    activeConnectionId: String!
  }
`

export const ConnectionQueries = `#graphql
monitoringStatus: MonitoringStatus
`

export const MonitorMutations = `#graphql
toggleMonitoring(isMonitoring: Boolean!): MutationResult
`

export const MonitorSubscriptions = `#graphql
monitor: String!
`

export const FinalMonitorSchema = stitchSchema(MonitorSchema)
