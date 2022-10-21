import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from '@_ui/router/routes'
import { useActiveConnectionQuery } from '@_ui-types'
import { FlexContainer } from '@_ui/components'

const NoConnectionFallback: FC = () => {
  const navigate = useNavigate()
  const { data } = useActiveConnectionQuery()
  const connectionName = data?.activeConnection?.id
  useEffect(() => {
    if (connectionName) navigate(Routes.Keys)
  }, [navigate, connectionName])

  return (
    <FlexContainer width='100%' height='80vh'>
      <h1>Create a connection to get started</h1>
    </FlexContainer>
  )
}

export default NoConnectionFallback
