import { FiltrosRegistrosDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';

export class ListRegistrosUseCase {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  async execute(userId: string, filtros?: FiltrosRegistrosDTO): Promise<RegistroHora[]> {
    return await this.registrosRepo.listar(userId, filtros);
  }
}
