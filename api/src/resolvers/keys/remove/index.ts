import { Resolver, MutationResult } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const removeKey: Resolver<MutationResult, RemoveKeyArgs> = async ({ key }, { Client }) => {
  const redis = getActiveConnection(Client)
  await redis.del(key)
  return {
    status: 200,
    message: 'Done'
  }
}

export interface RemoveKeyArgs {
  key: string
}
