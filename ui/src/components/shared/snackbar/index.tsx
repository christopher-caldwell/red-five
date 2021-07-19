import { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react'
import { Alert, AlertProps } from '@material-ui/lab'
import { Snackbar as MuiSnackbar } from '@material-ui/core'

const Snackbar: FC<Props> = ({ severity, message, isOpen, setIsOpen, autoHideDuration = 4000 }) => {
  const handleClose = (_?: SyntheticEvent, reason?: string) => {
    // Prevents clicking away to close -- not sure if this will stay
    if (reason === 'clickaway') return
    setIsOpen(false)
  }

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
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
  autoHideDuration?: number
}

export default Snackbar
