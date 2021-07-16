import { FC } from 'react'
import styled from 'styled-components'
import { Button as MuiButton, CircularProgress } from '@material-ui/core'

export const Button: FC<Props> = ({ onClick, disabled, isLoading, text }) => {
  return (
    <MuiButton variant='contained' onClick={onClick} color='primary' disabled={disabled}>
      {isLoading ? <LoadingSpinner size={22} /> : text}
    </MuiButton>
  )
}

const LoadingSpinner = styled(CircularProgress)`
  color: white;
`

interface Props {
  disabled?: boolean
  onClick: () => void | Promise<void>
  isLoading?: boolean
  text: string
}
