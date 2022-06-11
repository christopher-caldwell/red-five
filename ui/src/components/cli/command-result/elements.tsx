import { styled } from '@mui/material'

import { FlexContainer } from '@/components/shared'

export const CommandTitle = styled('h3')`
  color: ${({ theme }) => theme.palette.primary.main};
`
export const Container = styled('div')``

export const TimeContainer = styled(FlexContainer)`
  margin-left: 20px;
`

export const MessageContainer = styled('div')`
  width: 100%;
  padding: 10px 0;
`
