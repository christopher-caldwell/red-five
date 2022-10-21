import { FC, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { styled } from '@mui/material'

import Header from '@_ui/features/header'
import { Routes as AvailableRoutes } from './routes'

const Keys = lazy(() => import('@_ui/views/keys'))
const CLI = lazy(() => import('@_ui/views/cli'))
const Monitor = lazy(() => import('@_ui/views/monitor'))
const NoConnectionFallback = lazy(() => import('@_ui/views/no-connection-fallback'))

const Router: FC = () => (
  <>
    <Header />
    <Suspense fallback={<span />}>
      <Spacer>
        <Routes>
          <Route path={AvailableRoutes.Monitor} element={<Monitor />} />
          <Route path={AvailableRoutes.Keys} element={<Keys />} />
          <Route path={AvailableRoutes.CLI} element={<CLI />} />
          <Route path={AvailableRoutes.NoConnectionFallback} element={<NoConnectionFallback />} />
        </Routes>
      </Spacer>
    </Suspense>
  </>
)

const Spacer = styled('div')`
  margin-top: 60px;
`

export default Router
