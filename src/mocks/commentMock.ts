import faker from 'faker'
import { ObjectId } from 'mongoose'

faker.locale = 'es'

export const generateComment = () => {
  class Comment {
    id: string = '1'
    userName: string = faker.internet.userName()
    email: string = faker.internet.email()
    content: string = faker.lorem.paragraph()
    post: string | ObjectId = '1'
    responseTo?: string | ObjectId = undefined
    approved: boolean = false
  }
  return new Comment()
}
