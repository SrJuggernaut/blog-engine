import { ForbiddenError, UserInputError } from 'apollo-server-errors'
import { Error } from 'mongoose'
import { UserEdit, userEditSchema } from '@interfaces/userInterfaces'
import { getPosts } from '@services/postServices'
import { getUser, updateUser, deleteUser } from '@services/userServices'

const useResolvers = {
  Query: {
    me: async (root: any, args: any, context: { id: string, user: { sub?: string } }) => {
      const { sub: id } = context.user
      if (!id) {
        throw new ForbiddenError('You need to login to access')
      }
      try {
        const res = await getUser({ _id: id })
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Mutation: {
    updateUser: async (
      root: any,
      args: { id: string; user: UserEdit },
      context: any
    ) => {
      const { error, value } = userEditSchema.validate(args.user)
      if (error) {
        throw new UserInputError(error.message)
      }
      if (!context.id || context.id !== args.id) {
        throw new ForbiddenError("You can't modify that user")
      }
      const res = await updateUser({ _id: args.id }, value)
      return res
    },
    deleteUser: async (root: any, args: { id: string }, context: any) => {
      if (!context.id || context.id !== args.id) {
        throw new ForbiddenError("You can't delete that user")
      }
      const res = await deleteUser({ _id: args.id })
      return res
    }
  },
  User: {
    id: (user: any) => user.id.toString(),
    posts: (user: any) => getPosts({ author: user.id.toString() })
  }
}

export default useResolvers
