import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { getProducts, createProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validatons';

const router = Router();

router.get('/', getProducts);
router.post('/', celebrate({ [Segments.BODY]: validateProductBody }), createProduct);

export default router;
