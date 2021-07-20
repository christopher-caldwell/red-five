import { FC, useCallback, ChangeEvent } from 'react'
import { InputAdornment, Switch, FormControlLabel } from '@material-ui/core'
import ChevronRight from '@material-ui/icons/ChevronRight'

import CLIWindow from 'components/cli'
import { Container, Status, CommandPrompt } from './elements'
import { useUpdateSettings } from 'utils/settings'

const Cli: FC = () => {
  const { settings, updateSettings } = useUpdateSettings()

  const saveCliOutputHandler = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await updateSettings('willSaveCliOutput', event.target.checked)
    },
    [updateSettings]
  )

  const { willSaveCliOutput = false } = settings || {}

  console.log('willSaveCliOutput', settings?.willSaveCliOutput)

  return (
    <Container>
      <Status status='connected'>Connected</Status>
      <FormControlLabel
        control={<Switch checked={willSaveCliOutput} onChange={saveCliOutputHandler} color='primary' />}
        label='Save CLI output to local storage'
      />
      <CLIWindow />
      <CommandPrompt
        fullWidth={false}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <ChevronRight />
            </InputAdornment>
          )
        }}
      />
    </Container>
  )
}

export default Cli
