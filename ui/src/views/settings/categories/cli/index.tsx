import { FC, useEffect, useState } from 'react'

import { useDebounce } from 'hooks'
import { useUpdateSettings } from 'utils'
import { SettingsSelect, TextSetting } from 'components/settings/options'
import { SettingsProps } from '../shared'

export const CliSettings: FC<SettingsProps> = ({ setErrorMessage, setIsSnackbarShown }) => {
  const { settings, updateSettings, isUpdateSettingsError } = useUpdateSettings()
  const existingBehavior = settings?.cliWipeBehavior || ''
  const existingMessagePersistLimit = settings?.cliMessagePersistLimit || '-1'
  const [numberOfMessagesToKeep, setNumberOfMessages] = useState(existingMessagePersistLimit)

  // TODO: Refactor into re-usable hook
  useEffect(() => {
    if (isUpdateSettingsError) setErrorMessage('Something went wrong')
    else setErrorMessage(undefined)
  }, [isUpdateSettingsError, setErrorMessage])

  const debouncedExistingMessagePersistLimit = useDebounce(numberOfMessagesToKeep, 500)

  useEffect(() => {
    if (Number(debouncedExistingMessagePersistLimit) === existingMessagePersistLimit) return
    updateSettings('cliMessagePersistLimit', Number(debouncedExistingMessagePersistLimit))
    setIsSnackbarShown(true)
  }, [updateSettings, debouncedExistingMessagePersistLimit, existingMessagePersistLimit, setIsSnackbarShown])

  return (
    <>
      <SettingsSelect
        onChange={choice => updateSettings('cliWipeBehavior', choice)}
        existingChoice={existingBehavior}
        label='How do you want the CLI to manage your messages?'
      />
      <TextSetting
        label='How many messages to keep before removal starts?'
        onChange={setNumberOfMessages}
        defaultAnswer={settings?.cliMessagePersistLimit || -1}
        helperText='Use -1 to never remove'
      />
    </>
  )
}
