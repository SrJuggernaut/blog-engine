import { model, Schema } from 'mongoose'
import { User, UserEdit, UserQuery } from '@interfaces/userInterfaces'
import { SignUpData } from '@interfaces/authInterfaces'

const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  password: { type: String, required: true }
})

const UserModel = model<User>('User', userSchema)

export const createUser = async (user: SignUpData) => {
  try {
    const modeledUser = new UserModel(user)
    const savedUser: any = await modeledUser.save()
    delete savedUser.password
    return savedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (query: UserQuery) => {
  try {
    const user = await UserModel.findOne(query)
    if (!user) {
      throw new Error("User doesn't exist")
    }
    delete user.password
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUser = async (query: UserQuery, data: UserEdit) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(query, data, {
      new: true
    })
    if (!updatedUser) {
      throw new Error("User doesn't exist or can't be edited")
    }
    delete updatedUser.password
    return updatedUser
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteUser = async (query: UserQuery) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete(query)
    if (!deletedUser) {
      throw new Error("User doesn't exist")
    }
    delete deletedUser.password
    return deletedUser
  } catch (error) {
    throw new Error(error.message)
  }
}
