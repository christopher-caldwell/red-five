import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SettingsIcon from '@material-ui/icons/Settings'

import { FlexContainer } from 'components/shared'
import { Routes } from 'router/routes'
import styles from './links/index.module.sass'

export const LinkContainer = styled(NavLink)`
  margin-left: 30px;
  height: 100%;
`

export const SettingsLink: FC = () => (
  <LinkContainer to={Routes.KeysSettings} activeClassName={styles.activeLink}>
    <FlexContainer height='100%'>
      <SettingsIcon />
    </FlexContainer>
  </LinkContainer>
)
