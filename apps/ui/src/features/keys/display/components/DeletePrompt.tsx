import { FC, useCallback, useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Dialog, DialogActions, Checkbox, DialogContent, FormControlLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { DialogTitle, CloseDialogButton } from '@_ui/features/connections'
import { Button } from '@_ui/components'
import { useUpdateSettings } from '@_ui/utils/settings'

export const DeletePrompt: FC<Props> = ({ removeKey, open, setOpen }) => {
  const [willSuppressDialogs, setWillSuppressDialogs] = useState(false)

  const { updateSettings } = useUpdateSettings()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const toggleSuppressDialog = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings('willPromptBeforeDelete', event.target.checked)
      setWillSuppressDialogs(event.target.checked)
    },
    [setWillSuppressDialogs, updateSettings]
  )

  const handleDelete = useCallback(() => {
    removeKey()
    handleClose()
  }, [removeKey, handleClose])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <h2>Are you sure you want to delete this key?</h2>
        <CloseDialogButton aria-label='close' onClick={handleClose}>
          <CloseIcon />
        </CloseDialogButton>
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Checkbox checked={willSuppressDialogs} onChange={toggleSuppressDialog} name='checkedA' />}
          label='Suppress this dialog in the future?'
        />
      </DialogContent>
      <DialogActions>
        <Button text='Cancel' onClick={handleClose} />
        <Button text='Delete' onClick={handleDelete} />
      </DialogActions>
    </Dialog>
  )
}

interface Props {
  removeKey: () => Promise<void>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
