import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const ConnectionSelectMenuButton = styled(Button)`
  margin-left: 20px !important;
  & svg {
    margin-left: 10px;
  }
`

export const ConnectionContainer = styled.div`
  & button {
    text-transform: none;
  }
`
