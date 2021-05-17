import { ObjectId } from 'bson'
import { registerUser, user } from '../interfaces/userInterfaces'
import MongoLib from '../lib/MongoLib'

class UserServices {
  collection: string
  mongoDB: MongoLib
  constructor () {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async getUser (id: ObjectId): Promise<user | void> {
    try {
      const res = await this.mongoDB.get(this.collection, id)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async register (user: registerUser): Promise<ObjectId | void> {
    const res = await this.mongoDB.create(this.collection, user)
    console.log('UserServices', res)
    return res
  }
}

export default UserServices
