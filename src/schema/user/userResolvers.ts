import { ObjectId } from 'bson'
import UserServices from '../../services/UserServices'

const userServices = new UserServices()

const useResolvers = {
  Query: {
    user: () => ({
      id: 444,
      userName: 'userName',
      email: 'email@email.com',
      description:
        'Fusce vehicula malesuada hendrerit. In luctus metus egestas vestibulum malesuada. Fusce eu lectus nibh. Vestibulum.'
    })
  },
  Mutation: {
    register: async (root: any, args: { user: any }, context: any) => {
      try {
        const res = (await userServices.register(args.user)) as ObjectId
        console.log('userResolvers', res.toHexString())
        return { id: res.toHexString() }
      } catch (error) {
        console.log(error)
      }
    },
    login: (root: any, args: { credentials: any }, context: any) => {
      return {
        id: 444,
        token: 'thisIsALargeToken',
        username: 'userName',
        email: 'email@email.com',
        description:
          'Fusce vehicula malesuada hendrerit. In luctus metus egestas vestibulum malesuada. Fusce eu lectus nibh. Vestibulum.'
      }
    },
    updateUser: (root: any, args: { user: any }, context: any) => {
      return {
        id: 444,
        ...args.user
      }
    }
  }
}

export default useResolvers
