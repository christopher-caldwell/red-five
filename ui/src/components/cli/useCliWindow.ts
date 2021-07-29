import { useEffect, useState } from 'react'

import { CliResponse, Maybe, useSettingsQuery } from 'generated'
import { previousOutputKey } from 'constants/localStorage'
import { getItemFromLocalStorage, removeItemFromLocalStorage, writeToLocalStorage } from 'utils/local-storage'

export const useCliWindow = (response: Props['response']) => {
  const [messages, setMessages] = useState<CliResponseMessage[]>(potentialPreviousOutput || [])
  const { data } = useSettingsQuery()
  const settings = data?.settings
  const willSaveCliOutput = settings?.willSaveCliOutput
  const messageLimit = settings?.cliMessagePersistLimit
  const wipeBehavior = settings?.cliWipeBehavior

  useEffect(() => {
    const { time, message, command } = response || {}
    if (!time || !command) return
    setMessages(currentMessages => {
      let newOutput = [...currentMessages, { message, time, command }]
      // They do not want the CLI output saved, move on
      if (!willSaveCliOutput) return newOutput
      // The messages have reached deletion limit, act accordingly
      if (messageLimit && currentMessages.length >= messageLimit) {
        if (wipeBehavior === 'wipe') {
          removeItemFromLocalStorage(previousOutputKey)
          // Reset messages to the most current one
          newOutput = [{ message, time, command }]
        } else if (wipeBehavior === 'pop') {
          console.log('popping')
          newOutput.shift()
        }
      }
      writeToLocalStorage(previousOutputKey, newOutput)
      return newOutput
    })
  }, [response, willSaveCliOutput, messageLimit, wipeBehavior])

  return {
    messages
  }
}

const getPreviousMessages = () => {
  const potentialPreviousOutput = getItemFromLocalStorage<CliResponseMessage[]>(previousOutputKey) || []
  return potentialPreviousOutput.sort((first, second) => first.time - second.time)
}
const potentialPreviousOutput = getPreviousMessages()

type CliResponseMessage = Pick<CliResponse, 'time' | 'message' | 'command'>

export interface Props {
  response?: Maybe<CliResponseMessage>
}
