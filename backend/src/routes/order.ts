import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import createOrder from '../controllers/order';
import { validateOrderBody } from '../middlewares/validatons';

const router = Router();

router.post('/', celebrate({ [Segments.BODY]: validateOrderBody }), createOrder);

export default router;
