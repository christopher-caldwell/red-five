import { Resolver, Connection } from '@/interfaces'
import { findById } from '@/db'

export const connection: Resolver<Connection, FetchOneConnectionArgs> = async ({ id }, { Client }) => {
  return findById<Connection>(Client, id, '/connections')
}

export interface FetchOneConnectionArgs {
  id: string
}
