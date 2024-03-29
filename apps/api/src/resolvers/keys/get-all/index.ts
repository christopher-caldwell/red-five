import asyncPool from 'tiny-async-pool'

import type { Key } from '@_ui-types'
import { Resolver } from '@_api/interfaces'
import { getActiveConnection } from '@_api/connections'

const concurrencyLimit = 10
export const keys: Resolver<Key[]> = async (_, { Client }) => {
  const redis = getActiveConnection(Client)
  const keys = await redis.keys('*')
  if (keys.length === 0) return []
  const values = await redis.mget(keys)

  const ttlFetcher = (key: string) => redis.ttl(key)
  const ttls = await asyncPool(concurrencyLimit, keys, ttlFetcher)

  const storedKeys: Key[] = keys.map((key, index) => {
    return {
      key,
      value: values[index] || '-',
      ttl: ttls[index],
      type: 'string'
    }
  })

  return storedKeys
}
