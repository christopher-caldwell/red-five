import { JsonDB } from 'node-json-db'
import { serializeError } from 'serialize-error'

import { Connection } from '@/interfaces'
import { connections } from '@/connections'
import { Redis } from 'ioredis'

export const findById = <TData>(Client: JsonDB, id: string, searchPath: string, key: string = 'id'): TData => {
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
  //@ts-ignore
  const index = Client.getIndex('/connections', true, 'isActive')
  if (index < 0) return
  return Client.getObject<Connection>(`/connections[${index}]`)
}

export const getActiveConnection = (Client: JsonDB): Redis | undefined => {
  const activeConnectionConfig = getActiveConnectionConfig(Client)
  if (!activeConnectionConfig) return
  return connections[activeConnectionConfig.id]
}
