const typeDefs = `
  type Query {
    user(id: ID!): user
  }
  type Mutation {
    register(user: userInput!): user
  }
  input userInput {
    userName: String!
    email: String!
    description: String
  }
  type user {
    id: ID
    userName: String
    email: String
    description: String
  }
`

export default typeDefs
