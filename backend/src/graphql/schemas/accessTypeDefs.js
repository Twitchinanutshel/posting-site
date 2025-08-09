const accessTypeDefs = `
  type Query {
    _: Boolean,
    isAuthenticated: Boolean!
  }

  type Mutation {
    login(password: String!): String  # Return JWT token
  }
`;

export default accessTypeDefs;
