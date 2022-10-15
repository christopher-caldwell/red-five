import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, styled } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

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
