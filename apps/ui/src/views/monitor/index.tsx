import { FC } from 'react'
import { LinearProgress } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { Window } from '@_ui/features/cli'
import { Container } from '@_ui/views//cli/elements'
import { useMonitoring, MonitoringStatusHeader, MonitorMessage } from '@_ui/features/monitor'

const Monitor: FC = () => {
  const { virtuosoRef, isLoading, messages } = useMonitoring()

  return (
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
  )
}

export default Monitor
