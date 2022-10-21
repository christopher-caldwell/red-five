import { FC, PropsWithChildren, useRef, Dispatch, SetStateAction } from 'react'
import { Drawer, colors } from '@mui/material'

import { Root, Dragger } from './key-tree/elements'

let isResizing = false
export const KeyDrawer: FC<PropsWithChildren<Props>> = ({ width, setWidth, children }) => {
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
        PaperProps={{
          sx: {
            padding: '5% 1%',
            width,
            backgroundColor: colors.grey[900]
          }
        }}
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
