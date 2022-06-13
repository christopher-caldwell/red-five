import { FC, SetStateAction, Dispatch } from 'react'
import SearchIcon from '@mui/icons-material/Search'

import { useActiveConnectionQuery, useNamespacedKeysQuery } from '@/generated'
import { useInput } from '@/hooks/useInput'
import { FlexContainer, InputWithIcon } from '@/components'
import KeyDrawer from './key-drawer'
import SpeedDials from './speed-dial'
import KeyTree from './key-tree'

const Explorer: FC<Props> = props => {
  const { data: activeConnectionData } = useActiveConnectionQuery()
  const { data, isLoading, refetch } = useNamespacedKeysQuery({}, { enabled: !!activeConnectionData })
  const [searchTerm, searchTermBind] = useInput('')

  const namespaces = data?.namespacedKeys.namespaced || []

  return (
    <KeyDrawer {...props}>
      <FlexContainer align='flex-start' justify='space-between'>
        <FlexContainer width='80%' justify='flex-start' direction='column'>
          <InputWithIcon disabled={isLoading} icon={<SearchIcon />} bind={searchTermBind} label='Search Keys' />
          <KeyTree isLoading={isLoading} searchTerm={searchTerm} namespaces={namespaces} />
        </FlexContainer>
        <FlexContainer width='20%'>
          <SpeedDials refresh={refetch} />
        </FlexContainer>
      </FlexContainer>
    </KeyDrawer>
  )
}

interface Props {
  width: number
  setWidth: Dispatch<SetStateAction<number>>
}

export default Explorer
