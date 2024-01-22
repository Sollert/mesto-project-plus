import { celebrate, Joi } from 'celebrate';
import config from '../utils/config';

const getUserByIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(config.urlRegExp).required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(config.urlRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default {
  getUserByIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  createUserValidation,
  loginUserValidation,
};
