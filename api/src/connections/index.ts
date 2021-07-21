import { Redis } from 'ioredis'
import { JsonDB } from 'node-json-db'

import { getActiveConnectionConfig } from '@/db'

export const connections: Record<string, Redis> = {}
export const monitoredConnections: Record<string, Redis> = {}

export const getActiveConnection = (Client: JsonDB): Redis => {
  const activeConnectionConfig = getActiveConnectionConfig(Client)
  if (!activeConnectionConfig) throw new Error('No active connection')
  const { id } = activeConnectionConfig
  const activeConnection = connections[id]
  if (!activeConnection) throw new Error(`Cannot find connection at ID ${id}`)
  return activeConnection
}
