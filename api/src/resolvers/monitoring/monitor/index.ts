import { SubscriptionResolver, MonitoringMessage } from '@/interfaces'
import { monitoredConnections } from '@/connections'
import { getActiveConnectionConfig } from '@/db'

let resolve: () => void
let promise = new Promise<void>(r => (resolve = r))
export const monitorMessage: SubscriptionResolver<{ monitorMessage: MonitoringMessage }> = async function* (
  {},
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
    console.log({ time, args, source, database })
    messages.push({ time: Number(time) * 1000, args, source, database })
    resolve()
    promise = new Promise(r => (resolve = r))
  })
  monitoredInstance.on('done', () => {
    console.log('done')
    done = true
  })
  monitoredInstance.on('end', () => {
    console.log('done')
    done = true
  })
  while (!done) {
    await promise
    yield { monitorMessage: messages[0] }
    messages = []
  }
}
