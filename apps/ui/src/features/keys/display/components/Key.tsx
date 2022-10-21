import { FC } from 'react'
import { ClientError } from 'graphql-request'

import { Key } from '@_ui-types'
import { Controls, KeyDisplay, KeyMetadata } from '.'
import { useEditKeys } from '../api'
import '@_ui/styles/theme.css'

export const KeyData: FC<Props> = ({ keyId, targetKey, refetchKey, keyFetchError }) => {
  const {
    editedTtlBind,
    editedValueBind,
    handleIsEditingChange,
    handleShouldViewAsJsonChange,
    handleSaveKey,
    shouldViewAsJson,
    isEditing,
    isSetLoading,
    EditSnackbar
  } = useEditKeys(targetKey, refetchKey, keyId, keyFetchError)

  return keyId ? (
    <>
      <KeyMetadata keyId={keyId} {...(targetKey || {})} isEditing={isEditing} bind={editedTtlBind} />
      <Controls
        handleIsEditingChange={handleIsEditingChange}
        handleShouldViewAsJsonChange={handleShouldViewAsJsonChange}
        isEditing={isEditing}
        shouldViewAsJson={shouldViewAsJson}
        keyFetchError={keyFetchError}
      />
      <KeyDisplay
        targetKey={targetKey}
        isEditing={isEditing}
        shouldViewAsJson={shouldViewAsJson}
        keyFetchError={keyFetchError}
        isSetLoading={isSetLoading}
        handleSaveKey={handleSaveKey}
        editedValueBind={editedValueBind}
      />
      {EditSnackbar}
    </>
  ) : (
    <h1>Choose a key in the explorer</h1>
  )
}

interface Props {
  targetKey: Pick<Key, 'value' | 'type' | 'ttl'> | undefined
  keyId?: string
  refetchKey: () => void
  keyFetchError: ClientError | null
}
