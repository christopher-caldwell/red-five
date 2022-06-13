import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconButton, styled } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

export const LinkContainer = styled(NavLink)`
  margin-left: 30px;
  height: 100%;
`

const SettingsIconButton = styled(IconButton)`
  margin-left: 30px !important;
  margin-top: 5px !important;
`

export const SettingsLink: FC = () => (
  <SettingsIconButton>
    <Link to='/settings'>
      <SettingsIcon />
    </Link>
  </SettingsIconButton>
)
