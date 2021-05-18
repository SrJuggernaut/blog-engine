import {
  UserRegister,
  UserEdit,
  userRegisterSchema,
  UserLogin
} from '../../../interfaces/userInterfaces'
import UserServices from '../../../services/UserServices'

const userServices = new UserServices()

const useResolvers = {
  Query: {
    user: async (root: any, args: { id: string }, context: any) => {
      try {
        const res = await userServices.getUser(args.id)
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
        const res = await userServices.register(value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    login: async (root: any, args: { credentials: UserLogin }, context: any) => {
      try {
        const res = await userServices.loginUser(args.credentials)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    updateUser: async (root: any, args: { id: string, user: UserEdit }, context: any) => {
      try {
        const res = await userServices.updateUser(args.id, args.user)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    deleteUser: async (root: any, args: { id: string}, context: any) => {
      try {
        const res = await userServices.deleteUser(args.id)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}

export default useResolvers
