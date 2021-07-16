import { FC, useState } from 'react'
import { Dialog, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import { Button } from 'components/shared'
import ConnectionNameInputs from './Inputs'
import { DialogContent, DialogActions, DialogTitle, CloseDialogButton } from './elements'

const CreateConnectionDialog: FC = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle disableTypography>
          <h2>Create a new connection</h2>
          <CloseDialogButton aria-label='close' onClick={handleClose}>
            <CloseIcon />
          </CloseDialogButton>
        </DialogTitle>
        <DialogContent dividers>
          <ConnectionNameInputs />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text='Connect' />
        </DialogActions>
      </Dialog>
    </>
  )
}

export interface DialogTitleProps {
  id: string
  onClose: () => void
}

export default CreateConnectionDialog
