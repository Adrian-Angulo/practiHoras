import { Request, Response, NextFunction } from 'express';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';
export declare class SyncController {
    private readonly syncBatchUseCase;
    constructor(syncRepo: ISyncRepository);
    private getUserId;
    syncBatch: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
