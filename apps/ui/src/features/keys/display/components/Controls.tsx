import { FC } from 'react'
import { SwitchProps, styled, FormControlLabel, Switch } from '@mui/material'
import { ClientError } from 'graphql-request'

export const Controls: FC<Props> = ({
  shouldViewAsJson,
  handleIsEditingChange,
  keyFetchError,
  handleShouldViewAsJsonChange,
  isEditing
}) => {
  return (
    <>
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
    </>
  )
}

interface Props {
  handleShouldViewAsJsonChange: SwitchProps['onChange']
  keyFetchError: ClientError | null
  isEditing: boolean
  handleIsEditingChange: SwitchProps['onChange']
  shouldViewAsJson: boolean
}

export const ViewAsJsonFormControl = styled(FormControlLabel)`
  width: 100%;
  padding-top: 2%;
`
