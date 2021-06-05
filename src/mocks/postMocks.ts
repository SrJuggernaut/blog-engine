import faker from 'faker'

faker.locale = 'es'

export const generatePost = () => {
  class Post {
    id: string = '1'
    title: string = faker.lorem.sentence()
    slug: string = faker.lorem.slug()
    excerpt: string = faker.lorem.paragraph()
    seoTitle?: string = faker.lorem.sentence()
    seoDescription?: string = faker.lorem.paragraph()
    author: string = ''
    content?: string = faker.lorem.paragraphs()
  }
  return new Post()
}
