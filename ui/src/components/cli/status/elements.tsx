import { styled } from '@mui/material'

import { warning, green } from '@/constants/styles'

interface StatusProps {
  isConnected: boolean
}
export const Status = styled('h1')<StatusProps>`
  color: ${({ isConnected }) => (isConnected ? green : warning)};
`
