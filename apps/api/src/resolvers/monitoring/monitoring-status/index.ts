import { getActiveConnectionConfig, createIfNotExists } from '@_api/db'
import { Resolver } from '@_api/interfaces'
import { MonitoringStatus } from '@_api-types'

export const monitoringStatus: Resolver<MonitoringStatus> = async (_, { Client }) => {
  const connection = getActiveConnectionConfig(Client)
  if (!connection) throw new Error('No active connection')
  return createIfNotExists<MonitoringStatus>(Client, '/isMonitoring', {
    isMonitoring: false,
    activeConnectionId: connection.id
  })
}
