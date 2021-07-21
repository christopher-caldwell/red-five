import { getActiveConnectionConfig } from '@/db'
import { MutationResult, Resolver, SettingsInput } from '@/interfaces'

export const toggleMonitoring: Resolver<MutationResult, ToggleMonitoringArgs> = async (
  { isMonitoring },
  { Client }
) => {
  const activeConnection = getActiveConnectionConfig(Client)
  if (!activeConnection) throw new Error('No active connection')
  Client.push('/isMonitoring', { isMonitoring, activeConnectionId: activeConnection?.id })
  return {
    status: 200
  }
}

export interface ToggleMonitoringArgs {
  isMonitoring: SettingsInput
}
