import { Router } from 'express';
import { requireAuth } from '../../../core/middlewares/auth.middleware.js';
import { SupabaseProfileRepository } from '../../profile/infrastructure/supabase-profile.repository.js';
import { SupabaseRegistrosRepository } from '../../registros/infrastructure/supabase-registros.repository.js';
import { MetricasController } from './metricas.controller.js';

const router = Router();
const profileRepo = new SupabaseProfileRepository();
const registrosRepo = new SupabaseRegistrosRepository();
const metricasController = new MetricasController(profileRepo, registrosRepo);

// Rutas protegidas de métricas
router.use(requireAuth);

router.get('/dashboard', metricasController.getDashboardMetrics);

export default router;
