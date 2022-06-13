import { FC } from 'react'
import { LinearProgress } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { Window } from '@/features/cli/elements'
import { Container } from '@/views//cli/elements'
import MonitoringStatusHeader from '@/features/monitor/status-header'
import MonitorMessage from '@/features/monitor/monitor-message'

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
