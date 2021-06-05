import Joi from 'joi'
import { ObjectId } from 'mongoose'

export interface Comment {
  id: ObjectId
  userName: string
  email: string
  content: string
  post: string | ObjectId
  responseTo?: string | ObjectId
  approved: boolean
}

export interface CreateComment {
  username: Comment['userName']
  email: Comment['email']
  content: Comment['content']
  post: Comment['post']
  responseTo?: Comment['responseTo']
  approved: Comment['approved']
}

export const createCommentSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  content: Joi.string(),
  post: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  responseTo: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i),
  approved: Joi.bool()
})

export const editCommentSchema = Joi.object({
  content: Joi.string(),
  approved: Joi.bool()
})
  .min(1)
  .messages({
    'object.min': 'You must include at least 1 key to edit'
  })

export const queryCommentSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})

export const queryCommentsSchema = Joi.object({
  post: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})
