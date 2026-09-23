import { Request, Response, NextFunction } from 'express';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';
export declare class MetricasController {
    private readonly getDashboardMetricsUseCase;
    constructor(profileRepo: IProfileRepository, registrosRepo: IRegistrosRepository);
    private getUserId;
    getDashboardMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
