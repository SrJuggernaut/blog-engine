const userTypeDefs = `
  type Query {
    me: User
  }
  type Mutation {
    register(user: UserRegister!): UserLoggedIn
    login(credentials: UserLogin): UserLoggedIn
    updateUser(id: ID!, user: UserEdit):User
    deleteUser(id:ID!):User
  }
  type User {
    id: ID
    userName: String
    email: String
    description: String
  }
  input UserRegister {
    userName: String!
    email: String!
    password: String!
    description: String
  }
  input UserLogin {
    email: String!
    password: String!
  }
  input UserEdit {
    userName: String
    email: String
    description: String
  }
  type UserLoggedIn {
    id: ID
    token: String!
    userName: String
    email: String
    description: String
  }
`

export default userTypeDefs
