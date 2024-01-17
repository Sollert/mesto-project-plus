import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { CustomRequest } from '../utils/types';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';
import UnauthorizedError from '../errors/unauthorized-error';
import process from 'process';

const { JWT_SECRET = 'dev-secret' } = process.env

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  try {
    const user = await User.findById(id);
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error.CastError) return next(new BadRequestError('Невалидный ID пользователя'));
    return next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
    return res.status(200).send(user);
  } catch (error: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (error instanceof Error.ValidationError) return next(new BadRequestError('Некорректный запрос'));
    return next(error);
  }
};

const updateUserInfo = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true });
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof Error.ValidationError) return next(new BadRequestError('Некорректный запрос'));
    return next(error);
  }
};

const updateUserAvatar = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) return next(new BadRequestError('Некорректный запрос'));
    return next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .end();
      } else {
        return next(new UnauthorizedError('Неправильные почта или пароль'));
      }
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) return next(new BadRequestError('Некорректный запрос'));
    return next(error);
  }
};

export default {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  loginUser,
};
