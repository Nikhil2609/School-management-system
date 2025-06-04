import jwt from 'jsonwebtoken';
import { jwtExpireTime } from './constant';
import { UserModal } from '../models/user.modal';

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: jwtExpireTime
  });
  return token;
};

export const verifyToken = (token: string) => {
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
  return verifyToken;
};

export const getCurrentUser = async (id: number) => {
  return await UserModal.findByPk(id);
};
