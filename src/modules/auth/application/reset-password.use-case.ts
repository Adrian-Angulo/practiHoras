import {
  IAuthRepository,
  ResetPasswordDTO,
} from '../domain/repositories/auth.repository.js';
import { AuthBusinessRules } from '../domain/business-rules.js';

export class ResetPasswordUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: ResetPasswordDTO): Promise<void> {
    // 1. Validar fortaleza de la nueva contraseña
    AuthBusinessRules.validatePassword(dto.newPassword);

    // 2. Ejecutar restablecimiento en el repositorio
    await this.authRepository.resetPassword(dto);
  }
}
