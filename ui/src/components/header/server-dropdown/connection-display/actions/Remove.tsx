import { FC } from 'react'
import RemoveIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'

const EditConnection: FC<Props> = ({ id }) => {
  return (
    <IconButton>
      <RemoveIcon />
    </IconButton>
  )
}

interface Props {
  id: string | number
}

export default EditConnection
