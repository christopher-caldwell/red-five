import { FC } from 'react'

import { FlexContainer } from 'components/shared'
import Explorer from 'components/keys/explorer'
import Display from 'components/keys/display'

const Keys: FC = () => {
  return (
    <FlexContainer margin='1% 0 0 0' padding='1%' justify='flex-start' width='100vw'>
      <Explorer />
      <Display />
    </FlexContainer>
  )
}

export default Keys
