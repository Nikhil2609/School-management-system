import { User } from '@prisma/client';
import prisma from '../prisma';

export default class AuthRepository {
  constructor() { }

  login = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  };

  register = async (body: User) => {
    const customer = await prisma.user.create({ data: body });
    return customer;
  };
}
