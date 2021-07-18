import { TreeView } from '@material-ui/lab'
import styled from 'styled-components'

export const Root = styled.div`
  z-index: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  & * {
    user-select: none;
  }
`

export const Dragger = styled.div`
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
