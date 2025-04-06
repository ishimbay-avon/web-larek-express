import { Joi } from 'celebrate';

const validateProductBody = Joi.object({
  title: Joi.string().required().min(2).max(30)
    .messages({
      'string.base': 'Название товара должно быть строкой',
      'string.empty': 'Название товара не может быть пустым',
      'string.min': 'Название товара должно содержать минимум 2 символа',
      'string.max': 'Название товара должно содержать максимум 30 символов',
      'any.required': 'Название товара является обязательным полем',
    }),
  image: Joi.object({
    fileName: Joi.string().required().messages({
      'string.base': 'Имя файла изображения должно быть строкой',
      'string.empty': 'Имя файла изображения не может быть пустым',
      'any.required': 'Имя файла изображения является обязательным полем',
    }),
    originalName: Joi.string().required().messages({
      'string.base': 'Оригинальное имя изображения должно быть строкой',
      'string.empty': 'Оригинальное имя изображения не может быть пустым',
      'any.required':
        'Оригинальное имя изображения является обязательным полем',
    }),
  })
    .required()
    .messages({
      'object.base': 'Поле image должно быть объектом',
      'any.required': 'Поле image является обязательным',
    }),
  category: Joi.string().required().messages({
    'string.base': 'Категория должна быть строкой',
    'string.empty': 'Категория не может быть пустой',
    'any.required': 'Категория является обязательным полем',
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'Описание должно быть строкой',
  }),
  price: Joi.number().min(0).optional().allow(null)
    .default(null)
    .messages({
      'number.base': 'Цена должна быть числом',
      'number.min': 'Цена не может быть отрицательной',
    }),
});

export default validateProductBody;
