import { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/header'
import { Routes } from './routes'

const Keys = lazy(() => import('views/keys'))
const CLI = lazy(() => import('views/cli'))

const Router: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<span />}>
        <Spacer>
          <Switch>
            <Route path={Routes.Keys} component={Keys} />
            <Route path={Routes.CLI} component={CLI} />
          </Switch>
        </Spacer>
      </Suspense>
    </>
  )
}

const Spacer = styled.div`
  margin-top: 60px;
`

export default Router
