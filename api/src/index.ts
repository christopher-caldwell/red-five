import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { join } from 'path'

import { loadConfig } from './db'
import './connections'
import { resolvers, schema, subscription } from './schema'

const app = express()
app.use(cors())
if (process.env.NODE_ENV === 'production') {
  const root = join(__dirname, 'client', 'build')
  app.use(express.static(root))
  app.get('*', (_, res) => {
    res.sendFile('index.html', { root })
  })
}

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

run()
