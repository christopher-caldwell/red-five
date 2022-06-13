import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { UseInputBind } from '@/hooks'
import { activeKeyAtom } from '@/store'
import { Key } from '@/generated'
import { KeyTitle, KeyTitleWrapper, TtlEditor } from '../elements'
import { standardFormatDate } from '@/utils'

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
          <KeyTitle padding='1.6% 0'>
            {ttl} {getDateFromTTL(ttl)}
          </KeyTitle>
        )}
      </KeyTitleWrapper>
      <KeyTitleWrapper>
        Type: <KeyTitle>{type}</KeyTitle>
      </KeyTitleWrapper>
    </>
  )
}

const getDateFromTTL = (ttl?: number) => {
  if (!ttl || ttl === -1) return ''
  const ttlAsDate = Date.now() + ttl
  return `( ${standardFormatDate(ttlAsDate)} )`
}

type Props = Partial<Key & { keyId: string; isEditing: boolean; bind: UseInputBind }>

export default KeyMeta
