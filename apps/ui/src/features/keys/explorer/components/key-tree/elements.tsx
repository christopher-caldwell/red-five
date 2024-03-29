import { styled } from '@mui/material'
import { LinearProgress, Alert } from '@mui/material'
import { TreeView } from '@mui/lab'

import { warning } from '@_ui/constants/styles'
import { FlexContainer } from '@_ui/components'

export const Root = styled(FlexContainer)`
  z-index: 1;
  overflow: hidden;
  position: relative;
  & * {
    user-select: none;
  }
`

export const Dragger = styled('div')`
  width: 5px;
  cursor: ew-resize;
  padding: 4px 0 0;
  border-top: 1px solid #ddd;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f4f7f9;
`

export const KeysTreeView = styled(TreeView)`
  padding-top: 20px;
  width: 100%;
`

export const NoResultsAlert = styled(Alert)`
  background-color: ${warning};
`

export const LoadingSpinner = styled(LinearProgress)`
  margin-top: 5%;
  width: 100%;
`
