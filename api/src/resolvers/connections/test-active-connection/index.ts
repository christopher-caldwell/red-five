import { Resolver, ConnectionTestResponse } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const testActiveConnection: Resolver<ConnectionTestResponse> = async ({}, { Client }) => {
  const redis = getActiveConnection(Client)
  const response = await redis.ping()
  return {
    connected: !!response
  }
}
