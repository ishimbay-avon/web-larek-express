import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import NotFoundError from './errors/not-found-error';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    // console.log('MongoDB connected successfully!');
  })
  .catch(() => {
    // console.error('Connection error:', err);
  });

app.use(cors());

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
