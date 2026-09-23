import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';

export class ExportCsvUseCase {
  constructor(
    private readonly registrosRepo: IRegistrosRepository,
    private readonly profileRepo: IProfileRepository
  ) {}

  async execute(userId: string): Promise<string> {
    const [profile, registros] = await Promise.all([
      this.profileRepo.getProfile(userId),
      this.registrosRepo.listar(userId),
    ]);

    // Ordenar cronológicamente ascendente para el reporte
    const sorted = [...registros].sort((a, b) => {
      const dateCmp = a.fecha.localeCompare(b.fecha);
      if (dateCmp !== 0) return dateCmp;
      return a.horaInicio.localeCompare(b.horaInicio);
    });

    const lines: string[] = [];

    // Encabezado oficial CSV
    lines.push('Fecha,Hora de inicio,Hora de Fin,Resumen actividades realizada,Horas realizadas,Horas totales Sumatoria (∑)');

    let sumatoria = profile?.horasInicialesPrevias || 0;

    // Fila inicial de horas previas si existen
    if (sumatoria > 0) {
      lines.push(
        `Inicial,-,-,"Horas previas cursadas (convalidadas en ajustes)",${sumatoria.toFixed(2)},${sumatoria.toFixed(2)}`
      );
    }

    for (const reg of sorted) {
      sumatoria += reg.horasComputables;
      const actClean = `"${reg.actividades.replace(/"/g, '""')}"`;
      lines.push(
        `${reg.fecha},${reg.horaInicio},${reg.horaFin},${actClean},${reg.horasComputables.toFixed(2)},${sumatoria.toFixed(2)}`
      );
    }

    // BOM UTF-8 (\uFEFF) para compatibilidad con Excel
    return '\uFEFF' + lines.join('\r\n');
  }
}
