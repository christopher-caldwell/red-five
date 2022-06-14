import { FC } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

// TODO: Connection Query to get the connection by ID to edit
export const EditConnection: FC<Props> = ({ id }) => {
  return (
    <IconButton>
      <EditIcon />
    </IconButton>
  )
}

interface Props {
  id: string | number
}
