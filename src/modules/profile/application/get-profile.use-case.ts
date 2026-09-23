import { NotFoundError } from '../../../core/errors/app-error.js';
import { Perfil } from '../domain/entities/profile.entity.js';
import { IProfileRepository } from '../domain/repositories/profile.repository.js';

export class GetProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: string): Promise<Perfil> {
    const profile = await this.profileRepository.getProfile(userId);
    if (!profile) {
      throw new NotFoundError('Perfil de usuario no encontrado.');
    }
    return profile;
  }
}
