import { Resolver, Key, MutationResult } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const setKey: Resolver<MutationResult, CreateKeyArgs> = async ({ entry }, { Client }) => {
  const redis = getActiveConnection(Client)
  const { key, value, ttl } = entry
  await redis.set(key, value, 'ex', ttl)
  return {
    status: 200,
    message: 'Done'
  }
}

export interface CreateKeyArgs {
  entry: Key
}
