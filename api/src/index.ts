import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'

import { resolvers, schema } from './schema'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

const app = express()
app.use(cors())

server.applyMiddleware({ app })

app.listen({ port: 5000 }, () => console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`))