import { FC } from 'react'
import { InputAdornment, Switch, FormControlLabel, LinearProgress } from '@mui/material'
import ChevronRight from '@mui/icons-material/ChevronRight'

import { CLIWindow, CliStatus } from '@_ui/features/cli'
import { FlexContainer, Snackbar } from '@_ui/components'
import { Container, CommandPrompt, LoadingContainer } from './elements'
import { useCli } from './useCli'

const Cli: FC = () => {
  const {
    sendCommand,
    response,
    isLoading,
    saveCliOutputHandler,
    willSaveCliOutput,
    isSnackbarOpen,
    setIsSnackbarOpen,
    isConnected,
    previousCommands,
    handleChangeCommand,
    error
  } = useCli()

  return (
    <>
      <Container>
        <FlexContainer justify='space-between'>
          <CliStatus isConnected={isConnected} />
          <FormControlLabel
            control={<Switch checked={willSaveCliOutput} onChange={saveCliOutputHandler} color='primary' />}
            label='Save CLI output to local storage'
          />
        </FlexContainer>
        <LoadingContainer>{isLoading ? <LinearProgress variant='indeterminate' /> : null}</LoadingContainer>
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
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        autoHideDuration={10000}
      />
    </>
  )
}

export default Cli
