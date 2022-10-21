import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const useInvalidateAllKeys = () => {
  const queryClient = useQueryClient()

  const invalidateKeys = useCallback(() => {
    queryClient.invalidateQueries()
  }, [queryClient])

  return invalidateKeys
}
