import { ChangeEvent, FC, useCallback } from 'react'
import { Checkbox } from '@material-ui/core'
import { useQueryClient } from 'react-query'

import { useMakConnectionActiveMutation, Connection } from 'generated'
import { FlexContainer } from 'components/shared'

const MakeActive: FC<Connection> = ({ id, isActive }) => {
  const queryClient = useQueryClient()
  const { mutate } = useMakConnectionActiveMutation({
    onSuccess() {
      queryClient.invalidateQueries()
    }
  })

  const makeConnectionActive = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) return
      mutate({ id })
    },
    [mutate, id]
  )

  return (
    <FlexContainer width='100%'>
      <Checkbox onChange={makeConnectionActive} checked={isActive} />
    </FlexContainer>
  )
}

export default MakeActive
