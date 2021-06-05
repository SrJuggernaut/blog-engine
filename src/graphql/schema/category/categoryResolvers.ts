import { Category, CreateCategory, createCategorySchema, EditCategory, editCategorySchema, queryCategorySchema, queryCategoriesSchema } from '@interfaces/categoryInterfaces'
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from '@services/categoryServices'
import { getPost, getPosts } from '@services/postServices'
import { UserInputError } from 'apollo-server-errors'

const categoryResolvers = {
  Query: {
    category: (root: any, args: {id: string}, context: any) => {
      const { value, error } = queryCategorySchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      const category = getCategory({ _id: value.id })
      return category
    },
    categories: async (root: any, args: {post?: string}, context: any) => {
      const { value, error } = queryCategoriesSchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      if (value.post) {
        const post = await getPost(value.post)
        const categories = await getCategories({ _id: post.categories })
        return categories
      }
      const categories = await getCategories({})
      return categories
    }
  },
  Mutation: {
    createCategory: async (root: any, args: {category: CreateCategory}, context: any) => {
      const { value, error } = createCategorySchema.validate(args.category)
      if (error) {
        return new UserInputError(error.message)
      }
      const createdCategory = await createCategory(value)
      return createdCategory
    },
    editCategory: async (root: any, args: {id: string, category: EditCategory}, context: any) => {
      const { value, error } = editCategorySchema.validate(args.category)
      if (error) {
        return new UserInputError(error.message)
      }
      const editedCategory = await editCategory({ _id: args.id }, value)
      return editedCategory
    },
    deleteCategory: async (root: any, args: {id: string}, context: any) => {
      const { value, error } = queryCategorySchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      const deletedCategory = await deleteCategory(value.id)
      return deletedCategory
    }
  },
  Category: {
    id: (category:Category) => category.id.toString(),
    posts: (category:Category) => getPosts({ categories: category.id.toString() })
  }
}

export default categoryResolvers
