import { FC, useEffect } from 'react'

import { subscribe } from 'client/subscriptions'

const onNext = (incoming: string) => console.log('incoming', incoming)

const Monitor: FC = () => {
  useEffect(() => {
    const main = () => subscribe<string>('subscription { monitor }', onNext)
    main()
  }, [])

  return <div>Testing 1,2,3</div>
}

export default Monitor
