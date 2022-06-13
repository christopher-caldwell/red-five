import { Dispatch, SetStateAction, useCallback } from 'react'

import { useInput } from '@/hooks/useInput'
import { ConnectionInput, useCreateConnectionMutation } from '@/generated'
import { useInvalidateAllKeys } from '@/utils'

export const useCreateConnection = (handleClose: Dispatch<SetStateAction<boolean>>) => {
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

  return {
    create,
    isError,
    isLoading,
    connectionNameBind,
    hostBind,
    portBind,
    passwordBind
  }
}
