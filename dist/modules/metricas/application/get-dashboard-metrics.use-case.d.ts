import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';
import { MetricasDashboard } from '../domain/entities/metricas-dashboard.entity.js';
export declare class GetDashboardMetricsUseCase {
    private readonly profileRepo;
    private readonly registrosRepo;
    constructor(profileRepo: IProfileRepository, registrosRepo: IRegistrosRepository);
    execute(userId: string): Promise<MetricasDashboard>;
}
