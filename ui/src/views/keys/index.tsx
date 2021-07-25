import { FC, useEffect, useState } from 'react'
import { Switch, Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { parse } from 'query-string'

import { useActiveConnectionQuery } from 'generated'
import { Routes } from 'router/routes'
import { FlexContainer, Snackbar } from 'components/shared'
import Explorer from 'components/keys/explorer'
import Display from 'components/keys/display'
import CreateKey from './create'

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
        <Explorer width={width} setWidth={setWidth} />
        <Switch>
          <Route path={path + '/create'} render={() => <CreateKey width={width} />} />
          <Route path={path} render={() => <Display width={width} />} />
        </Switch>
      </FlexContainer>
      {confirmation ? (
        <Snackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} severity='success' message='Done' />
      ) : null}
    </>
  )
}

export default Keys
