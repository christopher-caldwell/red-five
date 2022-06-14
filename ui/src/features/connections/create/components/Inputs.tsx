import { Dispatch, FC, SetStateAction } from 'react'
import { Alert } from '@mui/material'
import { MuiForm, Config } from '@caldwell619/mui-form-generator'

import { Button } from '@/components'
import { DialogContent, DialogActions } from './elements'
import { useCreateConnection } from '../api'
import { Connection } from '@/generated'

export const ConnectionNameInputs: FC<Props> = ({ handleClose }) => {
  const { isError, isLoading, create } = useCreateConnection(handleClose)

  return (
    <>
      <DialogContent dividers>
        {isError ? (
          <Alert variant='filled' severity='error'>
            Something went wrong. If this issue persists, please contact support
          </Alert>
        ) : null}

        <MuiForm inputs={inputs} gridSpacing={2} />
      </DialogContent>
      <DialogActions>
        <Button onClick={create} text='Connect' isLoading={isLoading} />
      </DialogActions>
    </>
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
          pattern: /^[0-9]*$/
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
  handleClose: Dispatch<SetStateAction<boolean>>
}
