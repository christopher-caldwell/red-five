import { styled } from '@mui/material'
import { FormControlLabel } from '@mui/material'

import { BaseTextField } from '@/components'

interface KeyTitleProps {
  padding?: string
}
export const KeyTitle = styled('span')<KeyTitleProps>`
  color: ${({
    theme: {
      palette: { text }
    }
  }) => text.primary};
  margin-left: 10px;
  ${({ padding }) => (padding ? `padding: ${padding};` : '')}
`
export const KeyTitleWrapper = styled('h2')`
  color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`

export const ViewAsJsonFormControl = styled(FormControlLabel)`
  width: 100%;
  padding-top: 2%;
`

export const HighlightContainer = styled('div')`
  width: 100%;
  max-height: 55vh;
  overflow: scroll;
  padding-top: 2%;
`

export const TtlEditor = styled(BaseTextField)`
  margin-left: 20px;
  width: 15%;
`
