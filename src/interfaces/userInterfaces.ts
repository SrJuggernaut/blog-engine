import Joi from 'joi'

export interface User {
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
  .messages({ 'object.min': 'You must include at least 1 key to edit' })
