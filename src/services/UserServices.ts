import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/serverConfig'
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

class UserServices {
  UserModel = model<User>('User', userSchema)

  async register (user: UserRegister) {
    try {
      user.password = await bcrypt.hash(user.password, 10)
      const newUser = new this.UserModel(user)
      const savedDoc = await newUser.save()
      return savedDoc
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUser (id: string) {
    try {
      const res = await this.UserModel.findById(id)
      if (!res) {
        throw new Error("User doesn't exist")
      }
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUser (id: string, data: UserEdit) {
    try {
      const res = await this.UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true
        // useFindAndModify: false
      })
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteUser (id: string) {
    try {
      const res = await this.UserModel.findOneAndDelete(
        { _id: id },
        { useFindAndModify: false }
      )
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async loginUser (credentials: UserLogin) {
    try {
      const res = await this.UserModel.findOne({
        email: credentials.email
      }).exec()
      if (
        res &&
        bcrypt.compare(credentials.password as string, res.password as string)
      ) {
        const resWithToken: UserLoggedIn = res as UserLoggedIn
        resWithToken.token = jwt.sign(
          { userName: resWithToken.userName, id: resWithToken.id },
          jwtSecret
        )
        return resWithToken
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default UserServices
