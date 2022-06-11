import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'

import { FlexContainer } from '@/components/shared'
import Logo from '@/components/svg/logo'
import { Routes } from '@/router/routes'
import { links } from './links/links'
import NavLink from './links/NavLink'
import Menu from './server-dropdown/Menu'
import CreateServerDialog from './create-connection-dialog'
import { SettingsLink } from './elements'

const Header: FC = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar variant='dense'>
        <FlexContainer justify='space-between' width='100%' height='45px'>
          <FlexContainer>
            <Link to={Routes.Home}>
              <Logo width={70} stackColor='white' />
            </Link>
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
