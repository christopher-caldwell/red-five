import { FC, SetStateAction, Dispatch, useMemo } from 'react'
import { LinearProgress } from '@material-ui/core'
import { TreeItem } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Fuse from 'fuse.js'
import { useSetRecoilState } from 'recoil'

import SpeedDials from 'components/shared/speed-dial'
import { activeKeyAtom } from 'store'
import { useNamespacedKeysQuery } from 'generated'
import { useInput } from 'hooks/useInput'
import { FlexContainer, InputWithIcon } from 'components/shared'
import KeyDrawer from './KeyDrawer'
import { KeysTreeView, NoResultsAlert } from './elements'

const Explorer: FC<Props> = props => {
  const setActiveKey = useSetRecoilState(activeKeyAtom)
  const { data, isLoading, refetch } = useNamespacedKeysQuery()
  const [searchTerm, searchTermBind] = useInput('')
  const namespaces = useMemo(() => data?.namespacedKeys.namespaced || [], [data])

  const NamespaceSearch = useMemo(() => new Fuse(namespaces, { keys: ['keys.key'], includeScore: true }), [namespaces])
  const results = handleSearchResults(NamespaceSearch, searchTerm, namespaces)

  return (
    <KeyDrawer {...props}>
      <FlexContainer align='flex-start' justify='space-between'>
        <FlexContainer width='80%' justify='flex-start' direction='column'>
          <InputWithIcon icon={<SearchIcon />} bind={searchTermBind} label='Search Keys' />

          {isLoading ? <LinearProgress variant='indeterminate' /> : null}
          <KeysTreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            {results.length ? (
              results.map((namespace, index) => {
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
              })
            ) : (
              <NoResultsAlert severity='warning'>No Results</NoResultsAlert>
            )}
          </KeysTreeView>
        </FlexContainer>
        <FlexContainer width='20%'>
          <SpeedDials refresh={refetch} />
        </FlexContainer>
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

interface Props {
  width: number
  setWidth: Dispatch<SetStateAction<number>>
}

export default Explorer
