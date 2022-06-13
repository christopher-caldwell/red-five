import { FC, Dispatch, SetStateAction } from 'react'
import { Snackbar as MuiSnackbar, Alert, AlertProps } from '@mui/material'

export const Snackbar: FC<Props> = ({ severity, message, isOpen, setIsOpen, autoHideDuration = 1500 }) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert variant='filled' onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

interface Props {
  message: string
  severity: AlertProps['severity']
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  autoHideDuration?: number | null
}
