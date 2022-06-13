import { styled, Button } from '@mui/material'

export const ConnectionSelectMenuButton = styled(Button)`
  color: white;
  /* color: ${({
    theme: {
      palette: { primary }
    }
  }) => primary.main}; */
  & svg {
    margin-left: 10px;
  }
`

export const ConnectionContainer = styled('div')`
  z-index: 9000000000000;
  & button {
    text-transform: none;
  }
`
