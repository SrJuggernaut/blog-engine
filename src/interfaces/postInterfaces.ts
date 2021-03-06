import Joi from 'joi'
import { ObjectId } from 'mongoose'

export interface Post {
  id: ObjectId
  title: string
  slug: string
  excerpt: string
  seoTitle?: string
  seoDescription?: string
  author: ObjectId | string
  content: string
  categories: string[] | ObjectId[]
}

export interface CreatePost {
  title: Post['title']
  slug: Post['slug']
  excerpt: Post['excerpt']
  seoTitle?: Post['seoTitle']
  seoDescription?: Post['seoDescription']
  author: Post['author']
  content: Post['content']
  categories: Post['categories']
}

export interface EditPost {
  title?: Post['title']
  slug?: Post['slug']
  excerpt?: Post['excerpt']
  seoTitle?: Post['seoTitle']
  seoDescription?: Post['seoDescription']
  author?: Post['author']
  content?: Post['content']
  categories: ['categories']
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
    .required(),
  content: Joi.string().required()
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
    .required(),
  content: Joi.string().required()
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
  author: Joi.string().pattern(/^[a-f\d]{24}$/i),
  content: Joi.string(),
  categories: Joi.array().items(
    Joi.string()
      .alphanum()
      .pattern(/^[a-f\d]{24}$/i)
  )
})
  .min(1)
  .messages({
    'object.min': 'You must include at least 1 key to edit'
  })

export const queryPostSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})

export const queryPostsSchema = Joi.object({
  author: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
})
