import { celebrate, Joi } from 'celebrate';
import config from '../utils/config';

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(config.urlRegExp).required(),
  }),
});

const updateLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export default {
  createCardValidation,
  updateLikeValidation,
  deleteCardValidation,
};
