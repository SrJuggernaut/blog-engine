const postTypeDefs = `
  type Query {
    posts(author: ID): [Post]
    post(id: ID!): Post
  }
  type Mutation {
    createPost(post: CreatePost!): Post
    editPost(id: ID!, post: EditPost!): Post
    deletePost(id: ID!): Post
  }
  type Post {
    id: ID
    title: String
    slug: String
    excerpt: String
    seoTitle: String
    seoDescription: String
    author: User
    content: String
    categories: [Category]
  }
  input CreatePost {
    title: String!
    slug: String!
    excerpt: String!
    seoTitle: String
    seoDescription: String
    author: ID!
    content: String
    categories: [ID]
  }
  input EditPost {
    title: String
    slug: String
    excerpt: String
    seoTitle: String
    seoDescription: String
    author: ID
    content: String
    categories: [ID]
  }
`

export default postTypeDefs
