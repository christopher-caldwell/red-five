import { FC, useState } from 'react'
import { ClickAwayListener, Popper } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { ServerSelectMenuButton } from './elements'

const ServerMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div>
        <ServerSelectMenuButton fullWidth aria-describedby={id} type='button' onClick={handleClick}>
          Server Name
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ServerSelectMenuButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div>The content of the Popper.</div>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ServerMenu
