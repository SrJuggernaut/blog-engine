import { UserInputError } from 'apollo-server-errors'
import {
  CreatePost,
  createPostSchema,
  EditPost,
  editPostSchema,
  queryPostSchema
} from '@interfaces/postInterfaces'
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts
} from '@services/postServices'
import { getUser } from '@services/userServices'

const postResolvers = {
  Query: {
    posts: async (root: any, args: { author?: string }, context: any) => {
      const { value, error } = queryPostSchema.validate(args)
      if (error) {
        throw new UserInputError(error.message)
      }
      const res = await getPosts(value)
      return res
    },
    post: async (root: any, args: { id?: string }, context: any) => {
      const { value, error } = queryPostSchema.validate(args)
      if (error) {
        throw new UserInputError(error.message)
      }
      const post = await getPost({ _id: value.id })
      return post
    }
  },
  Mutation: {
    createPost: async (root: any, args: { post: CreatePost }, context: any) => {
      const { error, value } = createPostSchema.validate(args.post)
      if (error) {
        throw new UserInputError(error.message)
      }
      const res = await createPost(value)
      return res
    },
    editPost: async (
      root: any,
      args: { id: string; post: EditPost },
      context: any
    ) => {
      const { error, value } = editPostSchema.validate(args.post)
      if (error) {
        throw new UserInputError(error.message)
      }
      const res = await editPost({ _id: args.id }, value)
      return res
    },
    deletePost: async (root: any, args: { id: string }, context: any) => {
      const { value, error } = queryPostSchema.validate(args.id)
      if (error) {
        throw new UserInputError(error.message)
      }
      try {
        const res = await deletePost({ _id: value.id })
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Post: {
    id: (post: any) => post.id.toString(),
    author: (post: any) => getUser({ _id: post.author.toString() })
  }
}

export default postResolvers
