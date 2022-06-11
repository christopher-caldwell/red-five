import { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { styled } from '@mui/material'

import Header from '@/components/header'
import { Routes } from './routes'

const Keys = lazy(() => import('@/views/keys'))
const CLI = lazy(() => import('@/views/cli'))
const Monitor = lazy(() => import('@/views/monitor'))
const NoConnectionFallback = lazy(() => import('@/views/no-connection-fallback'))

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
