import { MonitoringMessage } from '@_api-types'
import { SubscriptionResolver } from '@_api/interfaces'
import { monitoredConnections } from '@_api/connections'
import { getActiveConnectionConfig } from '@_api/db'

let resolve: () => void
let promise = new Promise<void>(r => (resolve = r))
export const monitorMessage: SubscriptionResolver<{ monitorMessage: MonitoringMessage }> = async function* (
  _,
  { Client }
) {
  const activeConnectionConfig = getActiveConnectionConfig(Client)
  const connectionId = activeConnectionConfig?.id
  if (!connectionId) throw new Error('No active connection')
  const monitoredInstance = monitoredConnections[connectionId]
  if (!monitoredInstance) throw new Error('Not monitoring any connections')
  let messages: MonitoringMessage[] = []
  let done = false
  monitoredInstance.on('monitor', (time: string, args: string[], source: string, database: string) => {
    messages.push({ time: Number(time) * 1000, args, source, database })
    resolve()
    promise = new Promise(r => (resolve = r))
  })
  monitoredInstance.on('end', () => {
    console.log('end')
    done = true
  })
  while (!done) {
    await promise
    if (messages[0]) yield { monitorMessage: messages[0] }
    messages = []
  }
}
