import { FC } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

import { FlexContainer } from 'components/shared'
import { links } from './links/links'
import NavLink from './links/NavLink'
import Menu from './server-dropdown/Menu'
import CreateServerDialog from './create-connection-dialog'
import { SettingsLink } from './elements'

const Header: FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <FlexContainer justify='space-between' width='100%' height='45px'>
          <FlexContainer>
            <h6>Photos</h6>
            <Menu />
          </FlexContainer>
          <FlexContainer align='center' justify='space-between' height='100%'>
            {links.map(link => (
              <NavLink key={link.to} {...link} />
            ))}
            <SettingsLink />
            <CreateServerDialog />
          </FlexContainer>
        </FlexContainer>
      </Toolbar>
    </AppBar>
  )
}

export default Header
