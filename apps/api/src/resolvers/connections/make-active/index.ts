import { Resolver, MutationResult } from '@_api/interfaces'

export const makeConnectionActive: Resolver<MutationResult, MakeConnectionActiveArgs> = async ({ id }, { Client }) => {
  Client.push('/activeConnection', id)
  return {
    message: 'Done',
    status: 200
  }
}

export interface MakeConnectionActiveArgs {
  id: string
}
