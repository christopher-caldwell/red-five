import { FC, useState } from 'react'
import { ClickAwayListener, Popper } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import ConnectionDisplay from './connection-display'
import { ConnectionSelectMenuButton } from './elements'

const ConnectionMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div>
        <ConnectionSelectMenuButton fullWidth aria-describedby={id} type='button' onClick={handleClick}>
          Connection Name
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ConnectionSelectMenuButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <ConnectionDisplay />
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ConnectionMenu
