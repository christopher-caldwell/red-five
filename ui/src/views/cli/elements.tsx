import styled from 'styled-components'
import { InlineSuggest } from '@caldwell619/mui-inline-suggest'

import { FlexContainer } from 'components/shared'

export const Title = styled.h1`
  margin-right: 30px;
`
export const StatusContainer = styled(FlexContainer)``
export const Container = styled.div`
  padding: 1%;
`

export const CommandPrompt = styled(InlineSuggest)`
  width: 100%;
`
