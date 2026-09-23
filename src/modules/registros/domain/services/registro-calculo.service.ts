import { BadRequestError } from '../../../../core/errors/app-error.js';

export class RegistroCalculoService {
  /**
   * Convierte "HH:mm" a minutos desde medianoche
   */
  static horaAMinutos(horaStr: string): number {
    const parts = horaStr.split(':').map(Number);
    if (parts.length < 2 || isNaN(parts[0]!) || isNaN(parts[1]!)) {
      throw new BadRequestError(`Formato de hora inválido: "${horaStr}". Debe ser HH:mm`);
    }
    return parts[0]! * 60 + parts[1]!;
  }

  /**
   * Calcula las horas netas computables según la regla de negocio del proyecto
   * 1. minIni = h * 60 + m
   * 2. minFin = h * 60 + m
   * 3. minBrutos = minFin - minIni
   * 4. minNetos = Math.max(0, minBrutos - descuentoMinutos)
   * 5. horas = Math.round((minNetos / 60) * 100) / 100
   */
  static calcularHorasComputables(
    horaInicio: string,
    horaFin: string,
    descuentoMinutos: number = 0
  ): number {
    const minIni = this.horaAMinutos(horaInicio);
    const minFin = this.horaAMinutos(horaFin);

    if (minIni >= minFin) {
      throw new BadRequestError(
        `La hora de inicio (${horaInicio}) debe ser cronológicamente anterior a la hora de fin (${horaFin}).`
      );
    }

    const minBrutos = minFin - minIni;
    const minNetos = Math.max(0, minBrutos - (descuentoMinutos || 0));
    const horas = Math.round((minNetos / 60) * 100) / 100;

    if (horas > 24) {
      throw new BadRequestError('Las horas computables de una jornada no pueden exceder las 24 horas.');
    }

    return horas;
  }
}
