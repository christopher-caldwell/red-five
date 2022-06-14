import { FC } from 'react'
import { Switch, FormControlLabel } from '@mui/material'

import { FlexContainer } from '@/components'
import { CliStatus } from '@/features/cli/components'
import { MonitoringDisclaimer } from './Disclaimer'
import { useMonitorStatus } from '../api'

export const MonitoringStatusHeader: FC = () => {
  const { isConnected, isMonitoring, handleMonitoringToggle } = useMonitorStatus()

  return (
    <FlexContainer justify='space-between'>
      <CliStatus isConnected={isConnected && isMonitoring} />
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
