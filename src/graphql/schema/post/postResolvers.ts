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
      try {
        const res = await getPosts(value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    post: async (root: any, args: { id: string }, context: any) => {
      try {
        const post = await getPost(args.id)
        return post
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Mutation: {
    createPost: async (root: any, args: { post: CreatePost }, context: any) => {
      const { error, value } = createPostSchema.validate(args.post)
      if (error) {
        throw new UserInputError(error.message)
      }
      try {
        const res = await createPost(value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    editPost: async (
      root: any,
      args: { id: string; post: EditPost },
      context: any
    ) => {
      const { error, value } = editPostSchema.validate(args.post)
      console.log(args.post)
      if (error) {
        throw new UserInputError(error.message)
      }
      try {
        const res = await editPost(args.id, value)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    },
    deletePost: async (root: any, args: { id: string }, context: any) => {
      try {
        const res = await deletePost(args.id)
        return res
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Post: {
    id: (post: any) => post.id.toString(),
    author: (post: any) => getUser(post.author.toString())
  }
}

export default postResolvers
