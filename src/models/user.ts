import { model, Schema } from 'mongoose';
import validator from 'validator';

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
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props) => `${props.value} не валидная почта`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<User>('user', userSchema);
