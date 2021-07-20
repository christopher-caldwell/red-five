import { Resolver, Key } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const key: Resolver<Key, GetOneKeyArgs> = async ({ id }, { Client }) => {
  const redis = getActiveConnection(Client)
  const potentialKey = await redis.get(id)
  if (!potentialKey) throw new Error('Key not found')
  const ttl = await redis.ttl(id)
  return {
    key: id,
    ttl,
    type: 'string',
    value: potentialKey
  }
}

export interface GetOneKeyArgs {
  id: string
}
