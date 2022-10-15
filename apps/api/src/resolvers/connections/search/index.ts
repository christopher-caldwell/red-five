import { JsonDB } from 'node-json-db'

import { Resolver } from '@_api/interfaces'
import { Connection } from '@_api-types'
import { createIfNotExists } from '@_api/db'

export const connections: Resolver<Connection[], SearchConnectionArgs> = async (
  { startPosition = 0, limit },
  { Client }
) => {
  const rawConnections = Client.getObject<Connection[]>(`/connections`)
  const connections = mapActiveStatusOnConnections(rawConnections, Client)
  if (limit) return connections.slice(startPosition, startPosition + limit)
  return connections
}

const mapActiveStatusOnConnections = (connections: Connection[], Client: JsonDB): Connection[] => {
  const mutableConnections = [...connections]
  const activeConnectionId = createIfNotExists(Client, '/activeConnection', '')
  mutableConnections.forEach((connection, index) => {
    mutableConnections[index].isActive = connection.id === activeConnectionId
  })
  return mutableConnections
}

export interface SearchConnectionArgs {
  limit?: number
  startPosition?: number
}
