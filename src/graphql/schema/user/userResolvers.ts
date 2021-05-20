import {
  UserRegister,
  UserEdit,
  userRegisterSchema,
  UserLogin
} from '../../../interfaces/userInterfaces'
import {
  getUser,
  register,
  loginUser,
  updateUser,
  deleteUser
} from '../../../services/UserServices'

const useResolvers = {
  Query: {
    me: async (root: any, args: { id: string }, context: any) => {
      try {
        const res = await getUser(args.id)
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
        return error
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
      try {
        const res = await loginUser(args.credentials)
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
      try {
        const res = await updateUser(args.id, args.user)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    deleteUser: async (root: any, args: { id: string }, context: any) => {
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
