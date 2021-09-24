import { FC, useMemo, memo } from 'react'
import ChevronRight from '@material-ui/icons/ChevronRight'
import deepEqual from 'fast-deep-equal'

import { standardFormatDate } from '@/utils/dates'
import { FlexContainer } from '@/components/shared'
import { CliResponse } from '@/generated'
import { MessageContainer, CommandTitle, Container, TimeContainer } from './elements'

const CommandResult: FC<Props> = ({ time, message, command }) => {
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

interface Props extends CliResponse {}

export default memo(CommandResult, deepEqual)
