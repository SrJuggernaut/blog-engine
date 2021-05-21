import { mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import postResolvers from './post/postResolvers'
import postTypeDefs from './post/postTypeDefs'
import useResolvers from './user/userResolvers'
import userTypeDefs from './user/userTypeDefs'

const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs])
const resolvers = mergeResolvers([useResolvers, postResolvers])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
