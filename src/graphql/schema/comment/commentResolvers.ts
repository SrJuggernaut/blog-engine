import { Comment, CreateComment, createCommentSchema, editCommentSchema, queryCommentSchema, queryCommentsSchema } from '@interfaces/commentInterfaces'
import { createComment, deleteComment, editComment, getComment, getComments } from '@services/commentServices'
import { getPost } from '@services/postServices'
import { UserInputError } from 'apollo-server-errors'

const commentResolvers = {
  Query: {
    getComment: async (root: unknown, args: {id: string}, context: unknown) => {
      const { value, error } = queryCommentSchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      const comment = await getComment({ _id: value.id })
      return comment
    },
    getComments: async (root: unknown, args: {post: string}, context: unknown) => {
      const { value, error } = queryCommentsSchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      const comments = await getComments(value)
      return comments
    }
  },
  Mutation: {
    createComment: async (root: unknown, args: {comment: CreateComment}, context: unknown) => {
      const { value, error } = createCommentSchema.validate(args.comment)
      if (error) {
        return new UserInputError(error.message)
      }
      const newComment = await createComment(value)
      return newComment
    },
    editComment: async (root: unknown, args: {id: string, comment: {content?: string, approved?: boolean}}, context: unknown) => {
      const { value, error } = editCommentSchema.validate(args.comment)
      if (error) {
        return new UserInputError(error.message)
      }
      const editedComment = editComment({ _id: args.id }, value)
      return editedComment
    },
    deleteComment: async (root: unknown, args: { id: string}, context: unknown) => {
      const { value, error } = queryCommentSchema.validate(args)
      if (error) {
        return new UserInputError(error.message)
      }
      const deletedComment = await deleteComment({ _id: value.id })
      return deletedComment
    }
  },
  Comment: {
    id: (comment: Comment) => comment.id.toString(),
    post: (comment: Comment) => getPost({ _id: comment.post.toString() }),
    responseTo: (comment: Comment) => comment.responseTo ? getComment({ _id: comment.responseTo?.toString() }) : null
  }
}

export default commentResolvers
