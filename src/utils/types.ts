import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}

export interface ICustomError extends Error {
  statusCode: number,
  message: string
}
