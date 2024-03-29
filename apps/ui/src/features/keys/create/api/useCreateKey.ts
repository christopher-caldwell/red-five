import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { useSetKeyMutation, useNamespacedKeysQuery } from '@_ui-types'
import { useInput } from '@_ui/hooks'
import { activeKeyAtom } from '@_ui/store'
import { keyActionConfirmation } from '@_ui/utils/routing'

const namespacedKey = useNamespacedKeysQuery.getKey({})

export const useCreateKey = () => {
  const setActiveKey = useSetRecoilState(activeKeyAtom)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [keyName, keyNameBind] = useInput('')
  const [keyTtl, keyTtlBind] = useInput('')
  const [keyValue, keyValueBind] = useInput('')
  const { mutateAsync, isLoading, isError } = useSetKeyMutation({
    onSuccess() {
      queryClient.invalidateQueries(namespacedKey)
      setActiveKey(keyName)
      navigate(keyActionConfirmation)
    }
  })
  const handleSaveKey = useCallback(async () => {
    await mutateAsync({ entry: { key: keyName, ttl: Number(keyTtl), type: 'string', value: keyValue } })
  }, [keyName, keyTtl, keyValue, mutateAsync])
  return {
    handleSaveKey,
    keyValueBind,
    keyNameBind,
    keyTtlBind,
    isLoading,
    isError
  }
}
