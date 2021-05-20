import { ForbiddenError, UserInputError } from 'apollo-server'
import { Error } from 'mongoose'
import {
  UserRegister,
  UserEdit,
  userRegisterSchema,
  UserLoginSchema,
  UserLogin
} from '../../../interfaces/userInterfaces'
import {
  getUser,
  register,
  loginUser,
  updateUser,
  deleteUser
} from '../../../services/userServices'

const useResolvers = {
  Query: {
    me: async (root: any, args: any, context: { id: string }) => {
      const { id } = context
      if (!id) {
        throw new ForbiddenError('You need to login to access')
      }
      try {
        const res = await getUser(context.id)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Mutation: {
    register: async (root: any, args: { user: UserRegister }, context: any) => {
      const { error, value } = userRegisterSchema.validate(args.user)
      if (error) {
        throw new UserInputError(error.message, {})
      }
      try {
        const res = await register(value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    login: async (
      root: any,
      args: { credentials: UserLogin },
      context: any
    ) => {
      const { error, value } = UserLoginSchema.validate(args.credentials)
      if (error) {
        throw new UserInputError(error.message, {})
      }
      try {
        const res = await loginUser(value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    updateUser: async (
      root: any,
      args: { id: string; user: UserEdit },
      context: any
    ) => {
      if (!context.id || context.id !== args.id) {
        throw new ForbiddenError('You can\'t modify that user')
      }
      try {
        const res = await updateUser(args.id, args.user)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    deleteUser: async (root: any, args: { id: string }, context: any) => {
      if (!context.id || context.id !== args.id) {
        throw new ForbiddenError('You can\'t delete that user')
      }
      try {
        const res = await deleteUser(args.id)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}

export default useResolvers
