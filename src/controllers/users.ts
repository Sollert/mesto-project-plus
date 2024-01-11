import { Request, Response } from 'express';
import User from '../models/user';

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

export default {
  getUsers,
  getUserById,
  createUser,
};
