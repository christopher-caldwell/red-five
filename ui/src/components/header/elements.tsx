import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

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
