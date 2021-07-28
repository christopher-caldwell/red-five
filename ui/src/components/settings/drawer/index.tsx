import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { Routes } from 'router/routes'
import { Root, Content, DrawerContainer, Drawer } from './elements'
import styles from './index.module.sass'

const ClippedDrawer: FC = ({ children }) => {
  const { pathname } = useLocation()
  return (
    <Root>
      <Drawer
        variant='permanent'
        classes={{
          paper: styles.drawerPaper
        }}
      >
        <Toolbar />
        <DrawerContainer>
          <List>
            {settingsOptions.map(({ to, displayName }) => (
              <Link key={to} to={to}>
                <ListItem button key={to}>
                  <ListItemIcon>{to === pathname ? <ChevronRightIcon /> : null}</ListItemIcon>
                  <ListItemText primary={displayName} />
                </ListItem>
              </Link>
            ))}
          </List>
        </DrawerContainer>
      </Drawer>
      <Content>{children}</Content>
    </Root>
  )
}

const settingsOptions: SettingsOption[] = [
  {
    to: Routes.KeysSettings,
    displayName: 'Keys'
  },
  {
    to: Routes.CliSettings,
    displayName: 'CLI'
  },
  {
    to: Routes.MonitorSettings,
    displayName: 'Monitoring'
  }
]

interface SettingsOption {
  to: Routes
  displayName: string
}

export default ClippedDrawer
