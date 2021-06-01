import { Schema, model, Error } from 'mongoose'

import {
  CreatePost,
  EditPost,
  Post,
  QueryPost,
  QueryPosts
} from '@interfaces/postInterfaces'

const postSchema = new Schema<Post>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true }
})

const PostModel = model<Post>('Post', postSchema)

export const createPost = async (post: CreatePost) => {
  try {
    const newPost = new PostModel(post)
    const savedPost = await newPost.save()
    return savedPost
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPost = async (query: QueryPost) => {
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

export const getPosts = async (query: QueryPosts) => {
  try {
    const posts = await PostModel.find(query)
    return posts
  } catch (error) {
    throw new Error(error.message)
  }
}

export const editPost = async (query: QueryPost, postData: EditPost) => {
  try {
    const editedPost = await PostModel.findOneAndUpdate(query, postData, {
      new: true
    })
    if (!editedPost) {
      throw new Error("Post doesn't exist")
    }
    return editedPost
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deletePost = async (query: QueryPost) => {
  const deletedPost = await PostModel.findOneAndDelete(query)
  if (!deletedPost) {
    throw new Error("Post doesn't exist")
  }
  return deletedPost
}
