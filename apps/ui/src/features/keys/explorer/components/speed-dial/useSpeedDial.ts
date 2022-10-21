import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useInvalidateAllKeys } from '@_ui/utils/cache'
import { Routes } from '@_ui/router/routes'

export const useSpeedDial = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
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
    navigate(Routes.CreateKey)
  }, [navigate])

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
