import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'

import { FlexContainer } from '@_ui/components'
import Logo from '@_ui/components/svg/logo'
import { Routes } from '@_ui/router/routes'
import { links } from '@_ui/constants/links'
import { SettingsLink, NavLink } from './components'
import { CreateConnectionDialog, ConnectionMenu } from '@_ui/features/connections'

const Header: FC = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar variant='dense' sx={{ backgroundColor: ({ palette: { primary } }) => primary.main }}>
        <FlexContainer justify='space-between' width='100%' height='45px'>
          <FlexContainer>
            <Link to={Routes.Home}>
              <Logo width={70} stackColor='white' />
            </Link>
            <ConnectionMenu />
          </FlexContainer>
          <FlexContainer align='center' justify='space-between' height='100%'>
            {links.map(link => (
              <NavLink key={link.to} {...link} />
            ))}
            <SettingsLink />
            <CreateConnectionDialog />
          </FlexContainer>
        </FlexContainer>
      </Toolbar>
    </AppBar>
  )
}

export default Header
