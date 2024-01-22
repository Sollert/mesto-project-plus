import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}

export interface IAuthRequest extends Request {
  user?: string | JwtPayload
}

export interface ICustomError extends Error {
  statusCode: number,
  message: string
}
