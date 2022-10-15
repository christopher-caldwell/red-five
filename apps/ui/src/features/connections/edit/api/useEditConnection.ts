import { useContext } from 'react'

import { ConnectionInput, useCreateConnectionMutation } from '@_ui/generated'
import { useInvalidateAllKeys } from '@_ui/utils'
import { UseFormReturn } from 'react-hook-form'
import { MuiFormContext } from '@caldwell619/mui-form-generator'

export const useEditConnection = () => {
  const invalidateAllKeys = useInvalidateAllKeys()
  const {
    mutate: createConnection,
    isLoading,
    isError
  } = useCreateConnectionMutation({
    onSuccess() {
      invalidateAllKeys()
      // handleClose(false)
    }
  })
  const { handleSubmit } = useContext<UseFormReturn<ConnectionInput>>(MuiFormContext)
  const onSubmit = ({ host, name, port, protocol = 'https', password }: ConnectionInput) => {
    const connectionInput: ConnectionInput = {
      host,
      port: Number(port),
      name,
      protocol,
      password
    }
    createConnection({ connection: connectionInput })
  }

  return {
    create: handleSubmit(onSubmit),
    isError,
    isLoading
  }
}
