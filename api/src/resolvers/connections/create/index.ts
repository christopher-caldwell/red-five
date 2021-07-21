import { v4 as uuid } from 'uuid'
import Redis from 'ioredis'

import { Connection } from '@/interfaces'
import { connections } from '@/connections'
import { Resolver, ConnectionInput, MutationResult } from '@/interfaces'
import { makeConnectionActive } from '../make-active'

export const createConnection: Resolver<MutationResult, CreateConnectionArgs> = async (
  { connection, makeActive },
  { Client }
) => {
  const connectionId = uuid()
  const connectionToCreate: Connection = { ...connection, id: connectionId, isActive: !!makeActive }
  Client.push('/connections[]', connectionToCreate, true)
  connections[connectionId] = new Redis({
    host: connection.host,
    password: connection.password || undefined,
    port: connection.port
  })
  if (makeActive) await makeConnectionActive({ id: connectionId }, { Client })
  return {
    status: 200,
    message: 'Done'
  }
}

export interface CreateConnectionArgs {
  connection: ConnectionInput
  makeActive?: boolean
}
