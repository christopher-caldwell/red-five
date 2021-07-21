import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { loadConfig } from './db'
import './connections'
import { resolvers, schema, subscription } from './schema'

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
  const wsServer = new ws.Server({
    server,
    path: '/graphql'
  })

  useServer(
    {
      schema,
      roots: { subscription }
    },
    wsServer
  )
  console.log(`🚀 Skynet is active`)
})
