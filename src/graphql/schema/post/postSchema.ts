import { makeExecutableSchema } from 'graphql-tools'
import postTypeDefs from './postTypeDefs'
import postResolvers from './postResolvers'

const postSchema = makeExecutableSchema({
  typeDefs: postTypeDefs,
  resolvers: postResolvers
})

export default postSchema
