import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useInvalidateAllKeys } from '@_ui/utils/cache'
import { Routes } from '@_ui/router/routes'

export const useSpeedDial = () => {
  const [open, setOpen] = useState(false)
  const { push } = useHistory()
  const invalidateAllKeys = useInvalidateAllKeys()

  const handleClose = useCallback(
    (invalidateKeys?: boolean) => async () => {
      if (invalidateKeys) {
        invalidateAllKeys()
      }
      setOpen(false)
    },
    [invalidateAllKeys]
  )

  const handleGoToAdd = useCallback(() => {
    push(Routes.CreateKey)
  }, [push])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  return {
    open,
    handleClose,
    handleOpen,
    handleGoToAdd
  }
}
