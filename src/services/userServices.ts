import { model, Schema, FilterQuery, UpdateQuery } from 'mongoose'
import { User } from '@interfaces/userInterfaces'
import { SignUpData } from '@interfaces/authInterfaces'
import { UserInputError } from 'apollo-server-errors'

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
    if (error.code === 11000) {
      throw new UserInputError(`${Object.keys(error.keyValue)[0]} is already in use`)
    }
    throw new Error(error.message)
  }
}

export const getUser = async (query: FilterQuery<User>) => {
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

export const updateUser = async (query: FilterQuery<User>, data: UpdateQuery<User>) => {
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

export const deleteUser = async (query: FilterQuery<User>) => {
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
