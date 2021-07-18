import { Resolver, Connection } from '@/interfaces'
import { getActiveConnectionConfig } from '@/db'

export const activeConnection: Resolver<Connection | undefined> = async ({}, { Client }) => {
  return getActiveConnectionConfig(Client)
}
