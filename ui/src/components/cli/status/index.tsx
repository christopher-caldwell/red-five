import { FC, useMemo } from 'react'

import { Status } from './elements'

const CliStatus: FC<Props> = ({ isConnected }) => {
  const displayText = useMemo(() => (isConnected ? 'Connected' : 'Not Connected'), [isConnected])
  return <Status isConnected={isConnected}>{displayText}</Status>
}

interface Props {
  isConnected: boolean
}

export default CliStatus
