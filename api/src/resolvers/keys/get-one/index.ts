import { Resolver, Key } from '@/interfaces'
import { getActiveConnection } from '@/connections'

export const key: Resolver<Key, GetOneKeyArgs> = async ({ id }, { Client }) => {
  const redis = getActiveConnection(Client)
  const keyType = await redis.type(id)
  const commandToSend = allowableKeyTypes[keyType]
  if (!commandToSend) throw new Error('Unsupported key type')
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

const allowableKeyTypes: Record<string, string> = {
  string: 'get'
  // TODO: support these keys
  // hash: 'hgetall',
  // lists: 'lrange',
  // sets: 'smembers',
  // zset: 'zrangebyscore'
}

export interface GetOneKeyArgs {
  id: string
}
