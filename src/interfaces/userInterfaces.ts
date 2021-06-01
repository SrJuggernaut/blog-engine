import Joi from 'joi'
import { ObjectId } from 'mongoose'

export interface User {
  id: ObjectId
  userName: string
  email: string
  password?: string
  description?: string
}

export interface UserEdit {
  userName?: string
  email?: string
  description?: string
}

export interface UserQuery {
  _id?: string
  username?: User['userName']
  email?: User['email']
}

export interface JWTPayload {
  id: string
}

export const userSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  userName: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  description: Joi.string()
})

export const userEditSchema = Joi.object({
  userName: Joi.string().alphanum().min(3),
  email: Joi.string().email(),
  description: Joi.string()
})
  .min(1)
  .messages({ 'object.min': "User can't be empty" })
