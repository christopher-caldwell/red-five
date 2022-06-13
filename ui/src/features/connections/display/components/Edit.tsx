import { FC } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

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
