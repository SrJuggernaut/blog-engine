import Joi from 'joi'
import { ObjectId } from 'mongoose'

export interface Category {
  id: ObjectId
  title: string
  slug: string
  excerpt: string
  seoTitle: string
  seoDescription: string
}

export interface CreateCategory {
  title: Category['title']
  slug: Category['slug']
  excerpt: Category['excerpt']
  seoTitle?: Category['seoTitle']
  seoDescription?: Category['seoDescription']
}

export interface EditCategory {
  title?: Category['title']
  slug?: Category['slug']
  excerpt?: Category['excerpt']
  seoTitle?: Category['seoTitle']
  seoDescription?: Category['seoDescription']
}

export const createCategorySchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  excerpt: Joi.string().required(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string()
})

export const editCategorySchema = Joi.object({
  title: Joi.string(),
  slug: Joi.string(),
  excerpt: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string()
})
  .min(1)
  .messages({ 'object.min': 'You must include at least 1 key to edit' })

export const queryCategorySchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
})

export const queryCategoriesSchema = Joi.object({
  post: Joi.string()
    .alphanum()
    .pattern(/^[a-f\d]{24}$/i)
})
