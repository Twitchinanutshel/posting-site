const userTypeDefs = `
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

export default userTypeDefs;
