import { FC, useState } from 'react'
import { CircularProgress, ClickAwayListener, Popper, styled, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { useActiveConnectionQuery } from '@_ui-types'
import { ConnectionDisplay } from './components'
import styles from './connectionsDisplay.module.sass'

export const ConnectionMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data, isLoading } = useActiveConnectionQuery()

  const connectionName = data?.activeConnection?.name
  if (!connectionName) {
    if (anchorEl) setAnchorEl(null)
    return null
    // TODO: Consider checking path and then seeing if redirect is needed
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
          variant='outlined'
          color='inherit'
          fullWidth
          aria-describedby={id}
          type='button'
          onClick={handleClick}
        >
          {isLoading ? <CircularProgress variant='indeterminate' /> : connectionName || ''}
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ConnectionSelectMenuButton>
        <Popper
          className={styles['connectionDisplay']}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onResize={undefined}
          onResizeCapture={undefined}
          nonce={undefined}
        >
          <ConnectionDisplay />
        </Popper>
      </ConnectionContainer>
    </ClickAwayListener>
  )
}

const ConnectionSelectMenuButton = styled(Button)`
  color: white;
  & svg {
    margin-left: 10px;
  }
`

const ConnectionContainer = styled('div')`
  z-index: 9000000000000;
  & button {
    text-transform: none;
  }
`
