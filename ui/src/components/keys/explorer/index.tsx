import { FC, SetStateAction, Dispatch } from 'react'
import SearchIcon from '@material-ui/icons/Search'

import SpeedDials from 'components/shared/speed-dial'
import { useActiveConnectionQuery, useNamespacedKeysQuery } from 'generated'
import { useInput } from 'hooks/useInput'
import { FlexContainer, InputWithIcon } from 'components/shared'
import KeyDrawer from './KeyDrawer'
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
