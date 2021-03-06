import faker from 'faker'

faker.locale = 'es'

export const generateCategory = () => {
  class Category {
    id: string = '1'
    title: string = faker.lorem.sentence()
    slug: string = faker.lorem.slug()
    excerpt: string = faker.lorem.paragraph()
    seoTitle?: string = faker.lorem.sentence()
    seoDescription?: string = faker.lorem.paragraph()
  }
  return new Category()
}
