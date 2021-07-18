import { FC, useState } from 'react'
import { CircularProgress, ClickAwayListener, Popper } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { useActiveConnectionQuery } from 'generated'
import ConnectionDisplay from './connection-display'
import { ConnectionSelectMenuButton, ConnectionContainer } from './elements'

const ConnectionMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data, isLoading } = useActiveConnectionQuery()

  const connectionName = data?.activeConnection?.name
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <ConnectionContainer>
        <ConnectionSelectMenuButton fullWidth aria-describedby={id} type='button' onClick={handleClick}>
          {isLoading ? <CircularProgress variant='indeterminate' /> : connectionName || ''}
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ConnectionSelectMenuButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <ConnectionDisplay />
        </Popper>
      </ConnectionContainer>
    </ClickAwayListener>
  )
}

export default ConnectionMenu
