import { getActiveConnectionConfig, createIfNotExists } from '@_api/db'
import { Resolver, MonitoringStatus } from '@_api/interfaces'

export const monitoringStatus: Resolver<MonitoringStatus> = async (_, { Client }) => {
  const connection = getActiveConnectionConfig(Client)
  if (!connection) throw new Error('No active connection')
  return createIfNotExists<MonitoringStatus>(Client, '/isMonitoring', {
    isMonitoring: false,
    activeConnectionId: connection.id
  })
}
