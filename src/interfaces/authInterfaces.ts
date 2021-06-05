import Joi from 'joi'
import { User } from './userInterfaces'

export interface SignUpData {
  userName: User['userName']
  email: User['email']
  password: string
  description?: User['description']
}

export interface LogInData {
  email: User['email']
  password: string
}

export interface JWTPayload {
  sub: string
}

export const signUpDataSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'The password must contain at least one number and one capital letter'
    }),
  description: Joi.string()
})

export const logInDataSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
