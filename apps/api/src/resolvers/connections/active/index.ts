import { Connection } from '@_api-types'
import { Resolver } from '@_api/interfaces'
import { getActiveConnectionConfig } from '@_api/db'

// TODO: Maybe handle this better when there are no active connections
export const activeConnection: Resolver<Connection | undefined> = async (_, { Client }) => {
  return getActiveConnectionConfig(Client)
}
