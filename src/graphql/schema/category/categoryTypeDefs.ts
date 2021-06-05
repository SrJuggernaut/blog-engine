const categoryTypeDefs = `
  type Query {
    category(id: ID!): Category
    categories(post: ID): [Category]
  }
  type Mutation {
    createCategory(category: CreateCategory!): Category
    editCategory(id: ID!, category: EditCategory!): Category
    deleteCategory(id: ID!): Category
  }
  type Category {
    id: ID
    title: String
    slug: String
    excerpt: String
    seoTitle: String
    seoDescription: String
    posts: [Post]
  }
  input CreateCategory {
    title: String!
    slug: String!
    excerpt: String!
    seoTitle: String
    seoDescription: String
  }
  input EditCategory {
    title: String
    slug: String
    excerpt: String
    seoTitle: String
    seoDescription: String

  }
`

export default categoryTypeDefs
