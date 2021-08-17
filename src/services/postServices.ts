import { Schema, model, Error, FilterQuery, UpdateQuery } from 'mongoose'

import {
  CreatePost,
  Post
} from '@interfaces/postInterfaces'
import { UserInputError } from 'apollo-server-errors'

const postSchema = new Schema<Post>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})

const PostModel = model<Post>('Post', postSchema)

export const createPost = async (post: CreatePost) => {
  try {
    const newPost = new PostModel(post)
    const savedPost = await newPost.save()
    return savedPost
  } catch (error) {
    if (error.code === 11000) {
      throw new UserInputError(`${Object.keys(error.keyValue)[0]} is already in use`)
    }
    throw new Error(error.message)
  }
}

export const getPost = async (query: FilterQuery<Post>) => {
  try {
    const post = await PostModel.findOne(query)
    if (!post) {
      throw new Error("Post doesn't exist")
    }
    return post
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPosts = async (query: FilterQuery<Post>) => {
  try {
    const posts = await PostModel.find(query)
    return posts
  } catch (error) {
    throw new Error(error.message)
  }
}

export const editPost = async (query: FilterQuery<Post>, postData: UpdateQuery<Post>) => {
  try {
    const editedPost = await PostModel.findOneAndUpdate(query, postData, {
      new: true
    })
    if (!editedPost) {
      throw new Error("Post doesn't exist or can't be edited")
    }
    return editedPost
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deletePost = async (query: FilterQuery<Post>) => {
  try {
    const deletedPost = await PostModel.findOneAndDelete(query)
    if (!deletedPost) {
      throw new Error("Post doesn't exist")
    }
    return deletedPost
  } catch (error) {
    throw new Error(error.message)
  }
}
