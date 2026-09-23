"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncBatchUseCase = void 0;
class SyncBatchUseCase {
    syncRepo;
    constructor(syncRepo) {
        this.syncRepo = syncRepo;
    }
    async execute(userId, payload) {
        return await this.syncRepo.syncBatch(userId, payload);
    }
}
exports.SyncBatchUseCase = SyncBatchUseCase;
//# sourceMappingURL=sync-batch.use-case.js.map