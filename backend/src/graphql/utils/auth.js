import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error("Not authenticated");

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};