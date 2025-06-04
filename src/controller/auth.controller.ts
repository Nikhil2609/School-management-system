import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { ErrorResponse, SendResponse } from '../utils/responsehelper';
import { STATUS_CODE } from '../utils/enum';
import { UserModal } from '../models/user.modal';
import bcrypt from 'bcrypt';
import { AUTH_MESSAGE } from '../utils/messages';
import { sendWelcomeEmail } from '../utils/mailer';
import { generateToken } from '../utils/commonFunction';
import axios from 'axios';

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const customer = (await this.authService.login(email)) as UserModal;

      const isPasswordValid = await bcrypt.compare(password, customer?.password || '');

      if (!customer || !isPasswordValid) {
        return ErrorResponse(res, STATUS_CODE.UNAUTHORIZED, AUTH_MESSAGE.INVALID_CRED);
      }

      // generate token
      const token = generateToken(req.body);
      const metadata = { token };

      let customerResponse = JSON.parse(JSON.stringify(customer)) as UserModal;
      delete (customerResponse as any).password;

      return SendResponse(res, STATUS_CODE.OK, customerResponse, AUTH_MESSAGE.LOGIN, metadata);
    } catch (err) {
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    let body: UserModal = req.body;
    const haspassword = await bcrypt.hash(body.password, 10);
    body.password = haspassword;
    try {
      const customer = await this.authService.register(req.body);
      sendWelcomeEmail(body.email, body.name);
      return SendResponse(res, STATUS_CODE.CREATED, customer, AUTH_MESSAGE.REGISTER);
    } catch (err) {
      next(err);
    }
  };

  getThirdPartyUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return SendResponse(res, STATUS_CODE.OK, response.data, AUTH_MESSAGE.REGISTER);
    } catch (err) {
      next(err);
    }
  };
}
