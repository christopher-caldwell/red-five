import { FC, useState } from 'react'
import { CircularProgress, ClickAwayListener, Popper } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Redirect } from 'react-router'

import { Routes } from '@/router/routes'
import { useActiveConnectionQuery } from '@/generated'
import ConnectionDisplay from './connection-display'
import { ConnectionSelectMenuButton, ConnectionContainer } from './elements'
import styles from './connectionsDisplay.module.sass'

export const ConnectionMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data, isLoading } = useActiveConnectionQuery()

  const connectionName = data?.activeConnection?.name
  if (!connectionName) {
    if (anchorEl) setAnchorEl(null)
    return <Redirect to={Routes.NoConnectionFallback} />
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <ConnectionContainer>
        <ConnectionSelectMenuButton
          variant='text'
          color='inherit'
          fullWidth
          aria-describedby={id}
          type='button'
          onClick={handleClick}
        >
          {isLoading ? <CircularProgress variant='indeterminate' /> : connectionName || ''}
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ConnectionSelectMenuButton>
        <Popper className={styles.connectionDisplay} id={id} open={open} anchorEl={anchorEl}>
          <ConnectionDisplay />
        </Popper>
      </ConnectionContainer>
    </ClickAwayListener>
  )
}
