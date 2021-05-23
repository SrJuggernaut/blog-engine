import { ApolloServer } from 'apollo-server'
import { environment, serverPort } from '@config/serverConfig'
import { start } from '@lib/mongoLib'
import schema from '@graphql/schema/schema'
import { veriJWT } from '@lib/authLib'

const server = new ApolloServer({
  schema,
  tracing: true,
  playground: environment === 'development',
  context: ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization || ''
      const { id } = veriJWT(token)
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
