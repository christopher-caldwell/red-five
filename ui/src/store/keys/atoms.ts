import { atom } from 'recoil'

export const activeKeyAtom = atom<string | undefined>({
  key: 'active-key',
  default: undefined
})
