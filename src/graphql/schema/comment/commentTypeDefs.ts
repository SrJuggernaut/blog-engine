const commentTypeDefs = `
  type Query {
    getComment(id: ID!): Comment
    getComments: [Comment]
  }
  type Mutation {
    createComment(comment: CreateComment!): Comment
    editComment(id: ID!, comment: EditComment): Comment
    deleteComment(id: ID!): Comment
  }
  type Comment {
    id: ID!
    userName: String
    email: String
    content: String
    post: Post
    responseTo: Comment
    approved: Boolean
  }
  input CreateComment {
    userName: String!
    email: String!
    content: String!
    post: ID!
    responseTo: ID!
  }
  input EditComment {
    content: String
    approved: Boolean
  }
`

export default commentTypeDefs
