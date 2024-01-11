import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

app.use(express.json());
app.use('/', router);

mongoose.connect(DATABASE_URL);

app.listen(PORT);
