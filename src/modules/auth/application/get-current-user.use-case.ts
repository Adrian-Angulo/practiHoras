import { IAuthRepository } from '../domain/repositories/auth.repository.js';
import { UserProfile } from '../domain/entities/auth-user.entity.js';
import { NotFoundError } from '../../../core/errors/app-error.js';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userId: string): Promise<UserProfile> {
    const profile = await this.authRepository.getProfileById(userId);
    if (!profile) {
      throw new NotFoundError('Perfil de usuario no encontrado');
    }
    return profile;
  }
}
