import { useState, ChangeEvent, useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import {
  useKeyQuery,
  useSetKeyMutation,
  useConnectionsQuery,
  useNamespacedKeysQuery,
  useActiveConnectionQuery
} from 'generated'
import { activeKeyAtom } from 'store'
import { useInput } from 'hooks'

const connectionsKey = useConnectionsQuery.getKey()
const namespacedKeys = useNamespacedKeysQuery.getKey()
const activeConnectionKey = useActiveConnectionQuery.getKey()

export const useEditKeys = () => {
  const queryClient = useQueryClient()
  const keyId = useRecoilValue(activeKeyAtom)
  const [shouldViewAsJson, setShouldViewAsJson] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data, isLoading, isError, refetch } = useKeyQuery(
    {
      id: keyId || ''
    },
    {
      enabled: !!keyId
    }
  )

  const { mutateAsync: setKey, isLoading: isSetLoading } = useSetKeyMutation({
    onSuccess() {
      refetch()
      queryClient.invalidateQueries(connectionsKey)
      queryClient.invalidateQueries(namespacedKeys)
      queryClient.invalidateQueries(activeConnectionKey)
    }
  })

  const key = data?.key
  const [editedTtl, editedTtlBind, { setValue: setEditedTtl }] = useInput('')
  const [editedValue, editedValueBind, { setValue: setEditedValue }] = useInput('')

  useEffect(() => {
    if (!key) return
    setEditedTtl(key.ttl?.toString() || '')
  }, [key, setEditedTtl])

  useEffect(() => {
    if (!key) return
    setEditedValue(key.value?.toString() || '')
  }, [key, setEditedValue])

  const handleShouldViewAsJsonChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setShouldViewAsJson(event.target.checked)
  }, [])
  const handleIsEditingChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked)
  }, [])
  const handleSaveKey = useCallback(async () => {
    if (!keyId) return
    await setKey({ entry: { key: keyId, value: editedValue, ttl: Number(editedTtl), type: 'string' } })
  }, [setKey, keyId, editedTtl, editedValue])

  return {
    key,
    keyId,
    editedTtl,
    editedTtlBind,
    editedValueBind,
    handleIsEditingChange,
    handleShouldViewAsJsonChange,
    handleSaveKey,
    shouldViewAsJson,
    isEditing,
    isLoading,
    isError,
    isSetLoading
  }
}
