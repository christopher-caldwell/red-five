import { FC } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { Window } from './elements'
import CommandResult from './command-result'
import { useCliWindow, Props } from './useCliWindow'

const CLIWindow: FC<Props> = ({ response }) => {
  const { messages } = useCliWindow(response)

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

export default CLIWindow
