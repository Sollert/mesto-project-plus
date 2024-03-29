import { model, Schema } from 'mongoose';
import validator from 'validator';
import config from '../utils/config';

interface User {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link: string) => config.urlRegExp.test(link),
      message: 'Невалидная ссылка на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props) => `${props.value} не валидная почта`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model<User>('user', userSchema);
