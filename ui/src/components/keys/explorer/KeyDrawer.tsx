import { FC, useRef, Dispatch, SetStateAction } from 'react'
import { Drawer } from '@material-ui/core'

import { Root, Dragger } from './elements'
import styles from './drawer.module.sass'

let isResizing = false
const KeyDrawer: FC<Props> = ({ width, setWidth, children }) => {
  const sidebarPanelRef = useRef<HTMLDivElement>(null)
  const sidebarCurrent = sidebarPanelRef?.current

  function handleMousedown() {
    // we will only add listeners when needed, and remove them afterward
    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('mouseup', handleMouseUp)
    isResizing = true
  }

  function handleMousemove(e: MouseEvent) {
    if (!isResizing) return

    const offset = e.clientX
    if (offset > minWidth && offset < maxWidth) {
      if (sidebarCurrent) {
        sidebarCurrent.style.width = offset + 'px'
        setWidth(offset)
      }
    }
  }

  function handleMouseUp() {
    if (!isResizing) {
      return
    }
    isResizing = false
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseup', handleMousedown)
  }

  return (
    <Root ref={sidebarPanelRef}>
      <Drawer
        variant='permanent'
        open
        anchor='left'
        classes={{
          paper: styles.drawerPaper
        }}
        PaperProps={{ style: { width } }}
      >
        <Dragger onMouseDown={handleMousedown} />
        {children}
      </Drawer>
    </Root>
  )
}

interface Props {
  width: number
  setWidth: Dispatch<SetStateAction<number>>
}

const minWidth = 200
const maxWidth = 500

export default KeyDrawer
