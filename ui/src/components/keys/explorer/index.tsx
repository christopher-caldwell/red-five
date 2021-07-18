import { FC, useMemo } from 'react'
import { IconButton, LinearProgress } from '@material-ui/core'
import { TreeItem } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import RefreshIcon from '@material-ui/icons/Refresh'
import Fuse from 'fuse.js'
import { useSetRecoilState } from 'recoil'

import { activeKeyAtom } from 'store'
import { useNamespacedKeysQuery } from 'generated'
import { useInput } from 'hooks/useInput'
import { FlexContainer, InputWithIcon } from 'components/shared'
import KeyDrawer from './KeyDrawer'
import { KeysTreeView } from './elements'

const Explorer: FC = () => {
  const setActiveKey = useSetRecoilState(activeKeyAtom)
  const { data, isLoading, refetch } = useNamespacedKeysQuery()
  const [searchTerm, searchTermBind] = useInput('')
  const namespaces = useMemo(() => data?.namespacedKeys.namespaced || [], [data])

  const NamespaceSearch = useMemo(() => new Fuse(namespaces, { keys: ['keys.key'], includeScore: true }), [namespaces])
  const results = handleSearchResults(NamespaceSearch, searchTerm, namespaces)

  return (
    <KeyDrawer>
      <FlexContainer width='100%' justify='flex-start' direction='column'>
        <FlexContainer>
          <InputWithIcon icon={<SearchIcon />} bind={searchTermBind} label='Search Keys' />
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </FlexContainer>
        {isLoading ? <LinearProgress variant='indeterminate' /> : null}
        <KeysTreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
          {results.map((namespace, index) => {
            const KeySearch = new Fuse(namespace?.keys || [], { keys: ['key'], includeScore: true })
            const keyResults = handleSearchResults(KeySearch, searchTerm, namespace?.keys || [])
            return (
              <TreeItem nodeId={`${namespace?.name}-${index}`} key={namespace?.name} label={namespace?.name}>
                {keyResults.map(key => (
                  <TreeItem
                    nodeId={`${namespace?.name}-${key}`}
                    key={key?.key}
                    label={key?.key}
                    onClick={() => setActiveKey(key?.key)}
                  />
                ))}
              </TreeItem>
            )
          })}
        </KeysTreeView>
      </FlexContainer>
    </KeyDrawer>
  )
}

const handleSearchResults = function <TData>(
  FuseSearch: Fuse<TData>,
  searchTerm: string,
  originalSet: TData[]
): TData[] {
  if (searchTerm === '') return originalSet
  const rawResults = FuseSearch.search(searchTerm)
  const results: TData[] = []
  for (const rawResult of rawResults) {
    const { item, score = 0 } = rawResult
    if (!item) continue
    if (score > 0.4) continue
    results.push(item)
  }
  return results
}

export default Explorer
