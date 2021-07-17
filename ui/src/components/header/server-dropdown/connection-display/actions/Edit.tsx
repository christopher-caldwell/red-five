import { FC } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

const EditConnection: FC<Props> = ({ id }) => {
  return (
    <IconButton>
      <EditIcon />
    </IconButton>
  )
}

interface Props {
  id: string | number
}

export default EditConnection
