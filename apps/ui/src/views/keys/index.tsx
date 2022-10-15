import { FC, useEffect, useState } from 'react'
import { Switch, Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { parse } from 'query-string'

import { useActiveConnectionQuery } from '@_ui/generated'
import { Routes } from '@_ui/router/routes'
import { FlexContainer, Snackbar } from '@_ui/components'
import { CreateKey, KeyDisplay, KeyExplorer } from '@_ui/features/keys'

const Keys: FC = () => {
  const { push } = useHistory()
  const [width, setWidth] = useState(350)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { path } = useRouteMatch()
  const { search } = useLocation()
  const { confirmation } = parse(search)
  const { data } = useActiveConnectionQuery()

  const connectionName = data?.activeConnection?.id
  if (!connectionName) push(Routes.NoConnectionFallback)

  useEffect(() => {
    if (!confirmation) return
    setIsSnackbarOpen(true)
  }, [confirmation])

  return (
    <>
      <FlexContainer margin='1% 0 0 0' padding='1%' justify='flex-end' width='100vw'>
        <KeyExplorer width={width} setWidth={setWidth} />
        <Switch>
          <Route path={path + '/create'} render={() => <CreateKey width={width} />} />
          <Route path={path} render={() => <KeyDisplay width={width} />} />
        </Switch>
      </FlexContainer>
      {confirmation ? (
        <Snackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} severity='success' message='Done' />
      ) : null}
    </>
  )
}

export default Keys
