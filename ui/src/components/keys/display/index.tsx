import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { Alert } from '@material-ui/lab'

import { useKeyQuery } from 'generated'
import { activeKeyAtom } from 'store'
import { FlexContainer } from 'components/shared'
import { LinearProgress } from '@material-ui/core'

const Display: FC = () => {
  const keyId = useRecoilValue(activeKeyAtom)
  const { data, isLoading, isError } = useKeyQuery(
    {
      id: keyId || ''
    },
    {
      enabled: !!keyId
    }
  )
  return (
    <FlexContainer justify='flex-start'>
      {isLoading ? <LinearProgress variant='indeterminate' /> : null}
      {isError ? <Alert severity='error' /> : null}Display
      <div>{data?.key.value}</div>
    </FlexContainer>
  )
}

export default Display
