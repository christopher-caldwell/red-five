import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { resolvers, schema } from './schema'

const app = express()

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers
  })
)

app.listen({ port: 5000 }, () => console.log(`🚀 Skynet is active`))
