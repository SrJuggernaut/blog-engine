import { ApolloServer } from 'apollo-server'
import { environment, serverPort } from '@config/serverConfig'
import { start } from '@lib/mongoLib'
import schema from '@graphql/schema/schema'
import { verifyJWT } from '@services/authServices'

const server = new ApolloServer({
  schema,
  tracing: environment === 'development',
  playground: environment === 'development',
  context: ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization || ''
      const { id } = verifyJWT(token)
      return { id }
    }
    return null
  }
})

start()

server
  .listen({
    port: serverPort
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
