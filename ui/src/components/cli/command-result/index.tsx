import { FC, useMemo } from 'react'
import ChevronRight from '@material-ui/icons/ChevronRight'

import { standardFormatDate } from 'utils/dates'
import { FlexContainer } from 'components/shared'
import { CliResponse } from 'generated'
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

export default CommandResult
