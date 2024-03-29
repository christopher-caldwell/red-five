import { useCallback, ChangeEvent, FormEvent, useState } from 'react'
import { ClientError } from 'graphql-request'

import { useSendCliCommandMutation, useTestActiveConnectionQuery } from '@_ui-types'
import { useUpdateSettings } from '@_ui/utils/settings'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  previousOutputKey,
  previousCommandsKey,
  pushToLocalStorageArray
} from '@_ui/utils/local-storage'

const previousCommandsFromLS = getItemFromLocalStorage<string[]>(previousCommandsKey) || []

export const useCli = () => {
  const [previousCommands, setPreviousCommands] = useState(previousCommandsFromLS)
  const [command, setCommand] = useState('')
  const handleChangeCommand = useCallback((newCommand: string) => {
    setCommand(newCommand)
  }, [])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
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
    },
    [mutate, command]
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
