const authTypeDefs = `
  type Mutation {
    signUp(user: UserSignUp!): UserLoggedIn
    logIn(credentials: UserLogin): UserLoggedIn
  }
  input UserSignUp {
    userName: String!
    email: String!
    password: String!
    description: String
  }
  input UserLogin {
    email: String!
    password: String!
  }
  type UserLoggedIn {
    id: ID
    token: String!
    userName: String
    email: String
    description: String
  }
`

export default authTypeDefs
