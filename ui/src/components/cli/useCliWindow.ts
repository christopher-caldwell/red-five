import { useEffect, useState } from 'react'

import { CliResponse, Maybe, useSettingsQuery } from 'generated'
import { previousOutputKey } from 'constants/localStorage'
import { getItemFromLocalStorage, writeToLocalStorage } from 'utils/local-storage'

export const useCliWindow = (response: Props['response']) => {
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
