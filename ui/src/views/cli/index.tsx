import { FC, useCallback, ChangeEvent, FormEvent, useState } from 'react'
import { InputAdornment, Switch, FormControlLabel, LinearProgress } from '@material-ui/core'
import { ClientError } from 'graphql-request'
import ChevronRight from '@material-ui/icons/ChevronRight'
import 'react-inline-suggest/dist/react-inline-suggest.css'

import { useSendCliCommandMutation, useTestActiveConnectionQuery } from 'generated'
import CLIWindow from 'components/cli'
import { FlexContainer, Snackbar } from 'components/shared'
import Status from 'components/cli/status'
import { useUpdateSettings } from 'utils/settings'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  previousOutputKey,
  previousCommandsKey,
  pushToLocalStorageArray
} from 'utils/local-storage'
import { Container, CommandPrompt } from './elements'

const previousCommandsFromLS = getItemFromLocalStorage<string[]>(previousCommandsKey) || []

const Cli: FC = () => {
  const [previousCommands, setPreviousCommands] = useState(previousCommandsFromLS)
  const [command, setCommand] = useState('')
  const handleChangeCommand = useCallback((newCommand: string) => {
    setCommand(newCommand)
  }, [])
  const resetCommand = useCallback(() => {
    setCommand('')
  }, [])
  const [iseSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { settings, updateSettings, isUpdateSettingsError } = useUpdateSettings()
  const { data: isConnectedData, isError: isConnectedError } = useTestActiveConnectionQuery()
  const isConnected = !!isConnectedData && !isConnectedError
  const { willSaveCliOutput = false } = settings || {}

  const saveCliOutputHandler = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings('willSaveCliOutput', event.target.checked)
      if (!isUpdateSettingsError && !event.target.checked) removeItemFromLocalStorage(previousOutputKey)
    },
    [updateSettings, isUpdateSettingsError]
  )

  const { isLoading, data, error, mutate } = useSendCliCommandMutation<ClientError>({
    onError() {
      setIsSnackbarOpen(true)
    }
  })
  const response = data?.sendCliCommand

  const sendCommand = useCallback(
    async (event: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
      event.preventDefault()
      pushToLocalStorageArray(previousCommandsKey, command, true)
      setPreviousCommands(currentCommands => [...currentCommands, command])
      mutate({ command })
      if (!error) resetCommand()
    },
    [mutate, command, resetCommand, error]
  )

  return (
    <>
      <Container>
        <FlexContainer justify='space-between'>
          <Status isConnected={isConnected} />
          <FormControlLabel
            control={<Switch checked={willSaveCliOutput} onChange={saveCliOutputHandler} color='primary' />}
            label='Save CLI output to local storage'
          />
        </FlexContainer>
        {isLoading ? <LinearProgress variant='indeterminate' /> : null}
        <CLIWindow response={response} />
        <form onSubmit={sendCommand}>
          <CommandPrompt
            onInputChange={handleChangeCommand}
            suggestions={previousCommands}
            textFieldProps={{
              variant: 'outlined',
              margin: 'normal',
              fullWidth: true,
              InputProps: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <ChevronRight />
                  </InputAdornment>
                )
              }
            }}
          />

          <button type='submit' hidden={true} onSubmit={sendCommand} />
        </form>
      </Container>
      <Snackbar
        message={error?.message || ''}
        severity='error'
        isOpen={iseSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        autoHideDuration={10000}
      />
    </>
  )
}

export default Cli
