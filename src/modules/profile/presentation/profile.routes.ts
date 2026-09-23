import { Router } from 'express';
import { requireAuth } from '../../../core/middlewares/auth.middleware.js';
import { validateBody } from '../../../core/middlewares/validation.middleware.js';
import { SupabaseProfileRepository } from '../infrastructure/supabase-profile.repository.js';
import { UpdateProfileSchema } from '../infrastructure/dtos/profile.schemas.js';
import { ProfileController } from './profile.controller.js';

const router = Router();
const profileRepo = new SupabaseProfileRepository();
const profileController = new ProfileController(profileRepo);

// Rutas protegidas de Perfil
router.use(requireAuth);

router.get('/', profileController.getProfile);
router.put('/', validateBody(UpdateProfileSchema), profileController.updateProfile);

export default router;
