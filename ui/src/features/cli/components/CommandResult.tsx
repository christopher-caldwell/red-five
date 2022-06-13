import { FC, useMemo } from 'react'
import ChevronRight from '@mui/icons-material/ChevronRight'

import { styled } from '@mui/material'

import { standardFormatDate } from '@/utils/dates'
import { FlexContainer } from '@/components'
import { CliResponse } from '@/generated'

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

const CommandTitle = styled('h3')`
  color: ${({ theme }) => theme.palette.primary.main};
`
const Container = styled('div')``

const TimeContainer = styled(FlexContainer)`
  margin-left: 20px;
`

const MessageContainer = styled('div')`
  width: 100%;
  padding: 10px 0;
`

interface Props extends CliResponse {}