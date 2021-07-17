import { ChangeEvent, FC, useCallback } from 'react'
import { Checkbox } from '@material-ui/core'

import { useMakConnectionActiveMutation, useConnectionsQuery, Connection } from 'generated'
import { FlexContainer } from 'components/shared'
import { useQueryClient } from 'react-query'

const MakeActive: FC<Connection> = ({ id, isActive }) => {
  const queryClient = useQueryClient()
  const connectionsKey = useConnectionsQuery.getKey()
  const { mutateAsync } = useMakConnectionActiveMutation({
    onSuccess() {
      queryClient.invalidateQueries(connectionsKey)
    }
  })

  const makeConnectionActive = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) return
      console.log('will run')
      await mutateAsync({ id })
    },
    [mutateAsync, id]
  )

  return (
    <FlexContainer width='100%'>
      <Checkbox onChange={makeConnectionActive} checked={isActive} />
    </FlexContainer>
  )
}

export default MakeActive
