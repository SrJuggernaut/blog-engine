const userTypeDefs = `
  type Query {
    user(id: ID!): user
  }
  type Mutation {
    register(user: userRegister!): user
    login(credentials: userLogin): logedInUser
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
  type logedInUser {
    id: ID
    token: String!
    userName: String
    email: String
    description: String
  }
`

export default userTypeDefs
