import { createClient, SubscribePayload, ClientOptions, Client } from 'graphql-ws'

import { GRAPHQL_WEB_SOCKET_ENDPOINT as url } from '@_ui/constants'

function createRestartableClient(options: ClientOptions): RestartableClient {
  let restartRequested = false
  let restart = () => {
    restartRequested = true
  }
  let close = () => {
    //
  }

  const client = createClient({
    ...options,
    on: {
      ...options.on,
      opened: unknownSocket => {
        const socket = unknownSocket as Socket
        options.on?.opened?.(socket)
        close = () => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205)
          }
        }
        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            // if the socket is still open for the restart, do the restart
            socket.close(4205, 'Client Restart')
          } else {
            // otherwise the socket might've closed, indicate that you want
            // a restart on the next opened event
            restartRequested = true
          }
        }

        // just in case you were eager to restart
        if (restartRequested) {
          restartRequested = false
          restart()
        }
      }
    }
  })

  return {
    ...client,
    restart,
    close
  }
}

export const client = createRestartableClient({
  url
})

export async function execute<T>(payload: SubscribePayload, onNext: (incomingData: T | null | undefined) => void) {
  return new Promise<T | null | undefined>((resolve, reject) => {
    let result: T | null | undefined
    client.subscribe<T>(payload, {
      next: ({ data }) => {
        result = data
        onNext(data)
      },
      error: reject,
      complete: () => resolve(result)
    })
  })
}

interface RestartableClient extends Client {
  restart(): void
  close(): void
}
interface Socket {
  readyState: number
  close: (code: number, reason?: string) => void
}
