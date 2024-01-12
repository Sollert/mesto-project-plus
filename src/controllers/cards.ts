import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { CustomRequest } from '../utils/types';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.status(200).json(cards);
  } catch (error) {
    return next(error);
  }
};

const removeCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) return next(new NotFoundError('Карточка с таким ID не найдена'));
    return res.status(204).json(card);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  if (!name || !link || !owner) return next(new BadRequestError('Неправильное тело запроса'));

  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).json(card);
  } catch (error) {
    return next(error);
  }
};

const updateLike = async (
  req: CustomRequest,
  res: Response,
  method: string,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  if (!userId || !cardId) return next(new BadRequestError('Неправильное тело запроса'));

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: userId } },
      { new: true },
    );
    if (!card) return next(new NotFoundError('Карточка с таким ID не найдена'));

    return res.status(200).json(card);
  } catch (error) {
    return next(error);
  }
};

const likeCard = (req: CustomRequest, res: Response, next: NextFunction) => updateLike(req, res, '$addToSet', next);
const dislikeCard = (req: CustomRequest, res: Response, next: NextFunction) => updateLike(req, res, '$pull', next);

export default {
  getCards,
  removeCard,
  createCard,
  likeCard,
  dislikeCard,
};
