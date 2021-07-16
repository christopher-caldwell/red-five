import { Resolver, Connection } from '@/interfaces'

export const connections: Resolver<Connection[], SearchConnectionArgs> = async (
  { startPosition = 0, limit },
  { Client }
) => {
  const connections = Client.getObject<Connection[]>(`/connections`)
  if (limit) return connections.slice(startPosition, startPosition + limit)
  return connections
}

export interface SearchConnectionArgs {
  limit?: number
  startPosition?: number
}
