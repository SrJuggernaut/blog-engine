import { ApolloServer } from 'apollo-server'
import { environment, serverPort } from './config/serverConfig'
import mongoLib from './lib/mongoLib'
import schema from './graphql/schema/schema'
import { veriJWT } from './lib/authLib'

const server = new ApolloServer({
  schema,
  playground: environment === 'development',
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    const data = veriJWT(token)
    return { data }
  }
})

server
  .listen({
    port: serverPort
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })

mongoLib()
