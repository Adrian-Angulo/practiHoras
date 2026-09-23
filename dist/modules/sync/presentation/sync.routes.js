"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../../core/middlewares/auth.middleware.js");
const validation_middleware_js_1 = require("../../../core/middlewares/validation.middleware.js");
const supabase_profile_repository_js_1 = require("../../profile/infrastructure/supabase-profile.repository.js");
const supabase_registros_repository_js_1 = require("../../registros/infrastructure/supabase-registros.repository.js");
const sync_schemas_js_1 = require("../infrastructure/dtos/sync.schemas.js");
const supabase_sync_repository_js_1 = require("../infrastructure/supabase-sync.repository.js");
const sync_controller_js_1 = require("./sync.controller.js");
const router = (0, express_1.Router)();
const profileRepo = new supabase_profile_repository_js_1.SupabaseProfileRepository();
const registrosRepo = new supabase_registros_repository_js_1.SupabaseRegistrosRepository();
const syncRepo = new supabase_sync_repository_js_1.SupabaseSyncRepository(profileRepo, registrosRepo);
const syncController = new sync_controller_js_1.SyncController(syncRepo);
// Rutas protegidas de sincronización
router.use(auth_middleware_js_1.requireAuth);
router.post('/batch', (0, validation_middleware_js_1.validateBody)(sync_schemas_js_1.SyncBatchSchema), syncController.syncBatch);
exports.default = router;
//# sourceMappingURL=sync.routes.js.map