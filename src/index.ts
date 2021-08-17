import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { environment, serverPort } from '@config/serverConfig'
import { start as mongoStart } from '@lib/mongoLib'
import schema from '@graphql/schema/schema'
import cookieParser from 'cookie-parser'
import { verifyJWT } from '@services/authServices'

const app = express()

mongoStart()

app.use(cookieParser())

const server = new ApolloServer({
  schema,
  tracing: environment === 'development',
  playground: environment === 'development',
  context: ({ req, res }) => {
    const user = req.cookies.auth ? verifyJWT(req.cookies.auth) : null
    return {
      res,
      user
    }
  },
  formatResponse: (response, requestContext: any) => {
    const {
      res,
      token
    }: { res: express.Response; token?: string } = requestContext.context
    if (token) {
      res.cookie('auth', token, { httpOnly: environment !== 'development', secure: environment !== 'development' })
    }
    return response
  }
})

server.applyMiddleware({ app })

app.listen(serverPort, () => {
  console.log(
    `🚀 Server ready at: http://localhost:${serverPort}, Graphql started on path: ${server.graphqlPath}`
  )
})
