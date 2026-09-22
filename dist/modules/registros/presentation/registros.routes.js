"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../../core/middlewares/auth.middleware.js");
const validation_middleware_js_1 = require("../../../core/middlewares/validation.middleware.js");
const registro_schemas_js_1 = require("../infrastructure/dtos/registro.schemas.js");
const supabase_registros_repository_js_1 = require("../infrastructure/supabase-registros.repository.js");
const registros_controller_js_1 = require("./registros.controller.js");
const router = (0, express_1.Router)();
const repo = new supabase_registros_repository_js_1.SupabaseRegistrosRepository();
const controller = new registros_controller_js_1.RegistrosController(repo);
// Todas las rutas de registros requieren autenticación con token Bearer
router.use(auth_middleware_js_1.requireAuth);
router.get('/kpis', controller.obtenerKpis);
router.get('/rendimiento-semanal', controller.obtenerRendimientoSemanal);
router.get('/', controller.listar);
router.get('/:id', controller.obtenerPorId);
router.post('/', (0, validation_middleware_js_1.validateRequest)(registro_schemas_js_1.CrearRegistroSchema), controller.crear);
router.put('/:id', (0, validation_middleware_js_1.validateRequest)(registro_schemas_js_1.ActualizarRegistroSchema), controller.actualizar);
router.delete('/:id', controller.eliminar);
exports.default = router;
//# sourceMappingURL=registros.routes.js.map