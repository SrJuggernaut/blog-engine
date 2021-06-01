import { mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import postResolvers from './post/postResolvers'
import postTypeDefs from './post/postTypeDefs'
import useResolvers from './user/userResolvers'
import userTypeDefs from './user/userTypeDefs'
import authResolvers from './auth/authResolvers'
import authTypeDefs from './auth/authTypeDefs'

const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs, authTypeDefs])
const resolvers = mergeResolvers([useResolvers, postResolvers, authResolvers])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
