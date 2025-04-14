import { Request, Response, NextFunction } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import InternalError from '../errors/internal-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, total } = req.body;

    const objectIds = items.map((id: string) => new mongoose.Types.ObjectId(id));

    const products = await Product.find({ _id: { $in: objectIds } });

    let isCorrect = true;
    let sumPrice = 0;

    products.forEach((item) => {
      if (item.price === null) {
        isCorrect = false;
      } else {
        sumPrice += item.price || 0;
      }
    });

    if (!isCorrect) {
      return next(new BadRequestError('Один или несколько продуктов имеют некорректную цену'));
    }

    if (total !== sumPrice) {
      return next(new BadRequestError('Общая сумма не совпадает с суммой цен продуктов'));
    }

    const orderId = faker.string.uuid();
    return res.status(200).send({ id: orderId, total: sumPrice });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных заказа'));
    }
    return next(new InternalError('Ошибка при обработке заказа'));
  }
};

export default createOrder;
