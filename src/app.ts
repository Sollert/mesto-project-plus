import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import router from './routes';
import { CustomRequest } from './utils/types';
import errorsMiddleware from './middlewares/errors';

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

app.use((req: CustomRequest, res, next) => {
  req.user = {
    _id: '659fc92af256a428386b8e4a',
  };

  next();
});

app.use(express.json());
app.use('/', router);
app.use(errorsMiddleware);

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log(colors.bold.green('Подключение к Базе данных произошло успешно'));
    app.listen(PORT);
    console.log(colors.bold.green(`Сервер запущен на порту: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

connect();
