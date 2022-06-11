import { FC, lazy, Suspense } from 'react'
import { CircularProgress, LinearProgress } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Delete'

import { FlexContainer, BottomFab } from '@/components/shared'
import { useRemoveKey, useFetchKey } from './hooks'

const KeyData = lazy(() => import('./key-data'))

const Display: FC<Props> = ({ width }) => {
  const { isKeyFetchLoading, ErrorSnackbar, key, keyId, refetchKey, keyFetchError } = useFetchKey()
  const { DeletePrompt, isRemoveKeyLoading, openRemoveDialogOrRemoveKey } = useRemoveKey(keyId)

  return (
    <>
      <FlexContainer padding='1%' width={`calc(100% - ${width}px)`} justify='flex-start' direction='column'>
        {isKeyFetchLoading ? <LinearProgress variant='indeterminate' /> : null}
        {ErrorSnackbar}
        <Suspense fallback={<CircularProgress variant='indeterminate' />}></Suspense>
        <KeyData targetKey={key} keyId={keyId} refetchKey={refetchKey} keyFetchError={keyFetchError} />
      </FlexContainer>
      {keyId ? (
        <BottomFab
          onClick={openRemoveDialogOrRemoveKey}
          buttonContent={<RemoveIcon />}
          isLoading={isRemoveKeyLoading}
        />
      ) : null}
      {DeletePrompt}
    </>
  )
}

interface Props {
  width: number
}

export default Display
