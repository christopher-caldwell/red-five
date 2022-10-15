import { FC, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, LinearProgress, Alert } from '@mui/material'
import { MuiFormProvider } from '@caldwell619/mui-form-generator'

import { useConnectionQuery } from '@_ui/generated'
import { ConnectionEdit } from './components'

export const EditConnection: FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading } = useConnectionQuery({ id })
  const connection = data?.connection
  if (isLoading) return <LinearProgress />
  if (!connection) return <Alert severity='error'>Cannot find the connection</Alert>
  return (
    <MuiFormProvider props={{ defaultValues: connection }}>
      <>
        <IconButton onClick={() => setIsOpen(true)}>
          <EditIcon />
        </IconButton>
        <ConnectionEdit isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </MuiFormProvider>
  )
}

interface Props {
  id: string
}
