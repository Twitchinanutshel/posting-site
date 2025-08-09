const accessTypeDefs = `
  type Query {
    _: Boolean,
    isAuthenticated: Boolean!
  }

  type Mutation {
    login(password: String!): Boolean  # Return JWT token
  }
`;

export default accessTypeDefs;
