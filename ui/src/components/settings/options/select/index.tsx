import { FC, ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'

export const SettingsSelect: FC<Props> = ({ label, helperText, onChange, existingChoice }) => {
  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    onChange(event.target.value as string)
  }

  return (
    <div>
      <TextField
        fullWidth
        select
        label={label}
        value={existingChoice}
        onChange={handleChange}
        helperText={helperText}
        variant='outlined'
      >
        <MenuItem value={'pop'}>Remove oldest message as newest one comes in</MenuItem>
        <MenuItem value={'wipe'}>Erase when limit reached</MenuItem>
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
