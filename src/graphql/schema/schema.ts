import { mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import postResolvers from './post/postResolvers'
import postTypeDefs from './post/postTypeDefs'
import useResolvers from './user/userResolvers'
import userTypeDefs from './user/userTypeDefs'
import authResolvers from './auth/authResolvers'
import authTypeDefs from './auth/authTypeDefs'
import categoryTypeDefs from './category/categoryTypeDefs'
import categoryResolvers from './category/categoryResolvers'
import commentTypeDefs from './comment/commentTypeDefs'
import commentResolvers from './comment/commentResolvers'

const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs, authTypeDefs, categoryTypeDefs, commentTypeDefs])
const resolvers = mergeResolvers([useResolvers, postResolvers, authResolvers, categoryResolvers, commentResolvers])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
