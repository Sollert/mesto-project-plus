import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import errorsMiddleware from './middlewares/errors';
import authMiddleware from './middlewares/auth';
import usersControllers from './controllers/users';
import loggers from './middlewares/logger';
import usersValidation from './validation/users';

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.post('/signin', usersValidation.loginUserValidation, usersControllers.loginUser);
app.post('/signup', usersValidation.createUserValidation, usersControllers.createUser);
app.use(authMiddleware);
app.use('/', router);
app.use(loggers.errorLogger);
app.use(errors());
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
