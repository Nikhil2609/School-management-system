import express from 'express';
import AuthRepository from '../repository/auth.repository';
import AuthService from '../service/auth.service';
import AuthController from '../controller/auth.controller';

const authRouter = express.Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

authRouter.post('/users', authController.getThirdPartyUserList);

export default authRouter;
