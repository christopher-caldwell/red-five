import { FC } from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'

import { FlexContainer } from '@/components/shared'
import MonitoringDisclaimer from '@/components/monitor/disclaimer'
import Status from '@/components/cli/status'
import { useMonitorStatus } from './useMonitorStatus'

const MonitoringStatusHeader: FC = () => {
  const { isConnected, isMonitoring, handleMonitoringToggle } = useMonitorStatus()

  return (
    <FlexContainer justify='space-between'>
      <Status isConnected={isConnected && isMonitoring} />
      <FlexContainer>
        <FormControlLabel
          control={<Switch checked={isMonitoring} onChange={handleMonitoringToggle} color='primary' />}
          label='Monitor this connection'
        />
        <MonitoringDisclaimer />
      </FlexContainer>
    </FlexContainer>
  )
}

export default MonitoringStatusHeader
