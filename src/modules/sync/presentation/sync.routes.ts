import { Router } from 'express';
import { requireAuth } from '../../../core/middlewares/auth.middleware.js';
import { validateBody } from '../../../core/middlewares/validation.middleware.js';
import { SupabaseProfileRepository } from '../../profile/infrastructure/supabase-profile.repository.js';
import { SupabaseRegistrosRepository } from '../../registros/infrastructure/supabase-registros.repository.js';
import { SyncBatchSchema } from '../infrastructure/dtos/sync.schemas.js';
import { SupabaseSyncRepository } from '../infrastructure/supabase-sync.repository.js';
import { SyncController } from './sync.controller.js';

const router = Router();
const profileRepo = new SupabaseProfileRepository();
const registrosRepo = new SupabaseRegistrosRepository();
const syncRepo = new SupabaseSyncRepository(profileRepo, registrosRepo);
const syncController = new SyncController(syncRepo);

// Rutas protegidas de sincronización
router.use(requireAuth);

router.post('/batch', validateBody(SyncBatchSchema), syncController.syncBatch);

export default router;
