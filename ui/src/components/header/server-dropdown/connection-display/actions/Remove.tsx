import { FC, useState, useCallback } from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Delete'

import { useRemoveConnectionMutation, useSettingsQuery } from 'generated'
import { Snackbar, RemovalPrompt } from 'components/shared'
import { useInvalidateAllKeys } from 'utils'

const RemoveConnection: FC<Props> = ({ id }) => {
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false)
  const { data } = useSettingsQuery()
  const settings = data?.settings
  const invalidateAllKeys = useInvalidateAllKeys()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const willPromptBeforeDelete = settings?.willPromptBeforeDelete
  const { mutate, isLoading, isError } = useRemoveConnectionMutation({
    onSettled() {
      invalidateAllKeys()
      setIsSnackbarOpen(true)
    }
  })

  const showDeleteModal = useCallback(() => {
    setIsPromptDialogOpen(true)
  }, [])
  const closeDeleteModal = useCallback(() => {
    setIsPromptDialogOpen(false)
  }, [])

  const handleRemove = useCallback(async () => {
    mutate({ id: id as string })
  }, [mutate, id])

  return (
    <>
      <IconButton onClick={willPromptBeforeDelete ? showDeleteModal : handleRemove}>
        {isLoading ? <CircularProgress variant='indeterminate' size={16} /> : <RemoveIcon />}
      </IconButton>
      <Snackbar
        setIsOpen={setIsSnackbarOpen}
        isOpen={isSnackbarOpen}
        severity={!!isError ? 'error' : 'success'}
        message={isError ? 'Something went wrong' : 'Done'}
      />
      <RemovalPrompt
        isOpen={isPromptDialogOpen}
        handleClose={closeDeleteModal}
        remove={handleRemove}
        isLoading={isLoading}
      />
    </>
  )
}

interface Props {
  id: string | number
}

export default RemoveConnection
