import { FC } from 'react'
import { styled } from '@mui/material'
import { NavLink as RouterLink } from 'react-router-dom'

import { FlexContainer } from '@_ui/components'
import { Link } from '@_ui/constants/links'
import styles from './index.module.sass'

export const NavLink: FC<Link> = ({ to, label }) => {
  return (
    <LinkContainer to={to} activeClassName={styles.activeLink}>
      <FlexContainer height='100%'>{label}</FlexContainer>
    </LinkContainer>
  )
}

const LinkContainer = styled(RouterLink)`
  margin-left: 30px;
  height: 100%;
`
