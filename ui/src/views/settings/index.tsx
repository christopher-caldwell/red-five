import { FC, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Snackbar } from 'components/shared'
import Drawer from 'components/settings/drawer'
import { Routes } from 'router/routes'
import { CliSettings, MonitorSettings, KeysSettings } from './categories'

const Settings: FC = () => {
  const [isSnackbarShown, setIsSnackbarShown] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  return (
    <>
      <Drawer>
        <Switch>
          <Route
            path={Routes.KeysSettings}
            render={() => <KeysSettings setIsSnackbarShown={setIsSnackbarShown} setErrorMessage={setErrorMessage} />}
          />
          <Route
            path={Routes.CliSettings}
            render={() => <CliSettings setIsSnackbarShown={setIsSnackbarShown} setErrorMessage={setErrorMessage} />}
          />
          <Route path={Routes.MonitorSettings} component={MonitorSettings} />
        </Switch>
      </Drawer>
      <Snackbar
        setIsOpen={setIsSnackbarShown}
        isOpen={isSnackbarShown}
        severity={!!errorMessage ? 'error' : 'success'}
        message={!!errorMessage ? errorMessage : 'Done'}
        autoHideDuration={2000}
      />
    </>
  )
}

export default Settings
