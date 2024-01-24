import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card';
import { CustomRequest } from '../utils/types';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (error) {
    return next(error);
  }
};

const removeCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    const card = await Card.findById(cardId).orFail();
    if (card.owner.toString() !== userId) return next(new ForbiddenError('Нельзя удалять чужие карточки!'));
    await card.deleteOne();
    return res.status(204);
  } catch (error) {
    if (error instanceof Error.DocumentNotFoundError) {
      return next(new BadRequestError('Карточки с таким ID не существует'));
    }
    if (error instanceof Error.CastError) {
      return next(new BadRequestError('Неверный ID карточки'));
    }
    return next(error);
  }
};

const createCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).json(card);
  } catch (error) {
    if (error instanceof Error.CastError) return next(new BadRequestError('Некорректный запрос'));
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

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: userId } },
      { new: true },
    );
    if (!card) return next(new NotFoundError('Карточка с таким ID не найдена'));

    return res.status(200).json(card);
  } catch (error) {
    if (error instanceof Error.CastError) return next(new BadRequestError('Некорректный запрос'));
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
