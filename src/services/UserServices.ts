import { model, Schema } from 'mongoose'
import { genJWT, genHash, compHash } from '../lib/authLib'
import {
  User,
  UserEdit,
  UserLoggedIn,
  UserLogin,
  UserRegister
} from '../interfaces/userInterfaces'

const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  password: { type: String, required: true }
})

const UserModel = model<User>('User', userSchema)

const register = async (user: UserRegister) => {
  try {
    user.password = await genHash(user.password)
    const newUser = new UserModel(user)
    const savedDoc = await newUser.save()
    return savedDoc
  } catch (error) {
    throw new Error(error.message)
  }
}

const getUser = async (id: string) => {
  try {
    const res = await UserModel.findById(id)
    if (!res) {
      throw new Error("User doesn't exist")
    }
    return res
  } catch (error) {
    throw new Error(error.message)
  }
}

const updateUser = async (id: string, data: UserEdit) => {
  try {
    const res = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true
    })
    return res
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteUser = async (id: string) => {
  try {
    const res = await UserModel.findOneAndDelete({ _id: id })
    return res
  } catch (error) {
    throw new Error(error.message)
  }
}

const loginUser = async (credentials: UserLogin) => {
  try {
    const res = await UserModel.findOne({
      email: credentials.email
    }).exec()
    if (
      res &&
      compHash(credentials.password as string, res.password as string)
    ) {
      const resWithToken: UserLoggedIn = res as UserLoggedIn
      resWithToken.token = genJWT({ id: resWithToken.id })
      return resWithToken
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
export { register, getUser, updateUser, deleteUser, loginUser }
