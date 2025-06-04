import express from 'express';
import categoryRouter from './category.routes';
import authRouter from './auth.routes';
import { authorizeToken } from '../middleware/auth.middleware';
import productRouter from './product.routes';

const router = express.Router();

router.use('/auth', authRouter);
// router.use('/categories', authorizeToken, categoryRouter);
router.use('/categories', authorizeToken, categoryRouter);
router.use('/products', authorizeToken, productRouter);

export default router;
