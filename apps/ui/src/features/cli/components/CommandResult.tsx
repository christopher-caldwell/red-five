import { FC, useMemo } from 'react'
import ChevronRight from '@mui/icons-material/ChevronRight'

import { styled } from '@mui/material'

import { standardFormatDate } from '@_ui/utils/dates'
import { FlexContainer } from '@_ui/components'
import { CliResponse } from '@_ui-types'

export const CommandResult: FC<Props> = ({ time, message, command }) => {
  const formattedTime = useMemo(() => standardFormatDate(time), [time])
  return (
    <Container>
      <FlexContainer justify='flex-start' width='100%'>
        <FlexContainer>
          <ChevronRight />
          <CommandTitle>{command}</CommandTitle>
        </FlexContainer>
        <TimeContainer>{formattedTime}</TimeContainer>
      </FlexContainer>
      <MessageContainer>{message || '-'}</MessageContainer>
    </Container>
  )
}

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

interface Props extends CliResponse {}
