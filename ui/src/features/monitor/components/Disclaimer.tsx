import { FC, useCallback, useState } from 'react'
import { Dialog, DialogContent, IconButton, DialogContentText, DialogActions } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import { Button } from '@/components'
import { DialogTitle } from '@/features/connections'

export const MonitoringDisclaimer: FC = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          <h2>About monitoring</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Monitoring is a somewhat intensive process. It will slow down the performance of your instance, so choose
            when it's used carefully.
          </DialogContentText>
          <DialogContentText>
            Messages are not persisted, and will be lost when leaving this page. If you'd like that to be different,
            please fill out an{' '}
            <a
              href='https://github.com/christopher-caldwell/red-five/issues/new'
              target='_blank'
              rel='noopener noreferrer'
            >
              issue
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text='Got it' />
        </DialogActions>
      </Dialog>
    </>
  )
}
