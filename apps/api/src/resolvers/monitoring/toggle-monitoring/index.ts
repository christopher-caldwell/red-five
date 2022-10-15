import { Redis } from 'ioredis'

import { getActiveConnectionConfig, getActiveConnection } from '@_api/db'
import { Resolver } from '@_api/interfaces'
import { MutationResult, SettingsInput } from '@_api-types'
import { monitoredConnections } from '@_api/connections'

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
    else throw new Error('Cannot find connection to disconnect from')
  }
  return {
    status: 200
  }
}

export interface ToggleMonitoringArgs {
  isMonitoring: SettingsInput
}
