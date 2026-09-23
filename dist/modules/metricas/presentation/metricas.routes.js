"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../../core/middlewares/auth.middleware.js");
const supabase_profile_repository_js_1 = require("../../profile/infrastructure/supabase-profile.repository.js");
const supabase_registros_repository_js_1 = require("../../registros/infrastructure/supabase-registros.repository.js");
const metricas_controller_js_1 = require("./metricas.controller.js");
const router = (0, express_1.Router)();
const profileRepo = new supabase_profile_repository_js_1.SupabaseProfileRepository();
const registrosRepo = new supabase_registros_repository_js_1.SupabaseRegistrosRepository();
const metricasController = new metricas_controller_js_1.MetricasController(profileRepo, registrosRepo);
// Rutas protegidas de métricas
router.use(auth_middleware_js_1.requireAuth);
router.get('/dashboard', metricasController.getDashboardMetrics);
exports.default = router;
//# sourceMappingURL=metricas.routes.js.map