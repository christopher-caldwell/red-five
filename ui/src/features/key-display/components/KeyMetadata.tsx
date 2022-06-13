import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { styled } from '@mui/material'

import { BaseTextField } from '@/components'
import { UseInputBind } from '@/hooks'
import { activeKeyAtom } from '@/store'
import { Key } from '@/generated'
import { standardFormatDate } from '@/utils'

export const KeyMetadata: FC<Props> = ({ ttl, type, isEditing, bind }) => {
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

interface KeyTitleProps {
  padding?: string
}
const KeyTitle = styled('span')<KeyTitleProps>`
  color: ${({
    theme: {
      palette: { text }
    }
  }) => text.primary};
  margin-left: 10px;
  ${({ padding }) => (padding ? `padding: ${padding};` : '')}
`

const KeyTitleWrapper = styled('h2')`
  color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`

const TtlEditor = styled(BaseTextField)`
  margin-left: 20px;
  width: 15%;
`

const getDateFromTTL = (ttl?: number) => {
  if (!ttl || ttl === -1) return ''
  const ttlAsDate = Date.now() + ttl
  return `( ${standardFormatDate(ttlAsDate)} )`
}

type Props = Partial<Key & { keyId: string; isEditing: boolean; bind: UseInputBind }>
