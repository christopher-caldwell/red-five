import { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/header'
import { Routes } from './routes'

const Keys = lazy(() => import('views/keys'))

const Router: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<span />}>
        <Spacer>
          <Switch>
            <Route path={Routes.Keys} component={Keys} />
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
