import { Resolver } from '@_api/interfaces'
import { ConnectionTestResponse } from '@_api-types'
import { getActiveConnection } from '@_api/connections'

export const testActiveConnection: Resolver<ConnectionTestResponse> = async (_, { Client }) => {
  const redis = getActiveConnection(Client)
  const response = await redis.ping()
  return {
    connected: !!response
  }
}
