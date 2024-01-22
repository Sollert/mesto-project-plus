import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../utils/types';

// eslint-disable-next-line no-unused-vars
const errorsMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
};

export default errorsMiddleware;
