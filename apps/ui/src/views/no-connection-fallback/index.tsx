import { FC, useEffect } from 'react'
import { useHistory } from 'react-router'

import { Routes } from '@_ui/router/routes'
import { useActiveConnectionQuery } from '@_ui/generated'
import { FlexContainer } from '@_ui/components'

const NoConnectionFallback: FC = () => {
  const { push } = useHistory()
  const { data } = useActiveConnectionQuery()
  const connectionName = data?.activeConnection?.id
  useEffect(() => {
    if (connectionName) push(Routes.Keys)
  }, [push, connectionName])

  return (
    <FlexContainer width='100%' height='80vh'>
      <h1>Create a connection to get started</h1>
    </FlexContainer>
  )
}

export default NoConnectionFallback
