import { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

import { useSetKeyMutation, useConnectionsQuery, useNamespacedKeysQuery, KeyQuery } from '@_ui-types'
import { Snackbar } from '@_ui/components'
import { useInput } from '@_ui/hooks'

const connectionsKey = useConnectionsQuery.getKey()
const namespacedKeys = useNamespacedKeysQuery.getKey({})

export const useEditKeys = (
  key: KeyQuery['key'] | undefined,
  refetchKey: () => void,
  keyId?: string,
  keyFetchError?: Error | null
) => {
  const queryClient = useQueryClient()
  const [shouldViewAsJson, setShouldViewAsJson] = useState(false)
  const [isSnackbarShown, setIsSnackbarShown] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    mutateAsync: setKey,
    isLoading: isSetLoading,
    error: isEditError
  } = useSetKeyMutation<ClientError>({
    onSuccess() {
      refetchKey()
      setIsSnackbarShown(true)
      queryClient.invalidateQueries(connectionsKey)
      queryClient.invalidateQueries(namespacedKeys)
    }
  })
  const [editedTtl, editedTtlBind, { setValue: setEditedTtl, resetValue: resetEditedTtl }] = useInput('')
  const [editedValue, editedValueBind, { setValue: setEditedValue, resetValue: resetEditedValue }] = useInput('')

  useEffect(() => {
    if (keyId) return
    resetEditedTtl()
    resetEditedValue()
  }, [keyId, resetEditedValue, resetEditedTtl])

  useEffect(() => {
    if (keyFetchError) resetEditedValue()
  }, [keyFetchError, resetEditedValue])

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

  const EditSnackbar = useMemo(
    () => (
      <Snackbar
        severity={isEditError ? 'error' : 'success'}
        message={isEditError ? 'Something went wrong' : 'Done'}
        setIsOpen={setIsSnackbarShown}
        isOpen={isSnackbarShown}
      />
    ),
    [isSnackbarShown, setIsSnackbarShown, isEditError]
  )

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
    isSetLoading,
    EditSnackbar
  }
}
