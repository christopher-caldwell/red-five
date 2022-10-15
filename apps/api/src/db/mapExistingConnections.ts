import Redis, { Redis as IRedis } from 'ioredis'
import adze from 'adze'

import { AppConfig, MonitoringStatus } from '@_api/interfaces'
import { connections, monitoredConnections } from '@_api/connections'
import { maxRetriesToConnect } from '@_api/constants'

const logger = adze().label('mapExistingConnections')
export const mapExistingConnections = ({ connections: existingConnections }: AppConfig): void => {
  existingConnections.forEach(({ id, host, port, password }) => {
    connections[id] = new Redis({
      host,
      password: password || undefined,
      port,
      retryStrategy: times => {
        const canRetry = times <= maxRetriesToConnect
        if (canRetry) return 1
        logger.error(`Attempted to connect to ${host} ${maxRetriesToConnect} times unsuccessfully.`)
        return null
      }
    })
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
