import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { join } from 'path'
import cors from 'cors'
import { DefinitionNode } from 'graphql'

import { loadConfig } from '@/db'
import { schema, resolvers, subscription } from '@/schema'
import { handleCli } from '@/utils/handleCli'
import { logger } from '@/utils/logger'
import '@/connections'

const loggingMiddleware = (queryDefinition: DefinitionNode): void => {
  try {
    //@ts-ignore - Types are wrong
    const operation = queryDefinition?.operation || 'query'
    //@ts-ignore - Types are wrong
    const queryName = queryDefinition?.name?.value || 'unknown'
    logger.info('Incoming %s for %s', operation, queryName)
  } catch (e) {
    // it's fine
  }
}

const app = express()
app.use(cors())
const root = join(__dirname, 'client', 'build')
app.use(express.static(root))
app.get('*', (_, res) => {
  res.sendFile('index.html', { root })
})

export const startServer = async () => {
  await handleCli()
  const db = await loadConfig()
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      context: { Client: db },
      extensions(info) {
        const queryDefinition = info.document.definitions[0]
        loggingMiddleware(queryDefinition)
        return undefined
      }
    })
  )

  const server = app.listen(5001, () => {
    const wsServer = new ws.Server({
      server,
      path: '/graphql'
    })

    useServer(
      {
        schema,
        roots: { subscription },
        context: { Client: db }
      },
      wsServer
    )
    console.log(`🚀 Skynet is active`)
  })
}
