import pool from '../../db.js';

const userResolvers = {
  Query: {
    getUsers: async () => {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    },
    getUserById: async (_, { id }) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );
      return { id: result.insertId, username, email };
    },
    login: async (_, { email, password }) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      const user = rows[0];
      if (!user || user.password !== password) throw new Error('Invalid credentials');
      return { id: user.id, username: user.username, email: user.email };
    }
  }
};

export default userResolvers;
