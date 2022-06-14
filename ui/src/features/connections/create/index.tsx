import { FC, useState, useCallback } from 'react'
import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import UpArrowIcon from '@mui/icons-material/ArrowUpward'

import { useActiveConnectionQuery } from '@/generated'
import { ConnectionNameInputs, DialogTitle, CloseDialogButton, IndicatorIconContainer } from './components'
import { MuiFormProvider } from '@caldwell619/mui-form-generator'

export const CreateConnectionDialog: FC = () => {
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
        <DialogTitle>
          <h2>Create a new connection</h2>
          <CloseDialogButton aria-label='close' onClick={handleClose}>
            <CloseIcon />
          </CloseDialogButton>
        </DialogTitle>
        <MuiFormProvider props={{ defaultValues: {} }}>
          <ConnectionNameInputs handleClose={handleClose} />
        </MuiFormProvider>
      </Dialog>
    </>
  )
}

export interface DialogTitleProps {
  id: string
  onClose: () => void
}

export * from './components'
export * from './api'
