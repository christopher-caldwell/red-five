import { FC } from 'react'
import RemoveIcon from '@mui/icons-material/Delete'
import { CircularProgress, IconButton } from '@mui/material'

import { Snackbar } from '@_ui/components'
import { useRemoveConnection } from '../api'

export const RemoveConnection: FC<Props> = ({ id }) => {
  const { isLoading, handleRemove, isSnackbarOpen, setIsSnackbarOpen, isError } = useRemoveConnection(id)

  return (
    <>
      <IconButton onClick={handleRemove}>
        {isLoading ? <CircularProgress variant='indeterminate' size={16} /> : <RemoveIcon />}
      </IconButton>
      <Snackbar
        setIsOpen={setIsSnackbarOpen}
        isOpen={isSnackbarOpen}
        severity={!!isError ? 'error' : 'success'}
        message={isError ? 'Something went wrong' : 'Done'}
      />
    </>
  )
}

interface Props {
  id: string
}
