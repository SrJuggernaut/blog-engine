import { start, stop } from '@lib/mongoLib'
import { generateComment } from '@mocks/commentMock'
import { generatePost } from '@mocks/postMocks'
import { generatePerson } from '@mocks/userMock'
import { createPost, deletePost } from '@services/postServices'
import { createUser, deleteUser } from '@services/userServices'
import { createComment, deleteComment } from '@services/commentServices'

const POST = generatePost()
const COMMENT = generateComment()
const PERSON = generatePerson()

beforeAll(async () => {
  start()
  const user = await createUser(PERSON)
  PERSON.id = user._id.toString()
  POST.author = user._id.toString()
  const post = await createPost(POST)
  POST.id = post._id.toString()
})

afterAll(async () => {
  await deleteUser({ _id: PERSON.id })
  await deletePost({ _id: POST.id })
  stop()
})

describe('Comment Services', () => {
  it('should create a Comment', async () => {
    const commentToCreate = {
      userName: COMMENT.userName,
      email: COMMENT.email,
      content: COMMENT.content,
      approved: COMMENT.approved,
      post: POST.id
    }
    const comment = await createComment(commentToCreate)
    COMMENT.id = comment._id.toString()
    expect(comment.userName).toMatch(COMMENT.userName)
    expect(comment.email).toMatch(COMMENT.email)
    expect(comment.content).toMatch(COMMENT.content)
    expect(comment.approved).toEqual(COMMENT.approved)
    expect(comment.post.toString()).toMatch(POST.id)
  })

  it('should delete a Comment', async () => {
    const deletedComment = await deleteComment({ _id: COMMENT.id })
    expect(deletedComment.userName).toMatch(COMMENT.userName)
  })
})
