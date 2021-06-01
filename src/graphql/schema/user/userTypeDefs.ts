const userTypeDefs = `
  type Query {
    me: User
  }
  type Mutation {
    updateUser(id: ID!, user: UserEdit):User
    deleteUser(id:ID!):User
  }
  type User {
    id: ID
    userName: String
    email: String
    description: String
    posts: [Post]
  }
  input UserEdit {
    userName: String
    email: String
    description: String
  }
`

export default userTypeDefs
