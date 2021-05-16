import { makeExecutableSchema } from 'graphql-tools'
import userTypeDefs from './userTypeDefs'
import userResolvers from './userResolvers'

const userSchema = makeExecutableSchema({
  typeDefs: userTypeDefs,
  resolvers: userResolvers
})

export default userSchema
