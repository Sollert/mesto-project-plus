import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxFiles: '14d',
  zippedArchive: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    transport,
  ],
  format: winston.format.json(),
});

export default {
  errorLogger,
};
