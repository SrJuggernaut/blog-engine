import { mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import postResolvers from './post/postResolvers'
import postTypeDefs from './post/postTypeDefs'
import useResolvers from './user/userResolvers'
import userTypeDefs from './user/userTypeDefs'
import authResolvers from './auth/authResolvers'
import authTypeDefs from './auth/authTypeDefs'
import categoryTypeDefs from './category/categoryTypeDefs'
import categoryResolvers from './category/categoryResolvers'

const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs, authTypeDefs, categoryTypeDefs])
const resolvers = mergeResolvers([useResolvers, postResolvers, authResolvers, categoryResolvers])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
