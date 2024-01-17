import { Response, NextFunction } from 'express';
import ConflictError from '../errors/conflict-error';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../utils/types';
import process from 'process';

const { JWT_SECRET = 'dev-secret' } = process.env;
const authMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ConflictError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new ConflictError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

export default authMiddleware;
