import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const ConnectionSelectMenuButton = styled(Button)`
  & svg {
    margin-left: 10px;
  }
`

export const ConnectionContainer = styled.div`
  z-index: 9000000000000;
  & button {
    text-transform: none;
  }
`
