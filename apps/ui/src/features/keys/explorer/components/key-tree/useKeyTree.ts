import { useMemo, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Fuse from 'fuse.js'

import { NameSpacedKeys, Key } from '@_ui/generated'
import { activeKeyAtom } from '@_ui/store'
import { Routes } from '@_ui/router/routes'

export const useKeyTree = (namespaces: Props['namespaces'], searchTerm: Props['searchTerm']) => {
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
  return {
    results,
    handleKeySelect
  }
}

export const handleSearchResults = function <TData>(
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
export interface Props {
  namespaces: Namespace[]
  searchTerm: string
  isLoading: boolean
}
