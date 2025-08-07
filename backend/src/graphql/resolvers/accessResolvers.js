import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accessResolvers = {
  Mutation: {
    login: async (_, { password }) => {
      const storedHash = process.env.ACCESS_PASSWORD_HASH;

      const isValid = await bcrypt.compare(password, storedHash);
      if (!isValid) throw new Error('Invalid password');

      // Create token if valid
      const token = jwt.sign({ role: 'access' }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    }
  }
};

export default accessResolvers;
