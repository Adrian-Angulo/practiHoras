import { IAuthRepository, LoginDTO } from '../domain/repositories/auth.repository.js';
import { UserSession } from '../domain/entities/auth-user.entity.js';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: LoginDTO): Promise<UserSession> {
    return await this.authRepository.login(dto);
  }
}
