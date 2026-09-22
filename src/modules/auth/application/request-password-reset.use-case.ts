import { IAuthRepository } from '../domain/repositories/auth.repository.js';

export class RequestPasswordResetUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, ipAddress?: string): Promise<{ token: string; expiraEn: Date }> {
    return await this.authRepository.requestPasswordReset(email, ipAddress);
  }
}
