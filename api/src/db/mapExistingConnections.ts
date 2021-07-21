import Redis, { Redis as IRedis } from 'ioredis'

import { AppConfig, MonitoringStatus } from '@/interfaces'
import { connections, monitoredConnections } from '@/connections'

export const mapExistingConnections = ({ connections: existingConnections }: AppConfig): void => {
  existingConnections.map(({ id, host, port, password }) => {
    connections[id] = new Redis({ host, password: password || undefined, port })
  })
}

export const mapExistingMonitoredConnection = async ({
  activeConnectionId,
  isMonitoring
}: MonitoringStatus): Promise<void> => {
  if (!isMonitoring) return
  const activeConnection = connections[activeConnectionId]
  if (!activeConnection) throw new Error('Cannot find active connection')
  monitoredConnections[activeConnectionId] = (await activeConnection.monitor()) as unknown as IRedis
}
