import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/auth.js'; 
import dotenv from 'dotenv';
dotenv.config();

const accessResolvers = {
  Mutation: {
    login: async (_, { password }, { res }) => {
      const storedHash = process.env.ACCESS_PASSWORD_HASH;

      const isValid = await bcrypt.compare(password, storedHash);
      if (!isValid) throw new Error('Invalid password');

      // Create token if valid
      const token = jwt.sign({ role: 'access' }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000 // 1h
      });

      return true;
    }
  },
  Query: {
    isAuthenticated: (_, __, { req }) => {
      console.log('Cookies received:', req.cookies);
      try {
        const payload = verifyToken(req);
        console.log('Token payload:', payload);
        return true;
      } catch (err) {
        console.log('Auth error:', err.message);
        return false;
      }
    }
  }

};

export default accessResolvers;
