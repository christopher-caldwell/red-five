import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { loadConfig } from './db'
import './connections'
import { resolvers, schema } from './schema'

const app = express()

const db = loadConfig()

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context: { Client: db }
  })
)

const server = app.listen(5000, () => {
  // create and use the websocket server
  const wsServer = new ws.Server({
    server,
    path: '/graphql'
  })

  useServer({ schema }, wsServer)
  console.log(`🚀 Skynet is active`)
})
