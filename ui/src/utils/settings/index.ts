import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { useSettingsQuery, useSetSettingsMutation, Settings } from 'generated'

const settingsKey = useSettingsQuery.getKey()

export const useUpdateSettings = () => {
  const queryClient = useQueryClient()
  const { data } = useSettingsQuery()
  const settings = data?.settings

  const { mutateAsync } = useSetSettingsMutation({
    onSuccess() {
      queryClient.invalidateQueries(settingsKey)
    }
  })

  const updateSettings = useCallback(
    async (keyToUpdate: keyof Settings, value: Settings[typeof keyToUpdate]) => {
      if (!settings) return
      await mutateAsync({ settings: { ...settings, [keyToUpdate]: value } })
    },
    [mutateAsync, settings]
  )

  return {
    settings,
    updateSettings
  }
}
