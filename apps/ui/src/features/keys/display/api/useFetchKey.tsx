import { useState, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ClientError } from 'graphql-request'

import { useKeyQuery, KeyQuery } from '@_ui/generated'
import { activeKeyAtom } from '@_ui/store'
import { Snackbar } from '@_ui/components'

export const useFetchKey = () => {
  const [isSnackbarShown, setIsSnackbarShown] = useState(false)
  const keyId = useRecoilValue(activeKeyAtom)
  const { data, isLoading, error, refetch } = useKeyQuery<KeyQuery, ClientError>(
    {
      id: keyId || ''
    },
    {
      enabled: !!keyId,
      onError() {
        setIsSnackbarShown(true)
      }
    }
  )
  const key = data?.key

  const ErrorSnackbar = useMemo(
    () => (
      <Snackbar
        severity='error'
        message={error?.message || 'Something went wrong'}
        setIsOpen={setIsSnackbarShown}
        isOpen={isSnackbarShown}
        autoHideDuration={null}
      />
    ),
    [error, isSnackbarShown]
  )

  return {
    isKeyFetchLoading: isLoading,
    keyFetchError: error,
    refetchKey: refetch,
    key,
    keyId,
    ErrorSnackbar
  }
}
