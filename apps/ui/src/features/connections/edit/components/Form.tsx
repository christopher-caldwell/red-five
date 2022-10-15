import { Dispatch, FC, SetStateAction } from 'react'
import { Alert, Dialog, DialogTitle, Button as MuiButton } from '@mui/material'
import { MuiForm, Config } from '@caldwell619/mui-form-generator'

import { Button } from '@_ui/components'
import { DialogContent, DialogActions } from './elements'
import { useEditConnection } from '../api'
import { Connection } from '@_ui/generated'

export const ConnectionEdit: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { isError, isLoading, create } = useEditConnection()

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Edit Connection</DialogTitle>
      <DialogContent dividers>
        {isError ? (
          <Alert variant='filled' severity='error'>
            Something went wrong. If this issue persists, please contact support
          </Alert>
        ) : null}

        <MuiForm inputs={inputs} gridSpacing={2} />
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={() => setIsOpen(false)} variant='contained' color='secondary'>
          Cancel
        </MuiButton>
        <Button onClick={create} text='Save' isLoading={isLoading} />
      </DialogActions>
    </Dialog>
  )
}

const inputs: Config<Connection>[] = [
  {
    type: 'text',
    config: {
      textFieldProps: {
        required: true
      },
      control: {
        rules: {
          required: { value: true, message: 'This is required' }
        },
        name: 'name',
        label: 'Connection Name'
      }
    }
  },
  {
    type: 'text',
    config: {
      textFieldProps: {
        required: true
      },
      control: {
        rules: {
          required: { value: true, message: 'This is required' }
        },
        name: 'host',
        label: 'Host'
      }
    }
  },
  {
    type: 'text',
    config: {
      textFieldProps: {
        type: 'number',
        autoComplete: 'off'
      },
      control: {
        rules: {
          min: 0,
          pattern: /$[0-9]/
        },
        name: 'port',
        label: 'Port'
      }
    }
  },
  {
    type: 'text',
    config: {
      control: {
        name: 'password',
        label: 'Auth'
      }
    }
  }
]

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
