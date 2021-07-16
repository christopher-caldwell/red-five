import { Resolver } from '@/interfaces'

export const server: Resolver<any, FetchServerArgs> = async (_, { id }) => {
  console.log('id', id)
  return {}
}

export interface FetchServerArgs {
  id: number
}