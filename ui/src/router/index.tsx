import { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Routes } from './routes'

const Home = lazy(() => import('views/home'))

const Router: FC = () => {
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<span />}>
        <Switch>
          <Route path={Routes.Home} component={Home} />
        </Switch>
      </Suspense>
    </>
  )
}

export default Router
