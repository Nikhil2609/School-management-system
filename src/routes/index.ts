import express from 'express';
import authRouter from './auth.routes';
import { authorizeToken } from '../middleware/auth.middleware';
import productRouter from './product.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/products', authorizeToken, productRouter);

export default router;
