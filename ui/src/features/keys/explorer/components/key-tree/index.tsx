import { FC } from 'react'
import { TreeItem } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Fuse from 'fuse.js'

import { KeysTreeView, NoResultsAlert, LoadingSpinner } from './elements'
import { useKeyTree, handleSearchResults, Props } from './useKeyTree'
import styles from './index.module.sass'

export const KeyTree: FC<Props> = ({ namespaces, searchTerm, isLoading }) => {
  const { results, handleKeySelect } = useKeyTree(namespaces, searchTerm)

  if (isLoading) return <LoadingSpinner variant='indeterminate' />
  return (
    <KeysTreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {results.length ? (
        results.map((namespace, index) => {
          const KeySearch = new Fuse(namespace?.keys || [], { keys: ['key'], includeScore: true })
          const keyResults = handleSearchResults(KeySearch, searchTerm, namespace?.keys || [])
          return (
            <TreeItem nodeId={namespace?.name} key={index} label={namespace?.name}>
              {keyResults.map((key, subIndex) => (
                <TreeItem
                  classes={{ ...styles }}
                  nodeId={`${namespace?.name}-${subIndex}`}
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
