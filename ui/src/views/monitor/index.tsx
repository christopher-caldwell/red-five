import { FC, useEffect } from 'react'

import { execute } from 'client/subscriptions'

// const onNext = (incoming: string) => console.log('incoming', incoming)

const Monitor: FC = () => {
  useEffect(() => {
    const main = async () => {
      await execute<string>(
        {
          query: 'subscription { greetings }'
        },
        data => {
          console.log('data', data)
        }
      )
    }
    try {
      main()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return <div>Testing 1,2,3</div>
}

export default Monitor
