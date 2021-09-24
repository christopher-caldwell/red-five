import { FC } from 'react'
import { Alert } from '@material-ui/lab'

import { BaseTextField, FlexContainer, Button } from '@/components/shared'
import { Title } from './elements'
import { useCreateKey } from './useCreateKey'

const CreateKey: FC<Props> = ({ width }) => {
  const { isError, keyNameBind, keyTtlBind, keyValueBind, isLoading, handleSaveKey } = useCreateKey()

  return (
    <FlexContainer padding='1%' width={`calc(100% - ${width}px)`} justify='flex-start' direction='column'>
      <Title>Create a Key</Title>
      {isError ? (
        <Alert variant='filled' severity='error'>
          Something went wrong
        </Alert>
      ) : null}
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
