import { useCallback, ChangeEvent, FormEvent, useState } from 'react'
import { ClientError } from 'graphql-request'

import { useSendCliCommandMutation, useTestActiveConnectionQuery } from 'generated'
import { useUpdateSettings } from 'utils/settings'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  previousOutputKey,
  previousCommandsKey,
  pushToLocalStorageArray
} from 'utils/local-storage'

const previousCommandsFromLS = getItemFromLocalStorage<string[]>(previousCommandsKey) || []

export const useCli = () => {
  const [previousCommands, setPreviousCommands] = useState(previousCommandsFromLS)
  const [command, setCommand] = useState('')
  const handleChangeCommand = useCallback((newCommand: string) => {
    setCommand(newCommand)
  }, [])
  const resetCommand = useCallback(() => {
    setCommand('')
  }, [])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { settings, updateSettings, isUpdateSettingsError } = useUpdateSettings()
  const { data: isConnectedData, isError: isConnectedError } = useTestActiveConnectionQuery()

  const isConnected = !!isConnectedData && !isConnectedError
  const willSaveCliOutput = settings?.willSaveCliOutput

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

  return {
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
  }
}
