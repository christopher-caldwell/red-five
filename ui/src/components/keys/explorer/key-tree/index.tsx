import { FC, useMemo, useCallback } from 'react'
import { TreeItem } from '@material-ui/lab'
import { useHistory, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Fuse from 'fuse.js'

import { NameSpacedKeys, Key } from 'generated'
import { activeKeyAtom } from 'store'
import { Routes } from 'router/routes'
import { KeysTreeView, NoResultsAlert, LoadingSpinner } from './elements'

const KeyTree: FC<Props> = ({ namespaces, searchTerm, isLoading }) => {
  const { pathname } = useLocation()
  const { push } = useHistory()
  const setActiveKey = useSetRecoilState(activeKeyAtom)

  const NamespaceSearch = useMemo(() => new Fuse(namespaces, { keys: ['keys.key'], includeScore: true }), [namespaces])
  const results = handleSearchResults(NamespaceSearch, searchTerm, namespaces)
  const handleKeySelect = useCallback(
    (key?: string) => {
      if (!key) return
      setActiveKey(key)
      if (pathname === Routes.Keys) return
      push(Routes.Keys)
    },
    [setActiveKey, push, pathname]
  )

  if (isLoading) return <LoadingSpinner variant='indeterminate' />
  return (
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
                  onClick={() => handleKeySelect(key?.key)}
                />
              ))}
            </TreeItem>
          )
        })
      ) : (
        <NoResultsAlert variant='filled' severity='warning'>
          No Results
        </NoResultsAlert>
      )}
    </KeysTreeView>
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

type Namespace = Pick<NameSpacedKeys, 'name'> & {
  keys: Pick<Key, 'key'>[]
}
interface Props {
  namespaces: Namespace[]
  searchTerm: string
  isLoading: boolean
}

export default KeyTree
