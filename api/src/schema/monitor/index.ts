import { stitchSchema } from '@/utils'

const MonitorSchema = `#graphql
  type MonitoringStatus {
    isMonitoring: Boolean!
    activeConnectionId: String!
  }
  type MonitoringMessage {
    time: Float!
    args: [String!]!
    source: String!
    database: String!
  }
`

export const MonitorQueries = `#graphql
monitoringStatus: MonitoringStatus
`

export const MonitorMutations = `#graphql
toggleMonitoring(isMonitoring: Boolean!): MutationResult
`

export const MonitorSubscriptions = `#graphql
monitorMessage: MonitoringMessage!
`

export const FinalMonitorSchema = stitchSchema(MonitorSchema)
