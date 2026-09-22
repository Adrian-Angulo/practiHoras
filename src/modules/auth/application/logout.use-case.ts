import { IAuthRepository } from '../domain/repositories/auth.repository.js';

export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(token: string): Promise<void> {
    await this.authRepository.logout(token);
  }
}
