import { FC, useMemo } from 'react'
import ChevronRight from '@mui/icons-material/ChevronRight'

import { standardFormatDate } from '@/utils/dates'
import { FlexContainer } from '@/components'
import { MonitoringMessage } from '@/generated'
import { MessageContainer, CommandTitle, Container } from '@/features/cli/components'

export const MonitorMessage: FC<Props> = ({ time, args }) => {
  const formattedTime = useMemo(() => standardFormatDate(time), [time])
  const formattedArgs = useMemo(
    () => args.reduce((fullCommand, currentSegment) => fullCommand + ' ' + currentSegment, ''),
    [args]
  )
  return (
    <Container>
      <FlexContainer justify='flex-start' width='100%'>
        <FlexContainer>
          <ChevronRight />
          <CommandTitle>{formattedTime}</CommandTitle>
        </FlexContainer>
      </FlexContainer>
      <MessageContainer>{formattedArgs}</MessageContainer>
    </Container>
  )
}

interface Props extends MonitoringMessage {}
