import { start, stop } from '@lib/mongoLib'
import { generatePost } from '@mocks/postMocks'
import { generatePerson } from '@mocks/userMock'
import { generateCategory } from '@mocks/categoryMocks'
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts
} from '../../src/services/postServices'
import {
  createCategory,
  deleteCategory
} from '../../src/services/categoryServices'
import { createUser, deleteUser } from '../../src/services/userServices'
import { UserInputError } from 'apollo-server-errors'
import { CreatePost } from '@interfaces/postInterfaces'

const POST = generatePost()
const PERSON = generatePerson()
const CATEGORY = generateCategory()

beforeAll(async () => {
  await start()
  const userToCreate = {
    email: PERSON.email,
    userName: PERSON.userName,
    password: PERSON.password
  }
  const categoryToCreate = {
    title: CATEGORY.title,
    slug: CATEGORY.slug,
    excerpt: CATEGORY.excerpt
  }
  const user = await createUser(userToCreate)
  PERSON.id = user._id
  POST.author = user._id
  const category = await createCategory(categoryToCreate)
  CATEGORY.id = category._id
  POST.categories.push(category._id)
})

afterAll(async () => {
  await deleteUser({ _id: PERSON.id })
  await deleteCategory({ _id: CATEGORY.id })
  await stop()
})

describe('Post services', () => {
  it('should create a POST', async () => {
    const postToCreate = {
      title: POST.title,
      author: POST.author,
      content: POST.content as string,
      excerpt: POST.excerpt,
      slug: POST.slug,
      categories: POST.categories
    }
    const createdPost = await createPost(postToCreate)
    POST.id = createdPost.id
    expect(createdPost.title).toMatch(POST.title)
    expect(createdPost.author.toString()).toMatch(POST.author.toString())
    expect(createdPost.content).toMatch(POST.content as string)
    expect(createdPost.excerpt).toMatch(POST.excerpt)
    expect(createdPost.slug).toMatch(POST.slug)
    expect(createdPost.categories).toContain(CATEGORY.id)
  })

  it('should throw duplicated post Error', async () => {
    const postToCreate = {
      title: POST.title,
      author: POST.author,
      content: POST.content as string,
      excerpt: POST.excerpt,
      slug: POST.slug,
      categories: POST.categories
    }
    await expect(createPost(postToCreate)).rejects.toThrow(UserInputError)
    await expect(createPost(postToCreate)).rejects.toThrow(/ is already in use/)
  })

  it('should throw post validation error', async () => {
    const postToCreate = {} as CreatePost
    await expect(createPost(postToCreate)).rejects.toThrow(Error)
  })

  it('should get previously created post', async () => {
    const post = await getPost({ _id: POST.id })
    expect(post.title).toMatch(POST.title)
  })

  it("should throw an Post doesn't exist", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(getPost(query)).rejects.toThrow(Error)
    await expect(getPost(query)).rejects.toThrow("Post doesn't exist")
  })

  it('should get posts', async () => {
    const query = {
      author: POST.author
    }
    const posts = await getPosts(query)
    expect(posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: POST.title
        })
      ])
    )
  })

  it('should edit Post', async () => {
    const query = {
      _id: POST.id
    }
    const data = {
      seoTitle: POST.seoTitle,
      seoDescription: POST.seoDescription
    }
    const editedPost = await editPost(query, data)
    expect(editedPost.seoTitle).toMatch(POST.seoTitle as string)
    expect(editedPost.seoDescription).toMatch(POST.seoDescription as string)
  })

  it("should throw Post can't be edited", async () => {
    const query = { _id: '444444444444444444444444' }
    const data = {
      seoTitle: POST.seoTitle,
      seoDescription: POST.seoDescription
    }
    await expect(editPost(query, data)).rejects.toThrow(Error)
    await expect(editPost(query, data)).rejects.toThrow(
      "Post doesn't exist or can't be edited"
    )
  })

  it('should delete Post', async () => {
    const query = {
      _id: POST.id
    }
    const deletedPost = await deletePost(query)
    expect(deletedPost.title).toMatch(POST.title)
  })

  it("should throw Post can't be deleted", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(deletePost(query)).rejects.toThrow(Error)
    await expect(deletePost(query)).rejects.toThrow("Post doesn't exist")
  })
})
