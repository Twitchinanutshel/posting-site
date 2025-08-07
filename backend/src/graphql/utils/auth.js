import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    throw new Error('Invalid or expired token');
  }
};
