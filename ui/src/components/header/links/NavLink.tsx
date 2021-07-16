import { FlexContainer } from 'components/shared'
import { FC } from 'react'

import { LinkContainer } from '../elements'
import { Link } from './links'
import styles from './index.module.sass'

const NavLink: FC<Link> = ({ to, label }) => {
  return (
    <LinkContainer to={to} activeClassName={styles.activeLink} exact>
      <FlexContainer height='100%'>{label}</FlexContainer>
    </LinkContainer>
  )
}

export default NavLink
