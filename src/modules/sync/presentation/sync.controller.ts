import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../core/errors/app-error.js';
import { SyncBatchUseCase } from '../application/sync-batch.use-case.js';
import { BatchSyncPayload } from '../domain/entities/sync.entity.js';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';
import { SyncBatchInput } from '../infrastructure/dtos/sync.schemas.js';

export class SyncController {
  private readonly syncBatchUseCase: SyncBatchUseCase;

  constructor(syncRepo: ISyncRepository) {
    this.syncBatchUseCase = new SyncBatchUseCase(syncRepo);
  }

  private getUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError('Usuario no autenticado');
    }
    return req.user.id;
  }

  syncBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const input = req.body as SyncBatchInput;
      const result = await this.syncBatchUseCase.execute(userId, input as unknown as BatchSyncPayload);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
