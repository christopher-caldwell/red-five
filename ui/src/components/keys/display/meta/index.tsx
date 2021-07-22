import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { UseInputBind } from 'hooks'
import { activeKeyAtom } from 'store'
import { Key } from 'generated'
import { KeyTitle, KeyTitleWrapper, TtlEditor } from '../elements'

const KeyMeta: FC<Props> = ({ ttl, type, isEditing, bind }) => {
  const keyId = useRecoilValue(activeKeyAtom)
  return (
    <>
      <KeyTitleWrapper>
        Key: <KeyTitle>{keyId}</KeyTitle>
      </KeyTitleWrapper>
      <KeyTitleWrapper>
        TTL:{' '}
        {isEditing ? (
          <TtlEditor size='small' type='number' {...bind} label='' placeholder='' />
        ) : (
          <KeyTitle padding='1.6% 0'>{ttl}</KeyTitle>
        )}
      </KeyTitleWrapper>
      <KeyTitleWrapper>
        Type: <KeyTitle>{type}</KeyTitle>
      </KeyTitleWrapper>
    </>
  )
}

type Props = Partial<Key & { keyId: string; isEditing: boolean; bind: UseInputBind }>

export default KeyMeta
