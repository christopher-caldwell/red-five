import { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'

import { activeKeyAtom } from 'store'
import { useRemoveKeyMutation, useSettingsQuery } from 'generated'
import { useInvalidateAllKeys } from 'utils/cache'
import { keyActionConfirmation } from 'utils/routing'
import DeletePromptDialog from './DeletePrompt'

export const useRemoveKey = (key?: string) => {
  const [open, setOpen] = useState(false)
  const resetActiveKey = useResetRecoilState(activeKeyAtom)
  const { push } = useHistory()
  const invalidateAllKeys = useInvalidateAllKeys()
  const { mutateAsync, isLoading, isError } = useRemoveKeyMutation({
    onSuccess() {
      invalidateAllKeys()
      resetActiveKey()
      push(keyActionConfirmation)
    }
  })

  const { data } = useSettingsQuery()
  const settings = data?.settings

  const removeKey = useCallback(async () => {
    if (!key) return
    await mutateAsync({ key })
  }, [mutateAsync, key])

  const openRemoveDialogOrRemoveKey = useCallback(async () => {
    if (!settings?.willPromptBeforeDelete) {
      setOpen(true)
      return
    }
    await removeKey()
  }, [removeKey, settings])

  const DeletePrompt = useMemo(
    () => <DeletePromptDialog setOpen={setOpen} open={open} removeKey={removeKey} />,
    [removeKey, open]
  )

  return {
    openRemoveDialogOrRemoveKey,
    isRemoveKeyLoading: isLoading,
    isError,
    DeletePrompt
  }
}
