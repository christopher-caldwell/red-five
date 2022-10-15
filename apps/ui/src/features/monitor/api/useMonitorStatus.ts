import { ChangeEvent, useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { client } from '@_ui/client/subscriptions'
import { useTestActiveConnectionQuery, useMonitoringStatusQuery, useToggleMonitoringMutation } from '@_ui/generated'

const isMonitoringKey = useMonitoringStatusQuery.getKey()

export const useMonitorStatus = () => {
  const queryClient = useQueryClient()
  const { data: isConnectedData, isError: isConnectedError } = useTestActiveConnectionQuery({}, { staleTime: 0 })
  const isConnected = !!isConnectedData && !isConnectedError
  const { data } = useMonitoringStatusQuery()
  const isMonitoring = !!data?.monitoringStatus?.isMonitoring

  const { mutate } = useToggleMonitoringMutation({
    onSuccess() {
      queryClient.invalidateQueries(isMonitoringKey)
    }
  })

  const handleMonitoringToggle = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        client.restart()
      } else {
        client.close()
      }
      mutate({ isMonitoring: checked })
    },
    [mutate]
  )
  return {
    isConnected,
    handleMonitoringToggle,
    isMonitoring
  }
}
