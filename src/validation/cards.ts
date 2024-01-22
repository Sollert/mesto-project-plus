import { celebrate, Joi } from 'celebrate';

const urlRegExp: RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
});

const updateLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const getCardsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required,
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
  getCardsValidation,
  deleteCardValidation,
};
