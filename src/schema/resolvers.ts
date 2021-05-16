import { IResolvers } from '@graphql-tools/utils'

const resolvers: IResolvers = {
  Query: {
    user: () => 'Usuario'
  },
  Mutation: {
    register: (_: any, args: any): object => {
      console.log(args)
      return {
        id: '4444',
        ...args.user
      }
    }
  }
}

export default resolvers
