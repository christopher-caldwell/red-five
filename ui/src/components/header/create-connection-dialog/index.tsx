import { FC, useState, useCallback } from 'react'
import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import UpArrowIcon from '@mui/icons-material/ArrowUpward'

import { useActiveConnectionQuery } from '@/generated'
import ConnectionNameInputs from './Inputs'
import { DialogTitle, CloseDialogButton, IndicatorIconContainer } from './elements'

const CreateConnectionDialog: FC = () => {
  const { data } = useActiveConnectionQuery()
  const connectionName = data?.activeConnection?.name
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
        <AddIcon />
        {connectionName ? null : (
          <IndicatorIconContainer>
            <UpArrowIcon />
          </IndicatorIconContainer>
        )}
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle disableTypography>
          <h2>Create a new connection</h2>
          <CloseDialogButton aria-label='close' onClick={handleClose}>
            <CloseIcon />
          </CloseDialogButton>
        </DialogTitle>
        <ConnectionNameInputs handleClose={handleClose} />
      </Dialog>
    </>
  )
}

export interface DialogTitleProps {
  id: string
  onClose: () => void
}

export default CreateConnectionDialog
