import { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { styled } from '@mui/material'

import Header from '@_ui/features/header'
import { Routes } from './routes'

const Keys = lazy(() => import('@_ui/views/keys'))
const CLI = lazy(() => import('@_ui/views/cli'))
const Monitor = lazy(() => import('@_ui/views/monitor'))
const NoConnectionFallback = lazy(() => import('@_ui/views/no-connection-fallback'))

const Router: FC = () => (
  <>
    <Header />
    <Suspense fallback={<span />}>
      <Spacer>
        <Switch>
          <Route path={Routes.Monitor} component={Monitor} />
          <Route path={Routes.Keys} component={Keys} />
          <Route path={Routes.CLI} component={CLI} />
          <Route path={Routes.NoConnectionFallback} component={NoConnectionFallback} />
        </Switch>
      </Spacer>
    </Suspense>
  </>
)

const Spacer = styled('div')`
  margin-top: 60px;
`

export default Router
