import { FC, useMemo } from 'react'
import { styled } from '@mui/material'

import { warning, green } from '@/constants/styles'

const CliStatus: FC<Props> = ({ isConnected }) => {
  const displayText = useMemo(() => (isConnected ? 'Connected' : 'Not Connected'), [isConnected])
  return <Status isConnected={isConnected}>{displayText}</Status>
}

interface StatusProps {
  isConnected: boolean
}
// TODO: Change to theme instead of constants
const Status = styled('h1')<StatusProps>`
  color: ${({ isConnected }) => (isConnected ? green : warning)};
`

interface Props {
  isConnected: boolean
}

export default CliStatus
