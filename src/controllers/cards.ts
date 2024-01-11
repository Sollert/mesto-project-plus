import { Request, Response } from 'express';
import Card from '../models/card';
import { CustomRequest } from '../utils/types';

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при получении карточек' });
  }
};

const getCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при поиске карточки' });
  }
};

const createCard = async (req: CustomRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при создании карточки' });
  }
};

const updateLike = async (req: CustomRequest, res: Response, method: string) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: userId } },
      { new: true },
    );
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка при обновлении лайка' });
  }
};

const likeCard = (req: CustomRequest, res: Response) => updateLike(req, res, '$addToSet');
const dislikeCard = (req: CustomRequest, res: Response) => updateLike(req, res, '$pull');

export default {
  getCards,
  getCardById,
  createCard,
  likeCard,
  dislikeCard,
};
