import { BatchSyncPayload, BatchSyncResult } from '../entities/sync.entity.js';
export interface ISyncRepository {
    syncBatch(userId: string, payload: BatchSyncPayload): Promise<BatchSyncResult>;
}
