import {
  SignUpData,
  LogInData,
  signUpDataSchema,
  logInDataSchema
} from '@interfaces/authInterfaces'
import { logIn, signUp } from '@services/authServices'
import { UserInputError } from 'apollo-server-errors'

const authResolvers = {
  Mutation: {
    signUp: async (root: any, args: { user: SignUpData }, context: any) => {
      const { value, error } = signUpDataSchema.validate(args.user)
      if (error) {
        return new UserInputError(error.message)
      }
      const user = await signUp(value)
      return user
    },
    logIn: async (root: any, args: { credentials: LogInData }, context: any) => {
      const { value, error } = logInDataSchema.validate(args.credentials)
      if (error) {
        return new UserInputError(error.message)
      }
      const user = await logIn(value)
      context.token = user.token
      return user
    }
  }
}

export default authResolvers
