import Joi from 'joi'
import { ObjectId } from 'mongoose'

export interface User {
  id: ObjectId
  userName: string
  email: string
  password?: string
  description?: string
}
export interface UserRegister {
  userName: User['userName']
  email: User['email']
  password: string
  description?: User['description']
}
export interface UserLogin {
  email: User['email']
  password: UserRegister['password']
}
export interface UserEdit {
  userName?: string
  email?: string
  description?: string
}
export interface UserLoggedIn {
  id: User['id']
  userName: User['userName']
  password: UserLogin['password']
  token?: string
  email: User['email']
  description: User['description']
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
export const userRegisterSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({
    'string.pattern.base': 'The password must contain at least one number and one capital letter'
  }),
  description: Joi.string()
})
export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
})
