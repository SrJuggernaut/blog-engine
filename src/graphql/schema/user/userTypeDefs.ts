const userTypeDefs = `
  type Query {
    me: user
  }
  type Mutation {
    register(user: userRegister!): loggedInUser
    login(credentials: userLogin): loggedInUser
    updateUser(id: ID!, user: userUpdate):user
    deleteUser(id:ID!):user
  }
  input userRegister {
    userName: String!
    email: String!
    password: String!
    description: String
  }
  input userLogin {
    email: String!
    password: String!
  }
  type user {
    id: ID
    userName: String
    email: String
    description: String
  }
  input userUpdate {
    userName: String
    email: String
    description: String
  }
  type loggedInUser {
    id: ID
    token: String!
    userName: String
    email: String
    description: String
  }
`

export default userTypeDefs
