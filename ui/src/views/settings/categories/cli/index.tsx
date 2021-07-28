import { FC, useEffect, useState } from 'react'

import { useDebounce } from 'hooks'
import { useUpdateSettings } from 'utils'
import { SettingsSelect, TextSetting } from 'components/settings/options'

export const CliSettings: FC = () => {
  const { settings, updateSettings } = useUpdateSettings()
  const existingBehavior = settings?.cliWipeBehavior || ''
  const existingMessagePersistLimit = settings?.cliMessagePersistLimit || ''
  const [numberOfMessagesToKeep, setNumberOfMessages] = useState('-1')

  const debouncedExistingMessagePersistLimit = useDebounce(numberOfMessagesToKeep, 500)

  useEffect(() => {
    if (debouncedExistingMessagePersistLimit === existingMessagePersistLimit) return
    updateSettings('cliMessagePersistLimit', Number(debouncedExistingMessagePersistLimit))
  }, [updateSettings, debouncedExistingMessagePersistLimit, existingMessagePersistLimit])

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
