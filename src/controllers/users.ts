import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { CustomRequest } from '../utils/types';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  if (!name || !about) return next(new BadRequestError('Неправильное тело запроса'));

  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

const updateUserInfo = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  if (!name && !about) return next(new BadRequestError('Неправильное тело запроса'));

  try {
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true });
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUserAvatar = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  if (!avatar) return next(new BadRequestError('Неправильное тело запроса'));

  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    if (!user) return next(new NotFoundError('Пользователя с таким ID не существует'));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
