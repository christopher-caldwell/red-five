import { FC } from 'react'
import { Switch, TextField } from '@material-ui/core'
import Highlight from 'react-highlight.js'
import stringify from 'json-stringify-pretty-compact'
import '@/styles/theme.css'

import { Key } from '@/generated'
import { FlexContainer, Button } from '@/components/shared'
import KeyMeta from '../meta'
import { ViewAsJsonFormControl, HighlightContainer } from '../elements'
import { useEditKeys } from '../hooks'
import { ClientError } from 'graphql-request'

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

  const getStringifiedJson = () => {
    try {
      return stringify(JSON.parse(targetKey?.value || ''))
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
          <Highlight language='json'>{getStringifiedJson()}</Highlight>
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
          <FlexContainer justify='flex-end' width='100%' padding='2% 0 0 0'>
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
