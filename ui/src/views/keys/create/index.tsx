import { FC, useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'

import { useSetKeyMutation, useNamespacedKeysQuery } from 'generated'
import { BaseTextField, FlexContainer, Button } from 'components/shared'
import { useInput } from 'hooks'

const namespacedKeys = useNamespacedKeysQuery.getKey()

const CreateKey: FC<Props> = ({ width }) => {
  const { push } = useHistory()
  const queryClient = useQueryClient()
  const [keyName, keyNameBind] = useInput('')
  const [keyTtl, keyTtlBind] = useInput('')
  const [keyValue, keyValueBind] = useInput('')
  const { mutateAsync, isLoading } = useSetKeyMutation({
    onSuccess() {
      queryClient.invalidateQueries(namespacedKeys)
      push('/')
    }
  })
  const handleSaveKey = useCallback(async () => {
    await mutateAsync({ entry: { key: keyName, ttl: Number(keyTtl), type: 'string', value: keyValue } })
  }, [keyName, keyTtl, keyValue, mutateAsync])

  return (
    <FlexContainer padding='1%' width={`calc(100% - ${width}px)`} justify='flex-start' direction='column'>
      <BaseTextField label='Key' {...keyNameBind} />
      <BaseTextField label='TTL' type='number' {...keyTtlBind} />
      <BaseTextField label='Value' multiline fullWidth {...keyValueBind} />
      <FlexContainer justify='flex-end' width='100%' padding='2% 0 0 0'>
        <Button onClick={handleSaveKey} text='Save' isLoading={isLoading} />
      </FlexContainer>
    </FlexContainer>
  )
}

interface Props {
  width: number
}

export default CreateKey
