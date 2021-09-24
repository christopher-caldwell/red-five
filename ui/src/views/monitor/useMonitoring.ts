import { useState, useRef, useEffect } from 'react'
import { VirtuosoHandle } from 'react-virtuoso'

import { execute } from '@/client/subscriptions'
import { useMonitoringStatusQuery, MonitoringMessage } from '@/generated'

export const useMonitoring = () => {
  const [messages, setMessages] = useState<MonitoringMessage[]>([])
  const { data, isLoading } = useMonitoringStatusQuery()
  const isMonitoring = !!data?.monitoringStatus?.isMonitoring

  const virtuosoRef = useRef<VirtuosoHandle>(null)

  // TODO: error handling of this
  useEffect(() => {
    const run = () =>
      execute<{ monitorMessage: MonitoringMessage }>(
        {
          query: 'subscription { monitorMessage { time args source } }'
        },
        data => {
          setMessages(currentMessages => {
            if (!data?.monitorMessage) return currentMessages
            else return [...currentMessages, data.monitorMessage]
          })
        }
      )
    if (isMonitoring) run()
  }, [isMonitoring])

  return {
    virtuosoRef,
    isLoading,
    messages
  }
}
