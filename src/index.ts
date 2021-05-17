import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { environment, serverPort } from './config/serverConfig'
import MongoLib from './lib/MongoLib'
import schema from './schema/schema'

const mongo = new MongoLib()

const app = express()

mongo.connect()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: !(environment === 'production')
  })
)

const port = serverPort || 4000

app.listen(port, () => console.log(`Server running on port ${port}`))
