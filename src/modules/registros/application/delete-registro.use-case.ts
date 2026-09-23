import { NotFoundError } from '../../../core/errors/app-error.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';

export class DeleteRegistroUseCase {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  async execute(userId: string, id: string): Promise<boolean> {
    const existing = await this.registrosRepo.obtenerPorId(userId, id);
    if (!existing) {
      throw new NotFoundError('El registro de jornada a eliminar no existe.');
    }
    return await this.registrosRepo.eliminar(userId, id);
  }
}
