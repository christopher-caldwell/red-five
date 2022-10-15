import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { useSettingsQuery, useSetSettingsMutation, Settings } from '@_ui/generated'

const settingsKey = useSettingsQuery.getKey()

export const useUpdateSettings = () => {
  const queryClient = useQueryClient()
  const { data } = useSettingsQuery()
  const settings = data?.settings

  const { mutate, isError } = useSetSettingsMutation({
    onSuccess() {
      queryClient.invalidateQueries(settingsKey)
    }
  })

  const updateSettings = useCallback(
    (keyToUpdate: keyof Settings, value: Settings[typeof keyToUpdate]) => {
      if (!settings) return
      mutate({ settings: { ...settings, [keyToUpdate]: value } })
    },
    [mutate, settings]
  )

  return {
    settings,
    updateSettings,
    isUpdateSettingsError: isError
  }
}
