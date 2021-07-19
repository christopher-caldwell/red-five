import { FC, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import { FlexContainer } from 'components/shared'
import Explorer from 'components/keys/explorer'
import Display from 'components/keys/display'
import CreateKey from './create'

const Keys: FC = () => {
  const [width, setWidth] = useState(350)
  return (
    <FlexContainer margin='1% 0 0 0' padding='1%' justify='flex-end' width='100vw'>
      <Explorer width={width} setWidth={setWidth} />
      <Switch>
        <Route path='/create' render={() => <CreateKey width={width} />} />
        <Route path='/' render={() => <Display width={width} />} />
      </Switch>
    </FlexContainer>
  )
}

export default Keys
