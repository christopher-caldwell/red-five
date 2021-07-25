import { FC, useState, useCallback } from 'react'
import RemoveIcon from '@material-ui/icons/Delete'
import { CircularProgress, IconButton } from '@material-ui/core'

import { useRemoveConnectionMutation } from 'generated'
import { Snackbar } from 'components/shared'
import { useInvalidateAllKeys } from 'utils'

const RemoveConnection: FC<Props> = ({ id }) => {
  const invalidateAllKeys = useInvalidateAllKeys()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { mutate, isLoading, isError } = useRemoveConnectionMutation({
    onSettled() {
      invalidateAllKeys()
      setIsSnackbarOpen(true)
    }
  })

  const handleRemove = useCallback(async () => {
    mutate({ id: id as string })
  }, [mutate, id])

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
  id: string | number
}

export default RemoveConnection
