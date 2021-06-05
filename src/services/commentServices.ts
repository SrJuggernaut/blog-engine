import { Comment, CreateComment } from '@interfaces/commentInterfaces'
import { UserInputError } from 'apollo-server-errors'
import { UpdateQuery, Schema, model, FilterQuery } from 'mongoose'

const commentSchema = new Schema<Comment>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  responseTo: { type: Schema.Types.ObjectId, ref: 'Comment' },
  approved: { type: Boolean, required: true, default: false }
})

const CommentModel = model<Comment>('Comment', commentSchema)

export const createComment = async (comment: CreateComment) => {
  try {
    const newComment = new CommentModel(comment)
    const savedComment = await newComment.save()
    return savedComment
  } catch (error) {
    if (error.code === 11000) {
      throw new UserInputError(`${Object.keys(error.keyValue)[0]} is already in use`)
    }
    throw new Error(error.message)
  }
}

export const getComment = async (query: FilterQuery<Comment>) => {
  try {
    const comment = await CommentModel.findOne(query)
    if (!comment) {
      throw new Error("Comment doesn't exist")
    }
    return comment
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getComments = async (query: FilterQuery<Comment>) => {
  try {
    const comments = await CommentModel.find(query)
    return comments
  } catch (error) {
    throw new Error(error.message)
  }
}

export const editComment = async (query: FilterQuery<Comment>, data: UpdateQuery<Comment>) => {
  try {
    const editedComment = await CommentModel.findOneAndUpdate(query, data, { new: true })
    if (!editedComment) {
      throw new Error("Comment doesn't exist")
    }
    return editedComment
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteComment = async (query: FilterQuery<Comment>) => {
  try {
    const deletedComment = await CommentModel.findOneAndDelete(query)
    if (!deletedComment) {
      throw new Error("Comment doesn't exist")
    }
    return deletedComment
  } catch (error) {
    throw new Error(error.message)
  }
}
