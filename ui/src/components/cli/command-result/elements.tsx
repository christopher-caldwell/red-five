import styled from 'styled-components'

import { FlexContainer } from '@/components/shared'

export const CommandTitle = styled.h3`
  color: ${({ theme }) => theme.brandColor};
`
export const Container = styled.div``

export const TimeContainer = styled(FlexContainer)`
  margin-left: 20px;
`

export const MessageContainer = styled.div`
  width: 100%;
  padding: 10px 0;
`
