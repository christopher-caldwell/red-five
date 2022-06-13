import { FC } from 'react'
import { Switch, TextField } from '@mui/material'
import ReactJsonView from 'react-json-view'
import { ClientError } from 'graphql-request'

import { Key } from '@/generated'
import { FlexContainer, Button } from '@/components'
import KeyMeta from '../meta'
import { ViewAsJsonFormControl, HighlightContainer } from '../elements'
import { useEditKeys } from '../hooks'
import '@/styles/theme.css'

const KeyData: FC<Props> = ({ keyId, targetKey, refetchKey, keyFetchError }) => {
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

  const getParsedJson = () => {
    try {
      return JSON.parse(targetKey?.value || '')
    } catch (e) {
      return 'Error parsing JSON'
    }
  }

  return keyId ? (
    <>
      <KeyMeta keyId={keyId} {...(targetKey || {})} isEditing={isEditing} bind={editedTtlBind} />
      <ViewAsJsonFormControl
        control={
          <Switch
            checked={shouldViewAsJson}
            onChange={handleShouldViewAsJsonChange}
            color='primary'
            disabled={!!keyFetchError}
          />
        }
        label='View as parsed JSON'
      />
      <ViewAsJsonFormControl
        control={
          <Switch
            checked={isEditing}
            onChange={handleIsEditingChange}
            color='primary'
            disabled={!!keyFetchError || shouldViewAsJson}
          />
        }
        label='Edit'
      />
      {shouldViewAsJson ? (
        <HighlightContainer>
          <ReactJsonView src={getParsedJson()} theme='monokai' style={{ backgroundColor: 'transparent' }} />
        </HighlightContainer>
      ) : (
        <>
          <TextField
            multiline
            fullWidth
            {...editedValueBind}
            size='small'
            variant='outlined'
            margin='normal'
            disabled={!isEditing || !!keyFetchError}
          />
          <FlexContainer justify='flex-start' width='100%' padding='2% 0 0 0'>
            {isEditing ? <Button onClick={handleSaveKey} text='Save' isLoading={isSetLoading} /> : null}
          </FlexContainer>
        </>
      )}
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

export default KeyData
