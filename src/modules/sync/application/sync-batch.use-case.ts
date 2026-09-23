import { BatchSyncPayload, BatchSyncResult } from '../domain/entities/sync.entity.js';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';

export class SyncBatchUseCase {
  constructor(private readonly syncRepo: ISyncRepository) {}

  async execute(userId: string, payload: BatchSyncPayload): Promise<BatchSyncResult> {
    return await this.syncRepo.syncBatch(userId, payload);
  }
}
