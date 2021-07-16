import { FC } from 'react'

import { useInput } from 'hooks/useInput'
import { BaseTextField, PasswordTextField } from 'components/shared'

const ConnectionNameInputs: FC = () => {
  const [connectionName, connectionNameBind] = useInput('')
  const [host, hostBind] = useInput('')
  const [port, portBind] = useInput('')
  const [password, passwordBind] = useInput('')
  return (
    <div>
      <BaseTextField label='Display name' required {...connectionNameBind} />
      <BaseTextField label='Host' placeholder='localhost' required {...hostBind} />
      <BaseTextField label='Port' placeholder='6379' type='number' required {...portBind} />
      <PasswordTextField {...passwordBind} />
    </div>
  )
}

export default ConnectionNameInputs
