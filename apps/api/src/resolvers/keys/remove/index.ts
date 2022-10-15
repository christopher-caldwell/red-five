import { MutationResult } from '@_api-types'
import { Resolver } from '@_api/interfaces'
import { getActiveConnection } from '@_api/connections'

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
