import { FC } from 'react'
import { LinearProgress } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Delete'

import { FlexContainer, BottomFab } from '@_ui/components'
import { useRemoveKey, useFetchKey } from './api'
import { KeyData } from './components'

export const KeyDisplay: FC<Props> = ({ width }) => {
  const { isKeyFetchLoading, ErrorSnackbar, key, keyId, refetchKey, keyFetchError } = useFetchKey()
  const { DeletePrompt, isRemoveKeyLoading, openRemoveDialogOrRemoveKey } = useRemoveKey(keyId)

  return (
    <>
      <FlexContainer padding='1%' width={`calc(100% - ${width}px)`} justify='flex-start' direction='column'>
        {isKeyFetchLoading ? <LinearProgress variant='indeterminate' /> : null}
        {ErrorSnackbar}
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
