import Redis from 'ioredis'

import { AppConfig } from '@/interfaces'
import { connections } from '@/connections'

export const mapExistingConnections = ({ connections: existingConnections }: AppConfig): void => {
  existingConnections.map(({ id, host, port, password }) => {
    connections[id] = new Redis({ host, password: password || undefined, port })
  })
}
