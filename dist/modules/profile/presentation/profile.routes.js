"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../../core/middlewares/auth.middleware.js");
const validation_middleware_js_1 = require("../../../core/middlewares/validation.middleware.js");
const supabase_profile_repository_js_1 = require("../infrastructure/supabase-profile.repository.js");
const profile_schemas_js_1 = require("../infrastructure/dtos/profile.schemas.js");
const profile_controller_js_1 = require("./profile.controller.js");
const router = (0, express_1.Router)();
const profileRepo = new supabase_profile_repository_js_1.SupabaseProfileRepository();
const profileController = new profile_controller_js_1.ProfileController(profileRepo);
// Rutas protegidas de Perfil
router.use(auth_middleware_js_1.requireAuth);
router.get('/', profileController.getProfile);
router.put('/', (0, validation_middleware_js_1.validateBody)(profile_schemas_js_1.UpdateProfileSchema), profileController.updateProfile);
exports.default = router;
//# sourceMappingURL=profile.routes.js.map