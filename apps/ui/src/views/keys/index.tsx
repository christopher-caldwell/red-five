import { FC, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { parse } from 'query-string'

import { useActiveConnectionQuery } from '@_ui-types'
import { Routes as AvailableRoutes } from '@_ui/router/routes'
import { FlexContainer, Snackbar } from '@_ui/components'
import { CreateKey, KeyDisplay, KeyExplorer } from '@_ui/features/keys'

const Keys: FC = () => {
  const navigate = useNavigate()
  const [width, setWidth] = useState(350)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { search } = useLocation()
  const { confirmation } = parse(search)
  const { data } = useActiveConnectionQuery()

  const connectionName = data?.activeConnection?.id
  if (!connectionName) navigate(AvailableRoutes.NoConnectionFallback)

  useEffect(() => {
    if (!confirmation) return
    setIsSnackbarOpen(true)
  }, [confirmation])

  return (
    <>
      <FlexContainer margin='1% 0 0 0' padding='1%' justify='flex-end' width='100vw'>
        <KeyExplorer width={width} setWidth={setWidth} />
        <Routes>
          <Route index element={<KeyDisplay width={width} />} />
          <Route path='/create' element={<CreateKey width={width} />} />
        </Routes>
      </FlexContainer>
      {confirmation ? (
        <Snackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} severity='success' message='Done' />
      ) : null}
    </>
  )
}

export default Keys
