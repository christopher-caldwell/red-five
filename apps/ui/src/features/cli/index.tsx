import { FC } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { styled } from '@mui/material'

import { CommandResult } from './components'
import { useCliWindow, Props } from './api'

export const CLIWindow: FC<Props> = ({ response }) => {
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

export const Window = styled('div')`
  width: 100%;
  /* top: 150px; */
  border: 0.5px solid gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column-reverse; */
  padding: 1%;
  overflow: scroll;
  height: 65vh;
  margin-top: 10px;
  @media screen and (min-width: 1500px) {
    height: 70vh;
  }
`

export * from './components'
export * from './api'
