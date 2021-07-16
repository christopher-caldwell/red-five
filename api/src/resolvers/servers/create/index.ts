import { Resolver } from '@/interfaces'

export const createServer: Resolver<any, CreateServerArgs> = async (_, { id }) => {
  console.log('id', id)
  return {}
}

export interface CreateServerArgs {
  id: number
}
