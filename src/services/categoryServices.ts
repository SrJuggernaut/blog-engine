import { Category, CreateCategory } from '@interfaces/categoryInterfaces'
import { UserInputError } from 'apollo-server-errors'
import { FilterQuery, model, Schema, UpdateQuery } from 'mongoose'

const categorySchema = new Schema<Category>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String }
})

const CategoryModel = model<Category>('Category', categorySchema)

export const createCategory = async (category: CreateCategory) => {
  try {
    const newCategory = new CategoryModel(category)
    const savedCategory = await newCategory.save()
    return savedCategory
  } catch (error) {
    if (error.code === 11000) {
      throw new UserInputError(`${Object.keys(error.keyValue)[0]} is already in use`)
    }
    throw new Error(error.message)
  }
}

export const getCategory = async (query: FilterQuery<Category>) => {
  try {
    const category = await CategoryModel.findOne(query)
    if (!category) {
      throw new Error("Category doesn't exist")
    }
    return category
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getCategories = async (query: FilterQuery<Category>) => {
  try {
    const categories = await CategoryModel.find(query)
    return categories
  } catch (error) {
    throw new Error(error.message)
  }
}

export const editCategory = async (query: FilterQuery<Category>, data: UpdateQuery<Category>) => {
  try {
    const editedCategory = await CategoryModel.findOneAndUpdate(query, data, {
      new: true
    })
    if (!editedCategory) {
      throw new UserInputError("Category doesn't exist or can't be edited")
    }
    return editedCategory
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteCategory = async (query: FilterQuery<Category>) => {
  try {
    const deletedCategory = await CategoryModel.findOneAndDelete(query)
    if (!deletedCategory) {
      throw new UserInputError("Category doesn't exist")
    }
    return deletedCategory
  } catch (error) {
    throw new Error(error.message)
  }
}
