import NodeCache from 'node-cache'

const stdTTL = 30 // 30s
export const Cache = new NodeCache({
  stdTTL,
  useClones: false
})

export const setToInMemoryCache = <Payload>(key: string, payload?: Payload, ttl: number = stdTTL): void => {
  Cache.set(key, JSON.stringify(payload), ttl)
}

export const getFromInMemoryCache = <ReturnType>(key: string): ReturnType | undefined => {
  const stringifiedItems = Cache.get<string>(key)
  return stringifiedItems ? JSON.parse(stringifiedItems) : undefined
}

export const invalidateCache = async (key: string): Promise<void> => {
  Cache.del(key)
}


export * from './keys'
