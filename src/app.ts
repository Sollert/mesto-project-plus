import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { CustomRequest } from './utils/types';

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

mongoose.connect(DATABASE_URL);

app.listen(PORT);
