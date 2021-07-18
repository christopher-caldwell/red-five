import { ChangeEvent, FC, useCallback } from 'react'
import { Checkbox } from '@material-ui/core'

import {
  useMakConnectionActiveMutation,
  useConnectionsQuery,
  Connection,
  useNamespacedKeysQuery,
  useActiveConnectionQuery
} from 'generated'
import { FlexContainer } from 'components/shared'
import { useQueryClient } from 'react-query'

const connectionsKey = useConnectionsQuery.getKey()
const namespacedKeys = useNamespacedKeysQuery.getKey()
const activeConnectionKey = useActiveConnectionQuery.getKey()

const MakeActive: FC<Connection> = ({ id, isActive }) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMakConnectionActiveMutation({
    onSuccess() {
      queryClient.invalidateQueries(connectionsKey)
      queryClient.invalidateQueries(namespacedKeys)
      queryClient.invalidateQueries(activeConnectionKey)
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
