import styled from 'styled-components'

import { warning, green } from 'constants/styles'
import { BaseTextField, FlexContainer } from 'components/shared'

export const Title = styled.h1`
  margin-right: 30px;
`
export const StatusContainer = styled(FlexContainer)``
export const Container = styled.div`
  padding: 1%;
`

export type IStatus = 'connected' | 'notConnected'
interface StatusProps {
  status: IStatus
}
const statusColorMap: Record<IStatus, string> = {
  connected: green,
  notConnected: warning
}
export const Status = styled.h1<StatusProps>`
  width: 100%;
  color: ${({ status }) => statusColorMap[status]};
`

export const CommandPrompt = styled(BaseTextField)`
  /* position: fixed; */
  width: 100%;
`
