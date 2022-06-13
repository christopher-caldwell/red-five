import { Dispatch, FC, SetStateAction } from 'react'
import { Alert } from '@mui/material'

import { Button, BaseTextField, PasswordTextField } from '@/components'
import { DialogContent, DialogActions } from './elements'
import { useCreateConnection } from '../api'

export const ConnectionNameInputs: FC<Props> = ({ handleClose }) => {
  const { isError, isLoading, hostBind, portBind, passwordBind, connectionNameBind, create } =
    useCreateConnection(handleClose)

  return (
    <>
      <DialogContent dividers>
        {isError ? (
          <Alert variant='filled' severity='error'>
            Something went wrong. If this issue persists, please contact support
          </Alert>
        ) : null}

        <form>
          <BaseTextField label='Display name' required {...connectionNameBind} />
          <BaseTextField label='Host' placeholder='localhost' required {...hostBind} />
          <BaseTextField
            label='Port'
            placeholder='6379'
            type='number'
            required
            inputProps={{
              max: 65535
            }}
            {...portBind}
          />
          <PasswordTextField autoComplete='new-password' label='Connection Password' {...passwordBind} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={create} text='Connect' isLoading={isLoading} />
      </DialogActions>
    </>
  )
}

interface Props {
  handleClose: Dispatch<SetStateAction<boolean>>
}
