import { FC } from 'react'
import { LinearProgress } from '@material-ui/core'
import { Virtuoso } from 'react-virtuoso'

import { Window } from '@/components/cli/elements'
import { Container } from '@/views//cli/elements'
import MonitoringStatusHeader from '@/components/monitor/status-header'
import MonitorMessage from '@/components/monitor/monitor-message'

import { useMonitoring } from './useMonitoring'

const Monitor: FC = () => {
  const { virtuosoRef, isLoading, messages } = useMonitoring()

  return (
    <>
      <Container>
        <MonitoringStatusHeader />
        {isLoading ? <LinearProgress variant='indeterminate' /> : null}
        <Window>
          <Virtuoso
            style={{ height: '700px' }}
            ref={virtuosoRef}
            data={messages}
            followOutput='smooth'
            itemContent={(_, message) => {
              return <MonitorMessage {...message} />
            }}
          />
        </Window>
      </Container>
    </>
  )
}

export default Monitor
