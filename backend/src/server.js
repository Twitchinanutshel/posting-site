import {ApolloServer} from '@apollo/server';
import {ApolloStandaloneServer, startStandaloneServer} from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    },
    getUserById: async (_, { id }) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows;
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const [result] = await pool.query(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, password]
        );
        
        return {
          id: result.insertId,
          username,
          email,
        };
      } catch (err) {
        console.error(err);
        throw new Error('Failed to create user');
      }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: {port: 4000 },
});

console.log(`Server Running at: ${url}`);