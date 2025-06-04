import { LoginBody } from '../utils/interface/IApiResponse';
import AuthRepository from '../repository/auth.repository';
import { UserModal } from '../models/user.modal';

export default class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  login = async (email: string) => {
    const user = await this.authRepository.login(email);
    return user;
  };

  register = async (body: LoginBody) => {
    const user = await this.authRepository.register(body);
    return user;
  };
}
