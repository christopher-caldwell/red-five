import { getActiveConnectionConfig } from '@/db'
import { Resolver, MonitoringStatus } from '@/interfaces'

export const monitoringStatus: Resolver<MonitoringStatus> = async ({}, { Client }) => {
  const connection = getActiveConnectionConfig(Client)
  if (!connection) throw new Error('No active connection')
  return Client.getObject<MonitoringStatus>('/isMonitoring')
}
