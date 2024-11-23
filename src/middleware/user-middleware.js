import jwt from 'jsonwebtoken';
import { ResponseError } from '../error/response-error.js';

const userMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({
      error: 'No token provided',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      res.status(401).json({
        error: 'Token already expired',
      });
      return;
    }


  } catch (err) {
    next(
      new ResponseError(err.status || 500, err.message)
    )
  }

  next();
};

export { userMiddleware };
