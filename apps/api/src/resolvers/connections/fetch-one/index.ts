import { Resolver, Connection } from '@_api/interfaces'
import { findById } from '@_api/db'

export const connection: Resolver<Connection, FetchOneConnectionArgs> = async ({ id }, { Client }) => {
  return findById<Connection>(Client, id, '/connections')
}

export interface FetchOneConnectionArgs {
  id: string
}
