import { FC, useEffect, useState } from 'react'
import { convertTimeToMs } from '@caldwell619/ms'
import { isNumber } from '@material-ui/data-grid'

import { useUpdateSettings } from 'utils'
import { YesOrNoSetting, TextSetting } from 'components/settings/options'
import { useDebounce } from 'hooks'

export const KeysSettings: FC = () => {
  const { settings, updateSettings } = useUpdateSettings()
  const existingTime = settings?.keysRefreshInterval.toString() || '-1'
  const [time, setTime] = useState('-1')

  const debouncedTime = useDebounce(time, 500)

  useEffect(() => {
    if (debouncedTime === existingTime) return
    // No refresh
    if (debouncedTime === '-1') updateSettings('keysRefreshInterval', -1)
    const convertedMs = convertTimeToMs(debouncedTime)
    if (isNumber(convertedMs)) updateSettings('keysRefreshInterval', convertedMs)
  }, [debouncedTime, updateSettings, existingTime])

  return (
    <>
      <YesOrNoSetting
        label='Suppress the dialog to ask before deleting keys'
        onChange={newSetting => updateSettings('willPromptBeforeDelete', newSetting)}
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
