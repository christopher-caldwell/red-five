import { FC } from 'react'
import { ClientError } from 'graphql-request'
import { TextField, styled } from '@mui/material'
import { JsonViewer } from '@textea/json-viewer'

import { UseInputBind } from '@_ui/hooks'
import { FlexContainer, Button } from '@_ui/components'
import { KeyQuery } from '@_ui-types'

export const KeyDisplay: FC<Props> = ({
  shouldViewAsJson,
  isEditing,
  keyFetchError,
  editedValueBind,
  handleSaveKey,
  isSetLoading,
  targetKey
}) => {
  return shouldViewAsJson ? (
    <HighlightContainer>
      <JsonViewer
        maxDisplayLength={15}
        // TODO: Make this a user setting
        groupArraysAfterLength={5}
        value={getParsedJson(targetKey?.value)}
        theme='dark'
        style={{ backgroundColor: 'transparent' }}
      />
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
  )
}

const HighlightContainer = styled('div')`
  width: 100%;
  max-height: 55vh;
  overflow: scroll;
  padding-top: 2%;
`

const getParsedJson = (stringified?: string) => {
  try {
    return JSON.parse(stringified || '')
  } catch (e) {
    return 'Error parsing JSON'
  }
}

interface Props {
  shouldViewAsJson: boolean
  isEditing: boolean
  keyFetchError: ClientError | null
  editedValueBind: UseInputBind
  handleSaveKey: () => Promise<void>
  isSetLoading: boolean
  targetKey: KeyQuery['key'] | undefined
}
