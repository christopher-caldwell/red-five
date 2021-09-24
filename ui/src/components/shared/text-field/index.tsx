import { FC, MouseEvent, useState } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { UseInputBind } from '@/hooks/useInput'

export const BaseTextField: FC<TextFieldProps> = props => (
  <TextField {...props} variant='outlined' margin='normal' fullWidth={props.fullWidth || true} autoCapitalize='none' />
)

export type SpecialInputProps = UseInputBind & { autoComplete?: string; label?: string }

export const EmailTextField: FC<SpecialInputProps> = props => {
  return <BaseTextField {...props} label='Email Address' name='email' autoComplete='email' />
}

export const PasswordTextField: FC<SpecialInputProps> = props => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  return (
    <InputWithIcon
      {...props}
      bind={{ onChange: props.onChange, value: props.value }}
      icon={isPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
      onIconClick={() => setIsPasswordShown(isPasswordCurrentlyShown => !isPasswordCurrentlyShown)}
      label={props.label || 'Password'}
      type={isPasswordShown ? 'text' : 'password'}
      autoComplete={props.autoComplete || 'off'}
    />
  )
}

export const InputWithIcon: FC<InputWithIconProps> = ({ label, bind, onIconClick = () => {}, icon, ...rest }) => (
  <TextField
    variant='outlined'
    label={label}
    {...bind}
    {...rest}
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton edge='end' aria-label='toggle password visibility' onClick={onIconClick}>
            {icon}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
)

export const InputWithTwoIcons: FC<InputWithIconsProps> = ({
  label,
  bind,
  onIconOneClick = () => {},
  onIconTwoClick = () => {},
  iconOne,
  iconTwo,
  ...restProps
}) => (
  <TextField
    variant='outlined'
    label={label}
    {...bind}
    fullWidth
    {...restProps}
    InputProps={{
      endAdornment: (
        <>
          <InputAdornment position='end'>
            <IconButton edge='end' onClick={onIconOneClick}>
              {iconOne}
            </IconButton>
          </InputAdornment>
          <InputAdornment position='end'>
            <IconButton edge='end' onClick={onIconTwoClick}>
              {iconTwo}
            </IconButton>
          </InputAdornment>
        </>
      )
    }}
  />
)

export type InputWithIconProps = {
  label: string
  bind: UseInputBind
  onIconClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  icon: JSX.Element
} & TextFieldProps

export type InputWithIconsProps = {
  label: string
  bind: UseInputBind
  onIconOneClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  onIconTwoClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  iconOne: JSX.Element
  iconTwo: JSX.Element
}
