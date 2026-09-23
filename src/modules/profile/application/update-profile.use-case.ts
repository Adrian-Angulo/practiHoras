import { BadRequestError } from '../../../core/errors/app-error.js';
import { Perfil } from '../domain/entities/profile.entity.js';
import { IProfileRepository, UpdatePerfilDTO } from '../domain/repositories/profile.repository.js';

export class UpdateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: string, data: UpdatePerfilDTO): Promise<Perfil> {
    // Validar fechas de convenio si ambas están presentes
    if (data.fechaInicio && data.fechaFin) {
      const inicio = new Date(data.fechaInicio);
      const fin = new Date(data.fechaFin);
      if (inicio > fin) {
        throw new BadRequestError('La fecha de inicio no puede ser posterior a la fecha de culminación.');
      }
    }

    if (data.metaHorasTotal !== undefined && data.metaHorasTotal <= 0) {
      throw new BadRequestError('La meta total de horas debe ser un valor positivo mayor a 0.');
    }

    return await this.profileRepository.updateProfile(userId, data);
  }
}
