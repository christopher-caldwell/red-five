import { FC } from 'react'
import { Alert } from '@material-ui/lab'
import { LinearProgress, Switch, TextField } from '@material-ui/core'
import Highlight from 'react-highlight.js'
import stringify from 'json-stringify-pretty-compact'

import { FlexContainer, Button } from 'components/shared'
import KeyMeta from './Meta'
import { ViewAsJsonFormControl, HighlightContainer } from './elements'
import 'styles/theme.css'
import { useEditKeys } from './useEditKeys'

const Display: FC<Props> = ({ width }) => {
  const {
    key,
    keyId,
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
  } = useEditKeys()

  return (
    <FlexContainer padding='1%' width={`calc(100% - ${width}px)`} justify='flex-start' direction='column'>
      {isLoading ? <LinearProgress variant='indeterminate' /> : null}
      {isError ? <Alert severity='error' /> : null}
      <KeyMeta keyId={keyId} {...(key || {})} isEditing={isEditing} bind={editedTtlBind} />
      <ViewAsJsonFormControl
        control={<Switch checked={shouldViewAsJson} onChange={handleShouldViewAsJsonChange} color='primary' />}
        label='View as parsed JSON'
      />
      <ViewAsJsonFormControl
        control={
          <Switch checked={isEditing} onChange={handleIsEditingChange} color='primary' disabled={shouldViewAsJson} />
        }
        label='Edit'
      />
      {shouldViewAsJson ? (
        <HighlightContainer>
          <Highlight language='json'>{stringify(JSON.parse(key?.value || ''))}</Highlight>
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
            disabled={!isEditing}
          />
          <FlexContainer justify='flex-end' width='100%' padding='2% 0 0 0'>
            {isEditing ? <Button onClick={handleSaveKey} text='Save' isLoading={isSetLoading} /> : null}
          </FlexContainer>
        </>
      )}
    </FlexContainer>
  )
}

interface Props {
  width: number
}

export default Display
