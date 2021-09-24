import styled from 'styled-components'
import {
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  IconButton as MuiIconButton
} from '@material-ui/core'

import { verticalBounceKeyFrame } from '@/constants/styles'

export const DialogContent = styled(MuiDialogContent)`
  padding: 16px;
`

export const DialogActions = styled(MuiDialogActions)`
  margin: 0;
  padding: 1%;
`

export const DialogTitle = styled(MuiDialogTitle)`
  margin: 0;
  padding: 16px;
`

export const CloseDialogButton = styled(MuiIconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: #9e9e9e;
`

export const IndicatorIconContainer = styled.div`
  position: absolute;
  /* Matches padding of icon button */
  right: 12px;
  bottom: -50px;
  animation: ${verticalBounceKeyFrame} 1s linear infinite;
`
