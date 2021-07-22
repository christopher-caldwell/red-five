import { FC, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { CliResponse, Maybe, useSettingsQuery } from 'generated'
import { previousOutputKey } from 'constants/localStorage'
import { getItemFromLocalStorage, writeToLocalStorage } from 'utils/local-storage'
import { Window } from './elements'
import CommandResult from './command-result'

const CLIWindow: FC<Props> = ({ response }) => {
  const [messages, setMessages] = useState<CliResponseMessage[]>(potentialPreviousOutput || [])
  const { data } = useSettingsQuery()
  const settings = data?.settings

  useEffect(() => {
    const { time, message, command } = response || {}
    if (!time || !command) return
    setMessages(currentMessages => {
      const newOutput = [...currentMessages, { message, time, command }]
      if (settings?.willSaveCliOutput) writeToLocalStorage(previousOutputKey, newOutput)
      return newOutput
    })
  }, [response, settings])

  return (
    <Window>
      <Virtuoso
        data={messages}
        followOutput='smooth'
        initialTopMostItemIndex={messages.length - 1}
        itemContent={(_, message) => {
          return <CommandResult {...message} />
        }}
      />
    </Window>
  )
}

const getPreviousMessages = () => {
  const potentialPreviousOutput = getItemFromLocalStorage<CliResponseMessage[]>(previousOutputKey) || []
  return potentialPreviousOutput.sort((first, second) => first.time - second.time)
}
const potentialPreviousOutput = getPreviousMessages()

type CliResponseMessage = Pick<CliResponse, 'time' | 'message' | 'command'>
interface Props {
  response?: Maybe<CliResponseMessage>
}

export default CLIWindow
