import { v4 as uuid } from 'uuid'
import Redis from 'ioredis'
import { JsonDB } from 'node-json-db'

import { Connection } from '@/interfaces'
import { connections } from '@/connections'
import { Resolver, ConnectionInput, MutationResult } from '@/interfaces'
import { logger } from '@/utils'
import { makeConnectionActive } from '../make-active'
import { activeConnection as getActiveConnection } from '../active'

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
  const doesHaveActiveConnection = await handleActiveConnectionSearch(Client)
  if (makeActive || !doesHaveActiveConnection) await makeConnectionActive({ id: connectionId }, { Client })

  return {
    status: 200,
    message: 'Done'
  }
}

const handleActiveConnectionSearch = async (Client: JsonDB): Promise<boolean> => {
  try {
    const activeConnection = await getActiveConnection({}, { Client })
    return !!activeConnection
  } catch (e) {
    logger.error('%o', e)
    return false
  }
}

export interface CreateConnectionArgs {
  connection: ConnectionInput
  makeActive?: boolean
}
