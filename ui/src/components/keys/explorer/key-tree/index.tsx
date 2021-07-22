import { FC } from 'react'
import { TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Fuse from 'fuse.js'

import { KeysTreeView, NoResultsAlert, LoadingSpinner } from './elements'
import { useKeyTree, handleSearchResults, Props } from './useKeyTree'

const KeyTree: FC<Props> = ({ namespaces, searchTerm, isLoading }) => {
  const { results, handleKeySelect } = useKeyTree(namespaces, searchTerm)

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

export default KeyTree
