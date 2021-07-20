import { FC } from 'react'
import { CircularProgress, Fab, FabProps } from '@material-ui/core'

import { Container } from './elements'

/** Bottom Floating Action Button designed to be in a fixed position on top of all other elements */
export const BottomFab: FC<Props> = ({ onClick, buttonContent, isLoading }) => {
  return (
    <Container>
      <Fab color='primary' onClick={onClick}>
        {isLoading ? <CircularProgress size={22} variant='indeterminate' /> : buttonContent}
      </Fab>
    </Container>
  )
}

interface Props {
  buttonContent: JSX.Element
  onClick: FabProps['onClick']
  isLoading?: boolean
}
