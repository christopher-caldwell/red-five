import { FC, useEffect } from 'react'

import { BaseTextField } from 'components/shared'
import { useInput, useDebounce } from 'hooks'

export const TextSetting: FC<Props> = ({ label, onChange, defaultAnswer, helperText }) => {
  const [answer, answerBind] = useInput(defaultAnswer.toString())

  const debouncedAnswer = useDebounce(answer, 500)

  useEffect(() => {
    onChange(debouncedAnswer)
  }, [debouncedAnswer, onChange])

  return <BaseTextField label={label} {...answerBind} helperText={helperText} />
}

interface Props {
  defaultAnswer: number
  label: string
  onChange: (newAnswer: string) => void
  helperText?: string
}
