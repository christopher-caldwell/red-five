import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { loadConfig } from './db'
import './connections'
import { resolvers, schema, subscription } from './schema'

const app = express()
app.use(cors())

const run = async () => {
  const db = await loadConfig()
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      context: { Client: db }
    })
  )

  const server = app.listen(5000, () => {
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

run()
