import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { useConnectionsQuery, useNamespacedKeysQuery } from 'generated'

const connectionsKey = useConnectionsQuery.getKey()
const namespacedKeys = useNamespacedKeysQuery.getKey()

export const useInvalidateAllKeys = () => {
  const queryClient = useQueryClient()

  const invalidateKeys = useCallback(() => {
    queryClient.invalidateQueries(connectionsKey)
    queryClient.invalidateQueries(namespacedKeys)
    queryClient.invalidateQueries('key')
  }, [queryClient])

  return invalidateKeys
}
