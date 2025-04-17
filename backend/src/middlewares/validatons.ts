import { Joi } from 'celebrate';

export const validateProductBody = Joi.object({
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

export const validateOrderBody = Joi.object({
  items: Joi.array().items(Joi.string().hex().length(24)).required().messages({
    'array.base': 'Items должен быть массивом',
    'string.hex': 'ID товара должен быть в hex формате',
    'string.length': 'ID товара должен содержать 24 символа',
    'any.required': 'Items является обязательным полем',
  }),
  total: Joi.number().min(0).required().messages({
    'number.base': 'Total должен быть числом',
    'number.min': 'Total не может быть отрицательным',
    'any.required': 'Total является обязательным полем',
  }),
  payment: Joi.string().valid('card', 'cash').required().messages({
    'string.base': 'Payment должен быть строкой',
    'any.only': 'Payment должен быть либо "card", либо "cash"',
    'any.required': 'Payment является обязательным полем',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email должен быть строкой',
    'string.email': 'Email должен быть валидным email адресом',
    'any.required': 'Email является обязательным полем',
  }),
  phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required().messages({
    'string.base': 'Phone должен быть строкой',
    'string.pattern.base': 'Phone должен быть валидным номером телефона',
    'any.required': 'Phone является обязательным полем',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Address должен быть строкой',
    'string.empty': 'Address не может быть пустым',
    'any.required': 'Address является обязательным полем',
  }),
});
