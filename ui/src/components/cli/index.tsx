import { FC, useEffect, useState } from 'react'

import { CliResponse, Maybe, useSettingsQuery } from 'generated'
import { previousOutputKey } from 'constants/localStorage'
import { getItemFromLocalStorage, writeToLocalStorage } from 'utils/local-storage'
import { Window } from './elements'
import CommandResult from './command-result'

const potentialPreviousOutput = getItemFromLocalStorage<CliResponseMessage[]>(previousOutputKey)

const CLIWindow: FC<Props> = ({ response }) => {
  const [messages, setMessages] = useState<CliResponseMessage[]>(potentialPreviousOutput || [])
  const { data } = useSettingsQuery()
  const settings = data?.settings

  useEffect(() => {
    const { time, message, command } = response || {}
    if (!time || !command) return
    setMessages(currentMessages => {
      const newOutput = [{ message, time, command }, ...currentMessages]
      if (settings?.willSaveCliOutput) writeToLocalStorage(previousOutputKey, newOutput)
      return newOutput
    })
  }, [response, settings])

  return (
    <Window>
      {messages.map(result => (
        <CommandResult key={result.time} {...result} />
      ))}
    </Window>
  )
}

type CliResponseMessage = Pick<CliResponse, 'time' | 'message' | 'command'>
interface Props {
  response?: Maybe<CliResponseMessage>
}

export default CLIWindow
