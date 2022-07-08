import { IInfo, IUser } from '@/interfaces/user'
import { atom } from 'recoil'

export const usersState = atom<IUser[]>({
  key: 'usersState',
  default: []
})

export const usersMetaState = atom<IInfo | undefined>({
  key: 'usersMetaState',
  default: undefined
})