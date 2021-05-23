import { start, stop } from '../lib/mongoLib'
import {
  deleteUser,
  getUser,
  loginUser,
  register,
  updateUser
} from './userServices'
import { generatePerson } from '../mocks/userMock'
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts
} from './postServices'
import { generatePost } from '../mocks/postMocks'

beforeAll(() => {
  start()
})
afterAll(() => {
  stop()
})

const person = generatePerson()
const post = generatePost()

describe('Test user Services', () => {
  it('should create a new user', async () => {
    const res = await register({
      email: person.email,
      password: person.password,
      userName: person.userName
    })
    person.id = res._id.toString()
    post.author = res._id.toString()
    expect(res.userName).toBe(person.userName)
    expect(res.email).toBe(person.email)
  })
  it('should find created user', async () => {
    const res = await getUser(person.id)
    expect(res.userName).toBe(person.userName)
  })
  it('should edit user', async () => {
    const res = await updateUser(person.id, { description: person.description })
    expect(res.description).toBe(person.description)
  })
  it('should login user', async () => {
    const res = await loginUser({
      email: person.email,
      password: person.password
    })
    expect(res.token).toBeDefined()
  })
  it('should reject invalid login user', async () => {
    try {
      await loginUser({
        email: 'fake@email.com',
        password: 'FakePassword007'
      })
    } catch (error) {
      expect(error.message).toMatch(
        "Can't find user with that email/password combination"
      )
    }
  })
})

describe('Test post Services', () => {
  it('should create post', async () => {
    const res = await createPost({
      title: post.title,
      slug: post.slug,
      author: post.author,
      excerpt: post.excerpt
    })
    post.id = res._id.toString()
    expect(res.title).toBe(post.title)
    expect(res.slug).toBe(post.slug)
    expect(res.excerpt).toBe(post.excerpt)
  })
  it('should find created post', async () => {
    const res = await getPost(post.id)
    expect(res.title).toBe(post.title)
  })
  it('should edit post', async () => {
    const res = await editPost(post.id, {
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription
    })
    expect(res.seoTitle).toBe(post.seoTitle)
    expect(res.seoDescription).toBe(post.seoDescription)
  })
  it('should get all posts', async () => {
    const res = await getPosts({})
    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: post.title
        })
      ])
    )
  })
})

describe('Test clean Services', () => {
  it('should delete user', async () => {
    await deleteUser(person.id)
    try {
      await getUser(person.id)
    } catch (error) {
      expect(error.message).toMatch("User doesn't exist")
    }
  })
  it('should delete post', async () => {
    await deletePost(post.id)
    try {
      await getPost(post.id)
    } catch (error) {
      expect(error.message).toMatch("Post doesn't exist")
    }
  })
})
