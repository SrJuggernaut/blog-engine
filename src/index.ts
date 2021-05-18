import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import graphqlPlayground from 'graphql-playground-middleware-express'

import { environment, serverPort } from './config/serverConfig'
import mongoLib from './lib/mongoLib'
import schema from './graphql/schema/schema'

mongoLib()

const app = express()

app.use(
  '/playground',
  graphqlPlayground({
    endpoint: '/graphql/</script><script>alert(1)</script><script>'
  })
)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: !(environment === 'production')
  })
)

const port = serverPort || 4000

app.listen(port, () => console.log(`Server running on port ${port}`))
