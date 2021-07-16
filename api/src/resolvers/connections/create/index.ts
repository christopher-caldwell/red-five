import { v4 as uuid } from 'uuid'

import { Resolver, ConnectionInput, MutationResult } from '@/interfaces'

export const createConnection: Resolver<MutationResult, CreateConnectionArgs> = async ({ connection }, { Client }) => {
  const connectionId = uuid()
  Client.push('/connections[]', { ...connection, id: connectionId }, true)
  return {
    status: 200,
    message: 'Done'
  }
}

export interface CreateConnectionArgs {
  connection: ConnectionInput
}
