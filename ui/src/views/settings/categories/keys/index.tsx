import { FC } from 'react'

import { useUpdateSettings } from 'utils'
import { YesOrNoSetting, TextSetting } from 'components/settings/options'

export const KeysSettings: FC = () => {
  const { settings, updateSettings } = useUpdateSettings()

  return (
    <>
      <YesOrNoSetting
        label='Suppress the dialog to ask before deleting keys'
        onChange={newSetting => updateSettings('willPromptBeforeDelete', newSetting)}
        defaultAnswer={settings?.willPromptBeforeDelete || false}
      />
      <TextSetting
        label='Number of seconds before auto refreshing keys'
        onChange={newAnswer => updateSettings('keysRefreshInterval', Number(newAnswer))}
        defaultAnswer={settings?.keysRefreshInterval || -1}
        helperText='Use -1 for no auto refresh'
      />
    </>
  )
}
