import { Schema, model, Error } from 'mongoose'

import { CreatePost, EditPost, Post } from '../interfaces/postInterfaces'

const postSchema = new Schema<Post>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
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

export const getPost = async (id: string) => {
  try {
    const post = await PostModel.findById(id)
    if (!post) {
      throw new Error("Post doesn't exist")
    }
    return post
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPosts = async (filter: any) => {
  try {
    const posts = await PostModel.find(filter)
    if (!posts) {
      throw new Error('Unable to get the list of posts')
    }
    return posts
  } catch (error) {
    throw new Error(error.message)
  }
}

export const editPost = async (id: string, data: EditPost) => {
  try {
    const editedPost = await PostModel.findOneAndUpdate({ _id: id }, data, {
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

export const deletePost = async (id: string) => {
  const deletedPost = await PostModel.findOneAndDelete({ _id: id })
  if (!deletedPost) {
    throw new Error("Post doesn't exist")
  }
  return deletedPost
}
