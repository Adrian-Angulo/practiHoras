import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';
import { BatchSyncPayload, BatchSyncResult } from '../domain/entities/sync.entity.js';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';
export declare class SupabaseSyncRepository implements ISyncRepository {
    private readonly profileRepo;
    private readonly registrosRepo;
    constructor(profileRepo: IProfileRepository, registrosRepo: IRegistrosRepository);
    private get client();
    syncBatch(userId: string, payload: BatchSyncPayload): Promise<BatchSyncResult>;
}
