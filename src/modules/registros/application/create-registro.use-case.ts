import { CrearRegistroDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { RegistroCalculoService } from '../domain/services/registro-calculo.service.js';

export class CreateRegistroUseCase {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  async execute(userId: string, data: CrearRegistroDTO): Promise<RegistroHora> {
    const descuento = data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos ?? 0;
    const horasComputables = RegistroCalculoService.calcularHorasComputables(
      data.horaInicio,
      data.horaFin,
      descuento
    );

    return await this.registrosRepo.crear(userId, {
      ...data,
      descuentoAlmuerzoMinutos: descuento,
      horasComputables,
    });
  }
}
