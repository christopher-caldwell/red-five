import { FC, useRef, useState } from 'react'
import { Drawer } from '@material-ui/core'

import styles from './drawer.module.sass'
import { Root, Dragger } from './elements'

let isResizing = false
const KeyDrawer: FC = ({ children }) => {
  const [width, setWidth] = useState(300)
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

  console.log('width', sidebarCurrent?.style.width)

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

const minWidth = 200
const maxWidth = 500

export default KeyDrawer
