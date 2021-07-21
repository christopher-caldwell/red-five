import { Redis } from 'ioredis'
import { getActiveConnectionConfig, getActiveConnection } from '@/db'
import { MutationResult, Resolver, SettingsInput } from '@/interfaces'
import { monitoredConnections } from '@/connections'

export const toggleMonitoring: Resolver<MutationResult, ToggleMonitoringArgs> = async (
  { isMonitoring },
  { Client }
) => {
  const activeConnectionConfig = getActiveConnectionConfig(Client)
  const activeConnectionId = activeConnectionConfig?.id
  const activeConnection = getActiveConnection(Client)
  if (!activeConnection || !activeConnectionId) throw new Error('No active connection')
  Client.push('/isMonitoring', { isMonitoring, activeConnectionId })
  if (isMonitoring) {
    /** The source is incorrectly typed as `EventEmitter`. [see issue](https://github.com/luin/ioredis/issues/956) */
    const monitored = (await activeConnection.monitor()) as unknown as Redis
    monitoredConnections[activeConnectionId] = monitored
  } else {
    const monitoredConnection = monitoredConnections[activeConnectionId]
    if (monitoredConnection) monitoredConnection.disconnect()
  }
  return {
    status: 200
  }
}

export interface ToggleMonitoringArgs {
  isMonitoring: SettingsInput
}
