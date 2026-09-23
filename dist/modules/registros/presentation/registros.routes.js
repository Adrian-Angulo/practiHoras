"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../../core/middlewares/auth.middleware.js");
const validation_middleware_js_1 = require("../../../core/middlewares/validation.middleware.js");
const supabase_registros_repository_js_1 = require("../infrastructure/supabase-registros.repository.js");
const supabase_profile_repository_js_1 = require("../../profile/infrastructure/supabase-profile.repository.js");
const registro_schemas_js_1 = require("../infrastructure/dtos/registro.schemas.js");
const registros_controller_js_1 = require("./registros.controller.js");
const router = (0, express_1.Router)();
const registrosRepo = new supabase_registros_repository_js_1.SupabaseRegistrosRepository();
const profileRepo = new supabase_profile_repository_js_1.SupabaseProfileRepository();
const registrosController = new registros_controller_js_1.RegistrosController(registrosRepo, profileRepo);
// Rutas protegidas
router.use(auth_middleware_js_1.requireAuth);
router.get('/export/csv', registrosController.exportarCsv);
router.get('/', (0, validation_middleware_js_1.validateQuery)(registro_schemas_js_1.FiltrosRegistrosSchema), registrosController.listar);
router.post('/', (0, validation_middleware_js_1.validateBody)(registro_schemas_js_1.CrearRegistroSchema), registrosController.crear);
router.get('/:id', registrosController.obtenerPorId);
router.put('/:id', (0, validation_middleware_js_1.validateBody)(registro_schemas_js_1.ActualizarRegistroSchema), registrosController.actualizar);
router.delete('/:id', registrosController.eliminar);
exports.default = router;
//# sourceMappingURL=registros.routes.js.map