import { useState, useCallback } from 'react'

import { useRemoveConnectionMutation } from '@_ui-types'
import { useInvalidateAllKeys } from '@_ui/utils'

export const useRemoveConnection = (id: string) => {
  const invalidateAllKeys = useInvalidateAllKeys()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { mutate, ...mutation } = useRemoveConnectionMutation({
    onSuccess() {
      invalidateAllKeys()
      setIsSnackbarOpen(true)
    }
  })

  const handleRemove = useCallback(async () => {
    mutate({ id: id as string })
  }, [mutate, id])

  return {
    ...mutation,
    handleRemove,
    isSnackbarOpen,
    setIsSnackbarOpen
  }
}
