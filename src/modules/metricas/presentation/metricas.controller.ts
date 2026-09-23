import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../core/errors/app-error.js';
import { GetDashboardMetricsUseCase } from '../application/get-dashboard-metrics.use-case.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';

export class MetricasController {
  private readonly getDashboardMetricsUseCase: GetDashboardMetricsUseCase;

  constructor(profileRepo: IProfileRepository, registrosRepo: IRegistrosRepository) {
    this.getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(profileRepo, registrosRepo);
  }

  private getUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError('Usuario no autenticado');
    }
    return req.user.id;
  }

  getDashboardMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const metrics = await this.getDashboardMetricsUseCase.execute(userId);

      res.status(200).json(metrics);
    } catch (err) {
      next(err);
    }
  };
}
