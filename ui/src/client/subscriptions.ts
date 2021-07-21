import { createClient, SubscribePayload } from 'graphql-ws'

import { GRAPHQL_WEB_SOCKET_ENDPOINT as url } from 'constants/index'

const client = createClient({
  url
})

export async function execute<T>(payload: SubscribePayload, onNext: (incomingData: T) => void) {
  return new Promise<T>((resolve, reject) => {
    let result: T
    client.subscribe<T>(payload, {
      next: data => {
        result = data
        onNext(data)
      },
      error: reject,
      complete: () => resolve(result)
    })
  })
}
