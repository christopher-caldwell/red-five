import { Resolver, MutationResult, Connection } from '@_api/interfaces'

export const removeConnection: Resolver<MutationResult, RemoveConnectionArgs> = async ({ id }, { Client }) => {
  const indexToRemove = Client.getIndex('/connections', id, 'id')
  Client.delete(`/connections[${indexToRemove}]`)
  const connections = Client.getObject<Connection[]>('/connections')
  if (!connections.length) Client.push('/activeConnection', '')
  return {
    message: 'Done',
    status: 200
  }
}

export interface RemoveConnectionArgs {
  id: string
}
