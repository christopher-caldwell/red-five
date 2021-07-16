import { Resolver, ConnectionInput, MutationResult } from '@/interfaces'

export const createConnection: Resolver<MutationResult, ConnectionInput> = async (variables, context) => {
  console.log('var', variables)
  console.log('context', context)
  return {
    status: 200,
    message: 'Done'
  }
}

export interface CreateConnectionArgs {
  id: number
}
