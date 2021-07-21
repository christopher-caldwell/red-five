import { createClient } from 'graphql-ws'

import { GRAPHQL_WEB_SOCKET_ENDPOINT as url } from 'constants/index'

const client = createClient({
  url
})

export const subscribe = async <TData>(
  query: string,
  onNext: (incomingValue: TData) => void
): Promise<TData | undefined> => {
  let result: TData | undefined = undefined
  return new Promise((resolve, reject) => {
    client.subscribe(
      {
        query
      },
      {
        next: onNext,
        error: reject,
        complete: () => resolve(result)
      }
    )
  })
}
