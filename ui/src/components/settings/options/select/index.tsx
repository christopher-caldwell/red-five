import { FC, ChangeEvent, useState, useEffect } from 'react'
import { TextField, MenuItem } from '@material-ui/core'

export const SettingsSelect: FC<Props> = ({ label, helperText, onChange, existingChoice }) => {
  const [choice, setChoice] = useState(existingChoice)
  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setChoice(event.target.value as string)
  }

  useEffect(() => {
    if (choice === existingChoice) return
    onChange(choice)
  }, [choice, onChange, existingChoice])

  return (
    <div>
      <TextField
        fullWidth
        select
        label={label}
        value={choice}
        onChange={handleChange}
        helperText={helperText}
        variant='outlined'
      >
        <MenuItem value={'option.value'}>{'option.label'}</MenuItem>
      </TextField>
    </div>
  )
}

interface Props {
  label: string
  helperText?: string
  onChange: (option: string) => void
  existingChoice: string
}
