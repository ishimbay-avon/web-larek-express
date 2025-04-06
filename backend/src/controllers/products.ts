import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import InternalError from '../errors/internal-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    const total = await Product.countDocuments({});
    return res.status(200).json({ items: products, total });
  } catch (error) {
    return next(new InternalError('Ошибка валидации данных при получении товаров'));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(200).send({ data: product });
  } catch (error) {
    return next(error);
  }
};
