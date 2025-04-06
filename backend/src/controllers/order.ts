import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      items,
      total,
      payment,
      email,
      phone,
      address,
    } = req.body;

    if (!items || !total || !payment || !email || !phone || !address) {
      res.status(400).send({ message: 'Отсутствуют обязательные поля' });
      return;
    }

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
      res.status(400).send({ message: 'Один или несколько продуктов имеют некорректную цену' });
      return;
    }

    if (total !== sumPrice) {
      res.status(400).send({ message: 'Общая сумма не совпадает с суммой цен продуктов' });
      return;
    }

    const orderId = faker.string.uuid();
    res.status(200).send({ id: orderId, total: sumPrice });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при обработке заказа' });
  }
};

export default createOrder;
