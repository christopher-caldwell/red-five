import { Resolver, ConnectionTestResponse } from '@_api/interfaces'
import { getActiveConnection } from '@_api/connections'

export const testActiveConnection: Resolver<ConnectionTestResponse> = async (_, { Client }) => {
  const redis = getActiveConnection(Client)
  const response = await redis.ping()
  return {
    connected: !!response
  }
}
