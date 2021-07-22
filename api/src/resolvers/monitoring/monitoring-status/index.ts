import { getActiveConnectionConfig, createIfNotExists } from '@/db'
import { Resolver, MonitoringStatus } from '@/interfaces'

export const monitoringStatus: Resolver<MonitoringStatus> = async ({}, { Client }) => {
  const connection = getActiveConnectionConfig(Client)
  if (!connection) throw new Error('No active connection')
  return createIfNotExists<MonitoringStatus>(Client, '/isMonitoring', {
    isMonitoring: false,
    activeConnectionId: connection.id
  })
}
