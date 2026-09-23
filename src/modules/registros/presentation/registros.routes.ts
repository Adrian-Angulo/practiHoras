import { Router } from 'express';
import { requireAuth } from '../../../core/middlewares/auth.middleware.js';
import { validateBody, validateQuery } from '../../../core/middlewares/validation.middleware.js';
import { SupabaseRegistrosRepository } from '../infrastructure/supabase-registros.repository.js';
import { SupabaseProfileRepository } from '../../profile/infrastructure/supabase-profile.repository.js';
import {
  ActualizarRegistroSchema,
  CrearRegistroSchema,
  FiltrosRegistrosSchema,
} from '../infrastructure/dtos/registro.schemas.js';
import { RegistrosController } from './registros.controller.js';

const router = Router();
const registrosRepo = new SupabaseRegistrosRepository();
const profileRepo = new SupabaseProfileRepository();
const registrosController = new RegistrosController(registrosRepo, profileRepo);

// Rutas protegidas
router.use(requireAuth);

router.get('/export/csv', registrosController.exportarCsv);
router.get('/', validateQuery(FiltrosRegistrosSchema), registrosController.listar);
router.post('/', validateBody(CrearRegistroSchema), registrosController.crear);
router.get('/:id', registrosController.obtenerPorId);
router.put('/:id', validateBody(ActualizarRegistroSchema), registrosController.actualizar);
router.delete('/:id', registrosController.eliminar);

export default router;
