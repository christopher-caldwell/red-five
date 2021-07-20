import { FC, useCallback, useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useQueryClient } from 'react-query'
import { Dialog, DialogActions, Checkbox, DialogContent, FormControlLabel } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { useSetSettingsMutation, useSettingsQuery } from 'generated'
import { DialogTitle, CloseDialogButton } from 'components/header/create-connection-dialog/elements'
import { Button } from 'components/shared'

const settingsKey = useSettingsQuery.getKey()

const DeletePrompt: FC<Props> = ({ removeKey, open, setOpen }) => {
  const queryClient = useQueryClient()
  const [willSuppressDialogs, setWillSuppressDialogs] = useState(false)

  const { mutateAsync } = useSetSettingsMutation({
    onSuccess() {
      queryClient.invalidateQueries(settingsKey)
    }
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const { data } = useSettingsQuery()
  const settings = data?.settings

  const toggleSuppressDialog = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!settings) return
      await mutateAsync({ settings: { ...settings, willPromptBeforeDelete: event.target.checked } })
      setWillSuppressDialogs(event.target.checked)
    },
    [mutateAsync, settings]
  )

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle disableTypography>
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
        <Button text='Subscribe' onClick={handleClose} />
      </DialogActions>
    </Dialog>
  )
}

interface Props {
  removeKey: () => Promise<void>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default DeletePrompt
