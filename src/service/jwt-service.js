import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ResponseError } from '../error/response-error.js';

// Memuat variabel lingkungan
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Create token
const generateToken = (user, expiresIn = '24h') => {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET_KEY,
    { expiresIn },
  );
};

// Verif token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ResponseError(400, 'Token expired');
    } else if (err.name === 'JsonWebTokenError') {
      throw new ResponseError(400, 'Invalid token');
    } else {
      throw new ResponseError(400, 'Token verification failed');
    }
  }
};

export { generateToken, verifyToken };
