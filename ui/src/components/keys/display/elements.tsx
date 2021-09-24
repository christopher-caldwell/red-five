import styled from 'styled-components'
import { FormControlLabel } from '@material-ui/core'

import { BaseTextField } from '@/components/shared'

interface KeyTitleProps {
  padding?: string
}
export const KeyTitle = styled.span<KeyTitleProps>`
  margin-left: 10px;
  ${({ padding }) => (padding ? `padding: ${padding};` : '')}
`
export const KeyTitleWrapper = styled.h2`
  color: ${({ theme }) => theme.brandColor};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const ViewAsJsonFormControl = styled(FormControlLabel)`
  width: 100%;
  padding-top: 2%;
`

export const HighlightContainer = styled.div`
  width: 100%;
  height: 50vh;
`

export const TtlEditor = styled(BaseTextField)`
  margin-left: 20px;
  width: 15%;
`
