import express from 'express';
import AuthRepository from '../repository/auth.repository';
import AuthService from '../service/auth.service';
import AuthController from '../controller/auth.controller';
import rateLimiter from 'express-rate-limit';

const authRouter = express.Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const loginLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 request
  message: {
    error: 'Too many login attempts from this IP, please try again later'
  }
});

authRouter.post('/login', loginLimiter, authController.login);
authRouter.post('/register', authController.register);

authRouter.post('/users', authController.getThirdPartyUserList);

export default authRouter;
