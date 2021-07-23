import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { join } from 'path'
import cors from 'cors'

import { loadConfig } from '@/db'
import { schema, resolvers, subscription } from '@/schema'
import { handleCli } from '@/utils/handleCli'
import '@/connections'

const app = express()
app.use(cors())

export const startServer = async () => {
  await handleCli()
  if (process.env.NODE_ENV === 'production') {
    const root = join(__dirname, 'client', 'build')
    app.use(express.static(root))
    app.get('*', (_, res) => {
      res.sendFile('index.html', { root })
    })
  }
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
