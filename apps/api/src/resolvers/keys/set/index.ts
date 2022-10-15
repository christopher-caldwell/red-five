import { Resolver } from '@_api/interfaces'
import type { Key, MutationResult } from '@_ui-types'
import { getActiveConnection } from '@_api/connections'

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
