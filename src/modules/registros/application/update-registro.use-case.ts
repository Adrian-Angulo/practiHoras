import { NotFoundError } from '../../../core/errors/app-error.js';
import { ActualizarRegistroDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { RegistroCalculoService } from '../domain/services/registro-calculo.service.js';

export class UpdateRegistroUseCase {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  async execute(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora> {
    const existing = await this.registrosRepo.obtenerPorId(userId, id);
    if (!existing) {
      throw new NotFoundError('El registro de jornada a actualizar no existe.');
    }

    const horaInicio = data.horaInicio || existing.horaInicio;
    const horaFin = data.horaFin || existing.horaFin;
    const descuento =
      data.descuentoAlmuerzoMinutos ??
      data.refrigerioMinutos ??
      existing.descuentoAlmuerzoMinutos ??
      0;

    const horasComputables = RegistroCalculoService.calcularHorasComputables(
      horaInicio,
      horaFin,
      descuento
    );

    return await this.registrosRepo.actualizar(userId, id, {
      ...data,
      descuentoAlmuerzoMinutos: descuento,
      horasComputables,
    });
  }
}
