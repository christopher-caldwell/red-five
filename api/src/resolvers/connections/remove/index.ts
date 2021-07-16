import { Resolver, MutationResult } from '@/interfaces'

export const removeConnection: Resolver<MutationResult, RemoveConnectionArgs> = async ({ id }, { Client }) => {
  const indexToRemove = Client.getIndex('/connections', id, 'id')
  Client.delete(`/connections[${indexToRemove}]`)
  return {
    message: 'Done',
    status: 200
  }
}

export interface RemoveConnectionArgs {
  id: string
}
