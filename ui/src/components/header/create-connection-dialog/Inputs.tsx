import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import Alert from '@material-ui/lab/Alert'

import { useInput } from '@/hooks/useInput'
import { Button, BaseTextField, PasswordTextField } from '@/components/shared'
import { ConnectionInput, useCreateConnectionMutation } from '@/generated'
import { DialogContent, DialogActions } from './elements'
import { useInvalidateAllKeys } from '@/utils'

const ConnectionNameInputs: FC<Props> = ({ handleClose }) => {
  const invalidateAllKeys = useInvalidateAllKeys()
  const {
    mutate: createConnection,
    isLoading,
    isError
  } = useCreateConnectionMutation({
    onSuccess() {
      invalidateAllKeys()
      handleClose(false)
    }
  })

  const [connectionName, connectionNameBind] = useInput('')
  const [host, hostBind] = useInput('')
  const [port, portBind] = useInput('')
  const [password, passwordBind] = useInput('')

  const create = useCallback(() => {
    const connection: ConnectionInput = {
      host,
      port: Number(port),
      name: connectionName,
      protocol: 'http',
      password: password || undefined
    }
    createConnection({ connection })
  }, [createConnection, connectionName, port, host, password])

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

export default ConnectionNameInputs
