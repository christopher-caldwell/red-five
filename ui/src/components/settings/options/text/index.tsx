import { FC, useEffect } from 'react'

import { FlexContainer, BaseTextField } from 'components/shared'
import { useInput, useDebounce } from 'hooks'
import { Label } from './elements'

export const TextSetting: FC<Props> = ({ label, onChange, defaultAnswer, helperText }) => {
  const [answer, answerBind] = useInput(defaultAnswer.toString())

  const debouncedAnswer = useDebounce(answer, 500)

  useEffect(() => {
    onChange(debouncedAnswer)
  }, [debouncedAnswer, onChange])

  return (
    <FlexContainer justify='space-between'>
      <Label>{label}</Label>
      <BaseTextField fullWidth={false} {...answerBind} helperText={helperText} />
    </FlexContainer>
  )
}

interface Props {
  defaultAnswer: number
  label: string
  onChange: (newAnswer: string) => void
  helperText?: string
}
