import { JsonDB } from 'node-json-db'
import { serializeError } from 'serialize-error'
import { Redis } from 'ioredis'

import { Connection } from '@_api/interfaces'
import { connections } from '@_api/connections'

export const findById = <TData>(Client: JsonDB, id: string, searchPath: string, key = 'id'): TData => {
  const index = Client.getIndex(searchPath, id, key)
  if (index < 0) throw new Error('Not found')
  const item = Client.getObject<TData>(`${searchPath}[${index}]`)
  return item
}

/** Searches the db for a value. If the value is not found,
 * but the search operation was technically successful,
 * write the default as the searched */
export const createIfNotExists = <TData>(Client: JsonDB, searchPath: string, defaultValue: TData): TData => {
  try {
    const item = Client.getObject<TData>(searchPath)
    return item
  } catch (error) {
    const serializedError = serializeError(error)
    if (serializedError.name !== 'DataError') {
      console.log('true', serializeError.name)
      throw serializedError
    }
  }
  Client.push(searchPath, defaultValue)
  return defaultValue
}

/** Returns the configuration for the active connection, not the actual Redis connection itself */
export const getActiveConnectionConfig = (Client: JsonDB): Connection | undefined => {
  const activeConnectionId = Client.getObject<string>('/activeConnection')
  if (!activeConnectionId) return
  return findById(Client, activeConnectionId, '/connections')
}

export const getActiveConnection = (Client: JsonDB): Redis | undefined => {
  const activeConnectionConfig = getActiveConnectionConfig(Client)
  if (!activeConnectionConfig) return
  return connections[activeConnectionConfig.id]
}
