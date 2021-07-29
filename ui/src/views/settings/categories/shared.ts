import { Dispatch, SetStateAction } from 'react'

export interface SettingsProps {
  setIsSnackbarShown: Dispatch<SetStateAction<boolean>>
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>
}
