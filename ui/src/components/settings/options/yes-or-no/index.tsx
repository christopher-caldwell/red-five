import { FC, useCallback, useState, ChangeEvent } from 'react'
import { Switch } from '@material-ui/core'

import { FlexContainer } from 'components/shared'

export const YesOrNoSetting: FC<Props> = ({ label, onChange, defaultAnswer }) => {
  const [isChecked, setIsChecked] = useState(defaultAnswer)

  const handleLocalChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setIsChecked(checked)
      onChange(checked)
    },
    [onChange]
  )

  return (
    <FlexContainer width='100%' justify='space-between' align='baseline'>
      <h4>{label}</h4>
      <Switch color='primary' checked={isChecked} onChange={handleLocalChange} />
    </FlexContainer>
  )
}

interface Props {
  defaultAnswer: boolean
  label: string
  onChange: (newSetting: boolean) => void
}
