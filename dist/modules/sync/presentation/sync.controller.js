"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncController = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const sync_batch_use_case_js_1 = require("../application/sync-batch.use-case.js");
class SyncController {
    syncBatchUseCase;
    constructor(syncRepo) {
        this.syncBatchUseCase = new sync_batch_use_case_js_1.SyncBatchUseCase(syncRepo);
    }
    getUserId(req) {
        if (!req.user?.id) {
            throw new app_error_js_1.UnauthorizedError('Usuario no autenticado');
        }
        return req.user.id;
    }
    syncBatch = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const input = req.body;
            const result = await this.syncBatchUseCase.execute(userId, input);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.SyncController = SyncController;
//# sourceMappingURL=sync.controller.js.map