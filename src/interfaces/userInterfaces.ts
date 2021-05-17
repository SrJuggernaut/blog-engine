import { ObjectId } from 'mongodb/index'

export interface user {
  id: ObjectId
  username: string
  email: string
  description?: string
}
export interface registerUser {
  username: string
  email: string
  password: string
  description?: string
}
export interface loginUser {
  email: string,
  password: string
}
export interface logedinUser {
  id: ObjectId
  token: string
  userName: string
  email: string
  description?: string
}
