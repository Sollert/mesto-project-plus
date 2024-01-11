import { Request, Response } from 'express';
import User from '../models/user';
import { CustomRequest } from '../utils/types';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при получении пользователя' });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при добавлении пользователя' });
  }
};

const updateUserInfo = async (req: CustomRequest, res: Response) => {
  const { name, about } = req.body;
  const userId = req.user?._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при обновлении информации' });
  }
};

const updateUserAvatar = async (req: CustomRequest, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при обновлении аватара' });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
