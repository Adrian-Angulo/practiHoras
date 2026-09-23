import { NotFoundError } from '../../../core/errors/app-error.js';
import { RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';

export class GetRegistroByIdUseCase {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  async execute(userId: string, id: string): Promise<RegistroHora> {
    const registro = await this.registrosRepo.obtenerPorId(userId, id);
    if (!registro) {
      throw new NotFoundError('El registro de jornada solicitado no existe.');
    }
    return registro;
  }
}
