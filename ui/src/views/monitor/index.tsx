import { FC, useState, useEffect, useCallback, ChangeEvent } from 'react'
import { Switch, FormControlLabel, LinearProgress } from '@material-ui/core'
import { useQueryClient } from 'react-query'

import { Window } from 'components/cli/elements'
import { execute } from 'client/subscriptions'
import { Container } from 'views/cli/elements'
import { FlexContainer } from 'components/shared'
import Status from 'components/cli/status'
import MonitorMessage from 'components/monitor/monitor-message'
import {
  useTestActiveConnectionQuery,
  useMonitoringStatusQuery,
  useToggleMonitoringMutation,
  MonitoringMessage
} from 'generated'

// const onNext = (incoming: string) => console.log('incoming', incoming)
const isMonitoringKey = useMonitoringStatusQuery.getKey()
const Monitor: FC = () => {
  const [messages, setMessages] = useState<MonitoringMessage[]>([])
  const queryClient = useQueryClient()
  const { data: isConnectedData, isError: isConnectedError } = useTestActiveConnectionQuery()
  const isConnected = !!isConnectedData && !isConnectedError
  const { data, isLoading } = useMonitoringStatusQuery()
  const { mutate } = useToggleMonitoringMutation({
    onSuccess() {
      queryClient.invalidateQueries(isMonitoringKey)
    }
  })

  const isMonitoring = !!data?.monitoringStatus?.isMonitoring

  const handleMonitoringToggle = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      mutate({ isMonitoring: checked })
    },
    [mutate]
  )

  useEffect(() => {
    const main = async () => {
      await execute<{ data: { monitorMessage: MonitoringMessage } }>(
        {
          query: 'subscription { monitorMessage { time args source } }'
        },
        data => {
          console.log('data', data)
          setMessages(currentMessages => [data?.data?.monitorMessage, ...currentMessages])
        }
      )
    }
    try {
      main()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <Container>
        <FlexContainer justify='space-between'>
          <Status isConnected={isConnected && isMonitoring} />
          <FormControlLabel
            control={<Switch checked={isMonitoring} onChange={handleMonitoringToggle} color='primary' />}
            label='Monitor this connection'
          />
        </FlexContainer>
        {isLoading ? <LinearProgress variant='indeterminate' /> : null}
        <Window>
          {messages.map(result => (
            <MonitorMessage key={result.time} {...result} />
          ))}
        </Window>
      </Container>
    </>
  )
}

export default Monitor
