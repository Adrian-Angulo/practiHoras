import { Router } from 'express';
import { requireAuth } from '../../../core/middlewares/auth.middleware.js';
import { validateRequest } from '../../../core/middlewares/validation.middleware.js';
import { ActualizarRegistroSchema, CrearRegistroSchema } from '../infrastructure/dtos/registro.schemas.js';
import { SupabaseRegistrosRepository } from '../infrastructure/supabase-registros.repository.js';
import { RegistrosController } from './registros.controller.js';

const router = Router();
const repo = new SupabaseRegistrosRepository();
const controller = new RegistrosController(repo);

// Todas las rutas de registros requieren autenticación con token Bearer
router.use(requireAuth);

router.get('/kpis', controller.obtenerKpis);
router.get('/rendimiento-semanal', controller.obtenerRendimientoSemanal);
router.get('/', controller.listar);
router.get('/:id', controller.obtenerPorId);
router.post('/', validateRequest(CrearRegistroSchema), controller.crear);
router.put('/:id', validateRequest(ActualizarRegistroSchema), controller.actualizar);
router.delete('/:id', controller.eliminar);

export default router;
