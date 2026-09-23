import { NotFoundError } from '../../../core/errors/app-error.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';
import { MetricasDashboard } from '../domain/entities/metricas-dashboard.entity.js';
import { PacingEngineService } from '../domain/services/pacing-engine.service.js';

export class GetDashboardMetricsUseCase {
  constructor(
    private readonly profileRepo: IProfileRepository,
    private readonly registrosRepo: IRegistrosRepository
  ) {}

  async execute(userId: string): Promise<MetricasDashboard> {
    const [perfil, registros] = await Promise.all([
      this.profileRepo.getProfile(userId),
      this.registrosRepo.listar(userId),
    ]);

    if (!perfil) {
      throw new NotFoundError('Perfil de practicante no encontrado.');
    }

    return PacingEngineService.calcularMetricas(perfil, registros);
  }
}
