import { Resolver, Connection } from '@/interfaces'
import { getActiveConnectionConfig } from '@/db'

// TODO: Maybe handle this better when there are no active connections
export const activeConnection: Resolver<Connection | undefined> = async ({}, { Client }) => {
  return getActiveConnectionConfig(Client)
}
