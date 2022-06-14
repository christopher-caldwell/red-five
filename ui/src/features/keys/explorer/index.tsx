import { FC, SetStateAction, Dispatch } from 'react'
import SearchIcon from '@mui/icons-material/Search'

import { useActiveConnectionQuery, useNamespacedKeysQuery } from '@/generated'
import { useInput } from '@/hooks/useInput'
import { InputWithIcon } from '@/components'
import { SpeedDials, KeyDrawer, KeyTree } from './components'
import { Grid } from '@mui/material'

export const KeyExplorer: FC<Props> = props => {
  const { data: activeConnectionData } = useActiveConnectionQuery()
  const { data, isLoading, refetch } = useNamespacedKeysQuery({}, { enabled: !!activeConnectionData })
  const [searchTerm, searchTermBind] = useInput('')

  const namespaces = data?.namespacedKeys.namespaced || []

  return (
    <KeyDrawer {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputWithIcon disabled={isLoading} icon={<SearchIcon />} bind={searchTermBind} label='Search Keys' />
        </Grid>
        <Grid item xs={12}>
          <SpeedDials refresh={refetch} />
        </Grid>
        <Grid item xs={12}>
          <KeyTree isLoading={isLoading} searchTerm={searchTerm} namespaces={namespaces} />
        </Grid>
      </Grid>
    </KeyDrawer>
  )
}

interface Props {
  width: number
  setWidth: Dispatch<SetStateAction<number>>
}
