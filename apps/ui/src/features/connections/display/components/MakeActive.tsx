import { FC } from 'react'
import { Checkbox } from '@mui/material'

import { Connection } from '@_ui/generated'
import { FlexContainer } from '@_ui/components'
import { useMakeConnectionActive } from '../api'

export const MakeActive: FC<Connection> = ({ id, isActive }) => {
  const { makeConnectionActive } = useMakeConnectionActive(id)
  return (
    <FlexContainer width='70%'>
      <Checkbox onChange={makeConnectionActive} checked={isActive} />
    </FlexContainer>
  )
}
