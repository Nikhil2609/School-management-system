import express from 'express';
import authRouter from './auth.routes';
import { authorizeToken } from '../middleware/auth.middleware';
import departmentRouter from './department.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/departments', authorizeToken, departmentRouter);

export default router;
