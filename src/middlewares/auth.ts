import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import { IAuthRequest } from '../utils/types';
import UnauthorizedError from '../errors/unauthorized-error';

const { JWT_SECRET = 'dev-secret' } = process.env;
const authMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

export default authMiddleware;
