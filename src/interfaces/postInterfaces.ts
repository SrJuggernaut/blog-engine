import Joi from 'joi'
import { ObjectId } from 'mongoose'
import { User } from './userInterfaces'

export interface Post {
  id: ObjectId
  title: string
  slug: string
  excerpt: string
  seoTitle?: string
  seoDescription?: string
  author: User | ObjectId | string
}

export interface CreatePost {
  title: Post['title']
  slug: Post['slug']
  excerpt: Post['excerpt']
  seoTitle?: Post['seoTitle']
  seoDescription?: Post['seoDescription']
  author: Post['author']
}

export interface EditPost {
  title: Post['title']
  slug: Post['slug']
  excerpt: Post['excerpt']
  seoTitle?: Post['seoTitle']
  seoDescription?: Post['seoDescription']
  author: Post['author']
}

export interface QueryPost {
  author: User | ObjectId | string
}

export const postSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  title: Joi.string().required(),
  slug: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]*$/)
    .required(),
  excerpt: Joi.string().required(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  author: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]*$/)
    .required()
    .messages({
      'string.pattern.base':
        'The slug can only contain Uppercase, Lowercase, "-" and "_"'
    }),
  excerpt: Joi.string().required(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  author: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})

export const editPostSchema = Joi.object({
  title: Joi.string(),
  slug: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]*$/)
    .messages({
      'string.pattern.base':
        'The slug can only contain Uppercase, Lowercase, "-" and "_"'
    }),
  excerpt: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  author: Joi.string().pattern(/^[a-f\d]{24}$/i)
}).min(1)

export const queryPostSchema = Joi.object({
  author: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
})
