import { model, Schema } from 'mongoose';
import user from './user';
import config from '../utils/config';

interface Card {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Schema.Types.ObjectId[],
  createdAt: Date
}

const cardSchema = new Schema<Card>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link: string) => config.urlRegExp.test(link),
      message: 'Невалидная ссылка на карточку',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: user,
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<Card>('card', cardSchema);
