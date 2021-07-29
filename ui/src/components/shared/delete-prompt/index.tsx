import { FC } from 'react'
import { Dialog, DialogContent, DialogActions, FormControl, FormControlLabel, Checkbox } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { DialogTitle, CloseDialogButton } from 'components/header/create-connection-dialog/elements'

import { Button } from 'components/shared'
import { useUpdateSettings } from 'utils'

export const RemovalPrompt: FC<Props> = ({ isOpen, handleClose, remove, isLoading }) => {
  const { settings, updateSettings } = useUpdateSettings()
  const willPromptBeforeDelete = settings?.willPromptBeforeDelete
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle disableTypography>
        <h2>Create a new connection</h2>
        <CloseDialogButton aria-label='close' onClick={handleClose}>
          <CloseIcon />
        </CloseDialogButton>
      </DialogTitle>
      <DialogContent>
        <h2>Are you sure you want to delete this connection?</h2>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={willPromptBeforeDelete}
                onChange={(_, checked) => updateSettings('willPromptBeforeDelete', !checked)}
              />
            }
            label='Do not show this message in the future'
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={remove} text='Remove' isLoading={isLoading} />
      </DialogActions>
    </Dialog>
  )
}

interface Props {
  isOpen: boolean
  handleClose: () => void
  remove: () => void | Promise<void>
  isLoading?: boolean
}
