import { Resolver, Connection } from '@/interfaces'

export const connection: Resolver<Connection, FetchOneConnectionArgs> = async ({ id }) => {
  console.log('id', id)
  return {
    id: '1',
    host: 'localhost',
    port: 6379,
    name: 'Local Test',
    protocol: 'http'
  }
}

export interface FetchOneConnectionArgs {
  id: number
}
