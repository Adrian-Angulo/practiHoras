import { BatchSyncPayload, BatchSyncResult } from '../domain/entities/sync.entity.js';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';
export declare class SyncBatchUseCase {
    private readonly syncRepo;
    constructor(syncRepo: ISyncRepository);
    execute(userId: string, payload: BatchSyncPayload): Promise<BatchSyncResult>;
}
