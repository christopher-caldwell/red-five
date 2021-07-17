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

app.listen({ port: 5000 }, () => console.log(`🚀 Skynet is active`))
