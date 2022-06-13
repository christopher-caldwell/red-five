import { FC } from 'react'
import { Switch, FormControlLabel } from '@mui/material'

import { FlexContainer } from '@/components'
import MonitoringDisclaimer from '@/features/monitor/disclaimer'
import Status from '@/features/cli/status'
import { useMonitorStatus } from './useMonitorStatus'

export const MonitoringStatusHeader: FC = () => {
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
