import { model, Schema } from 'mongoose'
import { AuthenticationError } from 'apollo-server'
import { genJWT, genHash, compHash } from '@lib/authLib'
import {
  User,
  UserEdit,
  UserLoggedIn,
  UserLogin,
  UserRegister
} from '@interfaces/userInterfaces'

const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  password: { type: String, required: true }
})

const UserModel = model<User>('User', userSchema)

export const register = async (user: UserRegister) => {
  try {
    user.password = await genHash(user.password)
    const newUser = new UserModel(user)
    const savedUser: any = await newUser.save()
    savedUser.token = genJWT({ id: savedUser.id })
    return savedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (id: string) => {
  try {
    const user = await UserModel.findById(id).exec()
    if (!user) {
      throw new Error("User doesn't exist")
    }
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUser = async (id: string, data: UserEdit) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true
    })
    if (!updatedUser) {
      throw new Error("User doesn't exist or can't be edited")
    }
    return updatedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id })
    if (!deletedUser) {
      throw new Error("User doesn't exist")
    }
    return deletedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

export const loginUser = async (credentials: UserLogin) => {
  try {
    const loggedInUser = await UserModel.findOne({
      email: credentials.email
    }).exec()
    if (loggedInUser) {
      if (
        await compHash(credentials.password as string, loggedInUser.password as string)
      ) {
        const loggedInUserWithToken: UserLoggedIn = loggedInUser as UserLoggedIn
        loggedInUserWithToken.token = genJWT({ id: loggedInUserWithToken.id })
        return loggedInUserWithToken
      }
    }
    throw new AuthenticationError(
      "Can't find user with that email/password combination"
    )
  } catch (error) {
    throw new Error(error.message)
  }
}
