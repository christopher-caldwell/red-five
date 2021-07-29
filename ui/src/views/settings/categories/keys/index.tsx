import { FC, useCallback, useEffect, useState } from 'react'
import { convertTimeToMs } from '@caldwell619/ms'
import { isNumber } from '@material-ui/data-grid'

import { useUpdateSettings } from 'utils'
import { YesOrNoSetting, TextSetting } from 'components/settings/options'
import { useDebounce } from 'hooks'
import { SettingsProps } from '../shared'

export const KeysSettings: FC<SettingsProps> = ({ setErrorMessage, setIsSnackbarShown }) => {
  const { settings, updateSettings, isUpdateSettingsError } = useUpdateSettings()
  const existingTime = settings?.keysRefreshInterval.toString() || '-1'
  const [time, setTime] = useState('-1')

  const debouncedTime = useDebounce(time, 500)

  // TODO: refactor into hook
  useEffect(() => {
    if (isUpdateSettingsError) setErrorMessage('Something went wrong')
    else setErrorMessage(undefined)
  }, [isUpdateSettingsError, setErrorMessage])

  useEffect(() => {
    if (debouncedTime === existingTime) return
    // No refresh
    if (debouncedTime === '-1') updateSettings('keysRefreshInterval', -1)
    const convertedMs = convertTimeToMs(debouncedTime)
    if (isNumber(convertedMs)) {
      updateSettings('keysRefreshInterval', convertedMs)
      setIsSnackbarShown(true)
    }
  }, [debouncedTime, updateSettings, existingTime, setIsSnackbarShown])

  const updateMessageSuppressionDialog = useCallback(
    (newSetting: boolean) => {
      updateSettings('willPromptBeforeDelete', newSetting)
      setIsSnackbarShown(true)
    },
    [updateSettings, setIsSnackbarShown]
  )

  return (
    <>
      <YesOrNoSetting
        label='Ask for confirmation before deleting keys or connections'
        onChange={updateMessageSuppressionDialog}
        defaultAnswer={settings?.willPromptBeforeDelete || false}
      />
      <TextSetting
        label='Number of seconds before auto refreshing keys'
        onChange={setTime}
        defaultAnswer={settings?.keysRefreshInterval || -1}
        helperText='Use any logical time unit: 1 day, 2 min, etc. use -1 for no auto refresh'
      />
    </>
  )
}
