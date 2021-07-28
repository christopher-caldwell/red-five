import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import Drawer from 'components/settings/drawer'
import { Routes } from 'router/routes'
import { CliSettings, MonitorSettings, KeysSettings } from './categories'

const Settings: FC = () => {
  return (
    <Drawer>
      <Switch>
        <Route path={Routes.KeysSettings} component={KeysSettings} />
        <Route path={Routes.CliSettings} component={CliSettings} />
        <Route path={Routes.MonitorSettings} component={MonitorSettings} />
      </Switch>
    </Drawer>
  )
}

export default Settings
